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

// Função para criar textos coloridos
function colorir(texto, cor) {
    return cores[cor] + texto + cores.reset;
}

function colorirBg(texto, bgCor) {
    return cores[bgCor] + texto + cores.reset;
}

// Função para criar animação de digitação
function digitar(texto, velocidade = 30) {
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
    await digitar(colorir("Preparem-se para a corrida mais emocionante do terminal!\n\n", "ciano"), 50);
}

// Função para selecionar jogadores
async function selecionarJogadores() {
    console.log(colorir("\n🎮 SELECIONANDO JOGADORES...", "amarelo"));
    
    // Animação de roleta
    const roleta = ["⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️"];
    for (let i = 0; i < 20; i++) {
        process.stdout.write(`\r${roleta[i % roleta.length]} Sorteando jogadores ${roleta[(i+1) % roleta.length]}`);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    console.log("\n");
    
    const jogadoresEmbaralhados = [...jogo.personagens].sort(() => Math.random() - 0.5);
    const jogadoresSelecionados = jogadoresEmbaralhados.slice(0, 2);
    
    console.log(colorir("✅ JOGADORES DEFINIDOS!", "verde"));
    console.log(colorir(`\nJogador 1: ${jogadoresSelecionados[0].nome}`, jogadoresSelecionados[0].cor));
    console.log(colorir(`Jogador 2: ${jogadoresSelecionados[1].nome}`, jogadoresSelecionados[1].cor));
    
    // Mostrar stats dos jogadores
    console.log(colorir("\n📊 STATUS DOS JOGADORES:", "ciano"));
    jogadoresSelecionados.forEach(jogador => {
        console.log(colorir(`\n${jogador.nome}:`, jogador.cor));
        console.log(`   ⚡ Velocidade: ${'█'.repeat(jogador.velocidade)}${'░'.repeat(5-jogador.velocidade)} (${jogador.velocidade}/5)`);
        console.log(`   🌀 Manobrabilidade: ${'█'.repeat(jogador.manobrabilidade)}${'░'.repeat(5-jogador.manobrabilidade)} (${jogador.manobrabilidade}/5)`);
        console.log(`   💪 Poder: ${'█'.repeat(jogador.poder)}${'░'.repeat(5-jogador.poder)} (${jogador.poder}/5)`);
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
    
    switch(bloco) {
        case "reta":
            pontos = dado + jogador.velocidade;
            console.log(colorir(`   🎲 Dado: ${dado}`, "amarelo"));
            console.log(colorir(`   ⚡ + Velocidade: ${jogador.velocidade}`, "verde"));
            console.log(colorir(`   🏁 TOTAL: ${pontos} pontos`, "ciano"));
            break;
        case "curva":
            pontos = dado + jogador.manobrabilidade;
            console.log(colorir(`   🎲 Dado: ${dado}`, "amarelo"));
            console.log(colorir(`   🌀 + Manobrabilidade: ${jogador.manobrabilidade}`, "azul"));
            console.log(colorir(`   🏁 TOTAL: ${pontos} pontos`, "ciano"));
            break;
        case "confronto":
            pontos = dado + jogador.poder;
            console.log(colorir(`   🎲 Dado: ${dado}`, "amarelo"));
            console.log(colorir(`   💪 + Poder: ${jogador.poder}`, "vermelho"));
            console.log(colorir(`   🏁 TOTAL: ${pontos} pontos`, "ciano"));
            break;
    }
    
    return pontos;
}

// Função para mostrar o placar atualizado
function mostrarPlacar(jogadores) {
    console.log(colorir("\n📋 PLACAR ATUAL:", "magenta"));
    const maxPontos = Math.max(...jogadores.map(j => j.pontos), 1);
    
    jogadores.forEach(jogador => {
        const barra = barraProgresso(jogador.pontos, maxPontos, 15);
        console.log(colorir(`${jogador.nome}:`, jogador.cor) + 
                   ` ${jogador.pontos} pontos ${colorir(barra, jogador.pontos > 0 ? "verde" : "branco")}`);
    });
}

// Função principal da corrida
async function iniciarCorrida() {
    await mostrarTitulo();
    
    // PASSO 1: Selecionar jogadores
    jogo.jogadoresSelecionados = await selecionarJogadores();
    
    // Aguardar 1 segundo para dar tempo de ler
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Resetar pontos
    jogo.jogadoresSelecionados.forEach(jogador => jogador.pontos = 0);
    
    console.log(colorir("\n" + "═".repeat(50), "amarelo"));
    
    // PASSO 2: Executar rodadas
    for (let rodada = 1; rodada <= jogo.numeroRodadas; rodada++) {
        console.log(colorir(`\n📢 RODADA ${rodada} DE ${jogo.numeroRodadas}`, "bgAzul") + cores.reset);
        
        // Animação de contagem regressiva
        for (let i = 3; i > 0; i--) {
            process.stdout.write(`\r${i}... `);
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        console.log(colorir("GO! 🏁\n", "verde"));
        
        const bloco = sortearBloco();
        
        // Mostrar bloco com cor específica
        if (bloco === "reta") {
            console.log(colorir(`📍 BLOCO: ${bloco.toUpperCase()}`, "verde") + " ────🏃💨────");
        } else if (bloco === "curva") {
            console.log(colorir(`📍 BLOCO: ${bloco.toUpperCase()}`, "azul") + " ────🌀──────");
        } else {
            console.log(colorir(`📍 BLOCO: ${bloco.toUpperCase()}`, "vermelho") + " ────⚔️──────");
        }
        console.log("");
        
        // Cada jogador compete
        for (const jogador of jogo.jogadoresSelecionados) {
            console.log(colorir(`${jogador.nome}`, jogador.cor) + " está jogando...");
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const pontosGanhos = calcularPontos(jogador, bloco);
            jogador.pontos += pontosGanhos;
            
            if (jogador.pontos < 0) jogador.pontos = 0;
            
            console.log(colorir(`   ✨ ${jogador.nome} agora tem ${jogador.pontos} pontos!\n`, "branco"));
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        mostrarPlacar(jogo.jogadoresSelecionados);
        console.log(colorir("\n" + "─".repeat(50), "ciano"));
        
        // Pequena pausa entre rodadas
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // PASSO 3: Resultado final
    console.log(colorir("\n🏆 RESULTADO FINAL 🏆", "bgAmarelo") + cores.reset);
    console.log("");
    
    // Animação do pódio
    const jogadoresOrdenados = [...jogo.jogadoresSelecionados].sort((a, b) => b.pontos - a.pontos);
    
    console.log(colorir("   🥇 PRIMEIRO LUGAR 🥇", "amarelo"));
    console.log(colorir(`   ${jogadoresOrdenados[0].nome} com ${jogadoresOrdenados[0].pontos} pontos!`, jogadoresOrdenados[0].cor));
    console.log("");
    
    console.log(colorir("   🥈 SEGUNDO LUGAR 🥈", "branco"));
    console.log(colorir(`   ${jogadoresOrdenados[1].nome} com ${jogadoresOrdenados[1].pontos} pontos!`, jogadoresOrdenados[1].cor));
    
    console.log(colorir("\n" + "=".repeat(50), "amarelo"));
    
    // Mensagem de vitória personalizada
    const vencedor = jogadoresOrdenados[0];
    const diferenca = Math.abs(jogadoresOrdenados[0].pontos - jogadoresOrdenados[1].pontos);
    
    if (diferenca > 10) {
        console.log(colorir(`🎉 VITÓRIA ESFREGAÇANTE DE ${vencedor.nome}! 🎉`, "verde"));
    } else if (diferenca > 5) {
        console.log(colorir(`🏆 ${vencedor.nome} VENCEU COM BOA VANTAGEM! 🏆`, "ciano"));
    } else {
        console.log(colorir(`😱 ${vencedor.nome} GANHOU POR POUCO! QUE CORRIDA EMOCIONANTE! 😱`, "magenta"));
    }
    
    console.log(colorir("=".repeat(50), "amarelo"));
    
    // Perguntar se quer jogar novamente
    console.log(colorir("\n🔄 Deseja jogar novamente? (s/n)", "ciano"));
    // Para simular, vamos esperar 3 segundos e encerrar
    console.log(colorir("(Pressione Ctrl+C para sair ou execute o programa novamente)", "branco"));
}

// =============================================
// INICIAR O JOGO
// =============================================
iniciarCorrida().catch(console.error);

/* 
// Simulador de Mario Kart em Node.js
// Regras & mecanicas do jogo: Jogadores: Mario, Luigi, Peach, Yoshi, Bowser, Toad.
//O Computador deve receber dois personagens para disputar a corrida em um objetivo cada.
// Pistas: Os personagens irão corre em uma pista aleatória de 5 rodadas
//A cada rodada, será sorteado um bloco da pista que pode ser uma reta, curva ou confronto
// caso o  bloco da pista seja uma RETA,, o jogador deve jogar um dado de 6 lados e somar o atributo de VELOCIDADE do personagem, quem vencer ganha um ponto
// caso o bloco da pista seja uma CURVA, o jogador deve jogar um dado de 6 lados e somar o atributo de MANOBRABILIDADE do personagem, quem vencer ganha um ponto
// caso o bloco da pista seja um CONFRONTO, o jogador deve jogar um dado de 6 lados e somar o atributo de PODER do personagem, quem vencer ganha um ponto
// Nenhum jogador pode ter pontuaçao negativa(valor abaixo de 0)
//condição de vitória:
// Ao final, vence quem acumulou mais pontos.
let corrida = {
  jogadores: [
    {
      nome: "Mario",
      velocidade: 5,
      manobrabilidade: 4,
      poder: 3,
      pontos: 0
    },
    {
      nome: "Luigi",
      velocidade: 4,
      manobrabilidade: 5,
      poder: 3,
      pontos: 0
    },
    {
      nome: "Peach",
      velocidade: 4,
      manobrabilidade: 4,
      poder: 4,
      pontos: 0
    },
    {
      nome: "Yoshi",
      velocidade: 5,
      manobrabilidade: 3,
      poder: 4,
      pontos: 0
    },
    {
      nome: "Bowser",
      velocidade: 3,
      manobrabilidade: 3,
      poder: 5,
      pontos: 0
    },
    {
      nome: "Toad",
      velocidade: 4,
      manobrabilidade: 5,
      poder: 3,
      pontos: 0
    }
  ],
  pistas: ["reta", "curva", "confronto"],
  rodadas: 5
};

// Função para sortear um bloco da pista
function sortearBloco() {
  const indice = Math.floor(Math.random() * corrida.pistas.length);
  return corrida.pistas[indice];
}

// Função para jogar o dado de 6 lados
function jogarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

// Função para calcular os pontos de cada jogador
function calcularPontos(jogador, bloco) {
  let pontos = 0;
    const dado = jogarDado();
    if (bloco === "reta") {
        pontos = dado + jogador.velocidade;
    } else if (bloco === "curva") {
        pontos = dado + jogador.manobrabilidade;
    } else if (bloco === "confronto") {
        pontos = dado + jogador.poder;
    }
    return pontos;
}

// Simulação da corrida
for (let i = 0; i < corrida.rodadas; i++) {
  const bloco = sortearBloco();
  console.log(`Rodada ${i + 1}: Bloco da pista - ${bloco}`);
    corrida.jogadores.forEach(jogador => {
        const pontos = calcularPontos(jogador, bloco);
        jogador.pontos += pontos;
        if (jogador.pontos < 0) {
            jogador.pontos = 0; // Garantir que os pontos não sejam negativos
        }
        console.log(`${jogador.nome} ganhou ${pontos} pontos. Total: ${jogador.pontos}`);
    });
  console.log('-----------------------------');
}

// Determinar o vencedor
corrida.jogadores.sort((a, b) => b.pontos - a.pontos);
const vencedor = corrida.jogadores[0];
console.log(`O vencedor é ${vencedor.nome} com ${vencedor.pontos} pontos!`);

OBS: ESSE FOI O CODIGO INICIAL, E FEITO UM VIBE CODING COM IA PARA MELHORAR O CODIGO, DEIXANDO ELE MAIS ORGANIZADO, LEGIVEL E COM MAIS DETALHES PARA O USUÁRIO. O CODIGO FINAL ESTÁ NO ARQUIVO index.js
PROMPT USADO, SE TORNE ESPECIALISTA EM NODE.JS , E ME AJUDE A DEIXAR O MEU CODIGO MAIS BONITO QUANDO FOR EXECUTADO NO TERMINAL*/