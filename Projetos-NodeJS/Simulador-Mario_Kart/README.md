# 🏁 Mario Kart Simulator - Node.js

<div align="center">
  
  ![Versão](https://img.shields.io/badge/versão-1.0.0-blue)
  ![Node](https://img.shields.io/badge/node-%3E%3D12.0.0-brightgreen)
  ![Licença](https://img.shields.io/badge/licença-MIT-green)
  ![Status](https://img.shields.io/badge/status-finalizado-success)

  <h3>🎮 Um simulador de corrida divertido direto no seu terminal!</h3>
  
  <img src="https://media.giphy.com/media/l0MYEqE2MW0Z29TKE/giphy.gif" alt="Mario Kart" width="400"/>
  
</div>

## 📋 Sobre o Projeto

Este é um simulador de Mario Kart desenvolvido em Node.js como parte de um curso de aprendizado. O programa simula uma corrida entre dois personagens aleatórios, com 5 rodadas emocionantes onde cada bloco da pista testa diferentes habilidades dos pilotos.

### 🎯 Objetivo do Jogo

- Dois personagens competem em 5 rodadas
- Cada rodada tem um tipo de bloco diferente (Reta, Curva ou Confronto)
- Os pontos são calculados com base no atributo correspondente + um dado de 6 lados
- Quem acumular mais pontos ao final vence a corrida!

## ✨ Funcionalidades

- ✅ **6 Personagens Únicos**: Mario, Luigi, Peach, Yoshi, Bowser e Toad
- ✅ **Atributos Especiais**: Cada personagem tem níveis diferentes de velocidade, manobrabilidade e poder
- ✅ **Sistema de Blocos**: Reta (Velocidade), Curva (Manobrabilidade) e Confronto (Poder)
- ✅ **Dado Aleatório**: Pontuação = Dado (1-6) + Atributo do Personagem
- ✅ **Interface Colorida**: Cores personalizadas para cada personagem e tipo de bloco
- ✅ **Animações**: Efeitos visuais para tornar a experiência mais imersiva
- ✅ **Placar em Tempo Real**: Acompanhe a pontuação durante toda a corrida
- ✅ **Sistema Anti-Pontos Negativos**: Garantia de pontuação justa

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado (versão 12 ou superior)
- Terminal com suporte a cores (recomendado)

### Passo a Passo

1. **Clone o repositório**
   
   git clone https://github.com/seu-usuario/mario-kart-simulator.git
   cd mario-kart-simulator
2. **Execute o simulador**

node mario-kart.js

3. **Divirta-se! 🎉**

#### 🎮 Como Jogar
O jogo é totalmente automático! Basta executar e assistir à corrida:

Seleção de Jogadores: O sistema escolhe aleatoriamente 2 dos 6 personagens

5 Rodadas Emocionantes: Cada rodada tem um bloco sorteado

Cálculo de Pontos:

text
Pontos = Dado (1-6) + Atributo do Personagem
4. **Resultado Final: O personagem com mais pontos é declarado vencedor!**

**📊 Personagens e Atributos**
Personagem	Velocidade	Manobrabilidade	Poder	Cor
Mario	5	4	3	🔴 Vermelho
Luigi	4	5	3	🟢 Verde
Peach	4	4	4	💗 Rosa
Yoshi	5	3	4	🟢 Verde
Bowser	3	3	5	🔥 Vermelho
Toad	4	5	3	🔵 Azul
🏁 Tipos de Bloco
RETA 🏃: Usa o atributo Velocidade

CURVA 🌀: Usa o atributo Manobrabilidade

CONFRONTO ⚔️: Usa o atributo Poder

## **📝 Exemplo de Execução**
text
🏁🏁🏁 MARIO KART SIMULATOR 🏁🏁🏁

🎮 SELECIONANDO JOGADORES...
Jogador 1: Mario
Jogador 2: Bowser

=== RODADA 1 ===
📍 BLOCO: RETA

Mario:
   🎲 Dado: 5
   ⚡ Velocidade: 5
   🏁 TOTAL: 10 pontos

Bowser:
   🎲 Dado: 3
   ⚡ Velocidade: 3
   🏁 TOTAL: 6 pontos

🏆 RESULTADO FINAL 🏆
Mario: 42 pontos
Bowser: 38 pontos

## **🎉 O VENCEDOR É MARIO! 🎉**
🛠️ Tecnologias Utilizadas
Node.js - Ambiente de execução JavaScript

Cores ANSI - Interface colorida no terminal

JavaScript (ES6+) - Lógica do jogo

# **📁 Estrutura do Projeto**
text
mario-kart-simulator/
│
├── mario-kart.js          # Código principal do jogo
├── README.md              # Documentação
└── package.json           # Configurações do projeto
🎯 Próximos Passos (Sugestões de Melhorias)
Adicionar mais personagens (Daisy, Wario, Rosalina)

Implementar diferentes pistas com características únicas

Criar modo multiplayer com inputs do usuário

Adicionar itens especiais (casca de banana, cogumelo, etc.)

Salvar histórico de corridas em um arquivo

Criar torneio com vários jogadores

## **🤝 Contribuindo**
Este é um projeto de aprendizado, mas contribuições são bem-vindas!

Faça um fork do projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'feat: Adiciona nova funcionalidade')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

# **📄 Licença**
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

# **👨‍💻 Autor**
Taisso Cout - Desenvolvido durante curso de Node.js - GitHub

### **🙏 Agradecimentos**
Nintendo pela inspiração do Mario Kart

Instrutores do curso de Node.js

#### **Comunidade open source**

<div align="center">
Feito com 💚 e JavaScript

⬆ Voltar ao topo

##### O código foi enviado e reajustado com vibe coding para deixar a interface mais bonita no terminal, incluindo cores personalizadas, animações e placar em tempo real.

</div> 