// =============================================
// SIMULADOR DE MARIO KART - EDIÇÃO TERMINAL COLORIDO
// =============================================

// Códigos de cores para terminal
const cores = {
    reset: "\x1b[0m",
    brilho: "\x1b[1m",
    vermelho: "\x1b[31m",
    verde: "\x1b[32m",
    amarelo: "\x1b[33m",
    azul: "\x1b[34m",
    magenta: "\x1b[35m",
    ciano: "\x1b[36m",
    branco: "\x1b[37m",
    bgVermelho: "\x1b[41m",
    bgVerde: "\x1b[42m",
    bgAmarelo: "\x1b[43m",
    bgAzul: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCiano: "\x1b[46m"
};

// Função para criar textos coloridos (suporta cores normais e de fundo)
function colorir(texto, cor) {
    return cores[cor] + texto + cores.reset;
}

// Constantes para números mágicos
const ESCALA_ATRIBUTOS = 5;
const LARGURA_SEPARADOR = 50;
const DIFERENCA_VITORIA_ESMAGADORA = 10;
const DIFERENCA_BOA_VANTAGEM = 5;

// Configuração dos tipos de bloco
const BLOCO_CONFIG = {
    reta: { cor: "verde", emoji: "🏃💨", label: "RETA" },
    curva: { cor: "azul", emoji: "🌀", label: "CURVA" },
    confronto: { cor: "vermelho", emoji: "⚔️", label: "CONFRONTO" }
};

// Configuração de atributos com emojis e cores
const ATRIBUTOS_CONFIG = {
    velocidade: { emoji: "⚡", label: "Velocidade", cor: "verde" },
    manobrabilidade: { emoji: "🌀", label: "Manobrabilidade", cor: "azul" },
    poder: { emoji: "💪", label: "Poder", cor: "vermelho" }
};

// Timings
const TIMINGS = {
    animacaoRoleta: 100,
    contagemRegressiva: 300,
    delayEntreJogadores: 500,
    delayEntreRodadas: 1500,
    leituraTitulo: 1500,
    digitar: 50
};

// Função auxiliar para delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função para criar animação de digitação
function digitar(texto, velocidade = TIMINGS.digitar) {
    return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < texto.length) {
                process.stdout.write(texto[i]);
                i++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, velocidade);
    });
}

// Função para criar barras de progresso
function barraProgresso(valor, max, tamanho = 20) {
    const porcentagem = valor / max;
    const preenchido = Math.round(tamanho * porcentagem);
    const vazio = tamanho - preenchido;
    return '█'.repeat(preenchido) + '░'.repeat(vazio);
}

// =============================================
// CONFIGURAÇÃO INICIAL DO JOGO
// =============================================

// Definindo o objeto principal do jogo
const jogo = {
    // Array com todos os personagens disponíveis (com cores personalizadas)
    personagens: [
        { 
            nome: "Mario", 
            cor: "vermelho",
            velocidade: 5, 
            manobrabilidade: 4, 
            poder: 3,
            pontos: 0
        },
        { 
            nome: "Luigi", 
            cor: "verde",
            velocidade: 4, 
            manobrabilidade: 5, 
            poder: 3,
            pontos: 0 
        },
        { 
            nome: "Peach", 
            cor: "magenta",
            velocidade: 4, 
            manobrabilidade: 4, 
            poder: 4,
            pontos: 0 
        },
        { 
            nome: "Yoshi", 
            cor: "verde",
            velocidade: 5, 
            manobrabilidade: 3, 
            poder: 4,
            pontos: 0 
        },
        { 
            nome: "Bowser", 
            cor: "vermelho",
            velocidade: 3, 
            manobrabilidade: 3, 
            poder: 5,
            pontos: 0 
        },
        { 
            nome: "Toad", 
            cor: "azul",
            velocidade: 4, 
            manobrabilidade: 5, 
            poder: 3,
            pontos: 0 
        }
    ],
    
    tiposBloco: ["reta", "curva", "confronto"],
    numeroRodadas: 5,
    jogadoresSelecionados: []
};

// =============================================
// FUNÇÕES UTILITÁRIAS
// =============================================

// Função para mostrar título animado
async function mostrarTitulo() {
    console.clear();
    const titulo = `
    ╔══════════════════════════════════════════════════════════╗
    ║                                                          ║
    ║     🏁🏁🏁  MARIO KART SIMULATOR  🏁🏁🏁                ║
    ║                                                          ║
    ╚══════════════════════════════════════════════════════════╝
    `;

    console.log(colorir(titulo, "amarelo"));
    await digitar(colorir("Preparem-se para a corrida mais emocionante do terminal!\n\n", "ciano"));
}

// Função para selecionar jogadores
async function selecionarJogadores() {
    console.log(colorir("\n🎮 SELECIONANDO JOGADORES...", "amarelo"));

    // Animação de roleta
    const roleta = ["⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️"];
    for (let i = 0; i < 20; i++) {
        process.stdout.write(`\r${roleta[i % roleta.length]} Sorteando jogadores ${roleta[(i+1) % roleta.length]}`);
        await delay(TIMINGS.animacaoRoleta);
    }
    console.log("\n");

    // Selecionar 2 jogadores aleatórios
    const jogadoresEmbaralhados = [...jogo.personagens].sort(() => Math.random() - 0.5);
    const jogadoresSelecionados = jogadoresEmbaralhados.slice(0, 2);

    console.log(colorir("✅ JOGADORES DEFINIDOS!", "verde"));
    console.log(colorir(`\nJogador 1: ${jogadoresSelecionados[0].nome}`, jogadoresSelecionados[0].cor));
    console.log(colorir(`Jogador 2: ${jogadoresSelecionados[1].nome}`, jogadoresSelecionados[1].cor));

    // Mostrar stats dos jogadores
    console.log(colorir("\n📊 STATUS DOS JOGADORES:", "ciano"));
    jogadoresSelecionados.forEach(jogador => {
        console.log(colorir(`\n${jogador.nome}:`, jogador.cor));

        // Exibir atributos usando loop
        for (const [atributoKey, config] of Object.entries(ATRIBUTOS_CONFIG)) {
            const valor = jogador[atributoKey];
            const barra = barraProgresso(valor, ESCALA_ATRIBUTOS);
            console.log(`   ${config.emoji} ${config.label}: ${barra} (${valor}/${ESCALA_ATRIBUTOS})`);
        }
    });

    return jogadoresSelecionados;
}

function sortearBloco() {
    const indice = Math.floor(Math.random() * jogo.tiposBloco.length);
    return jogo.tiposBloco[indice];
}

function jogarDado() {
    return Math.floor(Math.random() * 6) + 1;
}

function calcularPontos(jogador, bloco) {
    const dado = jogarDado();
    let pontos = 0;
    let atributoUsado = "";

    switch(bloco) {
        case "reta":
            pontos = dado + jogador.velocidade;
            atributoUsado = "velocidade";
            break;
        case "curva":
            pontos = dado + jogador.manobrabilidade;
            atributoUsado = "manobrabilidade";
            break;
        case "confronto":
            pontos = dado + jogador.poder;
            atributoUsado = "poder";
            break;
    }

    // Retornar dados de cálculo para apresentação separada
    return { pontos, dado, atributoUsado };
}

// Função separada para exibir cálculo de pontos
function exibirCalculoPontos(jogador, resultado) {
    const { pontos, dado, atributoUsado } = resultado;
    const config = ATRIBUTOS_CONFIG[atributoUsado];

    console.log(colorir(`   🎲 Dado: ${dado}`, "amarelo"));
    console.log(colorir(`   ${config.emoji} + ${config.label}: ${jogador[atributoUsado]}`, config.cor));
    console.log(colorir(`   🏁 TOTAL: ${pontos} pontos`, "ciano"));
}

// Função para mostrar o placar atualizado
function mostrarPlacar(jogadores) {
    console.log(colorir("\n📋 PLACAR ATUAL:", "magenta"));
    const maxPontos = Math.max(...jogadores.map(j => j.pontos), 1);

    jogadores.forEach(jogador => {
        const barra = barraProgresso(jogador.pontos, maxPontos, 15);
        console.log(colorir(`${jogador.nome}:`, jogador.cor) +
                   ` ${jogador.pontos} pontos ${colorir(barra, "verde")}`);
    });
}

// Função principal da corrida
async function iniciarCorrida() {
    await mostrarTitulo();

    // PASSO 1: Selecionar jogadores
    jogo.jogadoresSelecionados = await selecionarJogadores();

    // Aguardar para dar tempo de ler
    await delay(TIMINGS.leituraTitulo);

    // Resetar pontos
    jogo.jogadoresSelecionados.forEach(jogador => jogador.pontos = 0);

    console.log(colorir("\n" + "═".repeat(LARGURA_SEPARADOR), "amarelo"));

    // PASSO 2: Executar rodadas
    for (let rodada = 1; rodada <= jogo.numeroRodadas; rodada++) {
        console.log(colorir(`\n📢 RODADA ${rodada} DE ${jogo.numeroRodadas}`, "bgAzul") + cores.reset);

        // Contagem regressiva
        for (let i = 3; i > 0; i--) {
            process.stdout.write(`\r${i}... `);
            await delay(TIMINGS.contagemRegressiva);
        }
        console.log(colorir("GO! 🏁\n", "verde"));

        const bloco = sortearBloco();
        const config = BLOCO_CONFIG[bloco];

        // Mostrar bloco da pista
        console.log(colorir(`📍 BLOCO: ${config.label}`, config.cor) + ` ────${config.emoji}────`);
        console.log("");

        // Cada jogador compete
        for (const jogador of jogo.jogadoresSelecionados) {
            console.log(colorir(`${jogador.nome}`, jogador.cor) + " está jogando...");
            await delay(TIMINGS.delayEntreJogadores);

            const resultado = calcularPontos(jogador, bloco);
            jogador.pontos += resultado.pontos;

            exibirCalculoPontos(jogador, resultado);
            console.log(colorir(`   ✨ ${jogador.nome} agora tem ${jogador.pontos} pontos!\n`, "branco"));
            await delay(TIMINGS.delayEntreJogadores);
        }

        mostrarPlacar(jogo.jogadoresSelecionados);
        console.log(colorir("\n" + "─".repeat(LARGURA_SEPARADOR), "ciano"));

        // Pausa entre rodadas
        await delay(TIMINGS.delayEntreRodadas);
    }

    // PASSO 3: Resultado final
    console.log(colorir("\n🏆 RESULTADO FINAL 🏆", "bgAmarelo") + cores.reset);
    console.log("");

    // Gerar pódio
    const jogadoresOrdenados = [...jogo.jogadoresSelecionados].sort((a, b) => b.pontos - a.pontos);
    const medalhões = ["🥇 PRIMEIRO LUGAR", "🥈 SEGUNDO LUGAR"];
    const coresMedalhões = ["amarelo", "branco"];

    medalhões.forEach((medalha, index) => {
        const jogador = jogadoresOrdenados[index];
        console.log(colorir(`   ${medalha} 🏆`, coresMedalhões[index]));
        console.log(colorir(`   ${jogador.nome} com ${jogador.pontos} pontos!`, jogador.cor));
        console.log("");
    });

    console.log(colorir("=".repeat(LARGURA_SEPARADOR), "amarelo"));

    // Mensagem de vitória personalizada
    const vencedor = jogadoresOrdenados[0];
    const diferenca = Math.abs(jogadoresOrdenados[0].pontos - jogadoresOrdenados[1].pontos);

    if (diferenca > DIFERENCA_VITORIA_ESMAGADORA) {
        console.log(colorir(`🎉 VITÓRIA ESFREGAÇANTE DE ${vencedor.nome}! 🎉`, "verde"));
    } else if (diferenca > DIFERENCA_BOA_VANTAGEM) {
        console.log(colorir(`🏆 ${vencedor.nome} VENCEU COM BOA VANTAGEM! 🏆`, "ciano"));
    } else {
        console.log(colorir(`😱 ${vencedor.nome} GANHOU POR POUCO! QUE CORRIDA EMOCIONANTE! 😱`, "magenta"));
    }

    console.log(colorir("=".repeat(LARGURA_SEPARADOR), "amarelo"));

    // Mensagem de saída
    console.log(colorir("\n🔄 Deseja jogar novamente? (s/n)", "ciano"));
    console.log(colorir("(Pressione Ctrl+C para sair ou execute o programa novamente)", "branco"));
}

// =============================================
// INICIAR O JOGO
// =============================================
iniciarCorrida().catch(console.error);