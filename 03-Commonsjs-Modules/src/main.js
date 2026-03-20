//Importando as funções específicas do módulo de produtos
// const { getName, getPrice } = require('./services/products');
const {productsTypes, productsService, getName, getPrice}= require('./services/products');
const config = require("./services/config");
const database = require("./services/database");

//Função principal do programa
async function main() {
    // console.log("Tipos de produtos disponíveis: " + productsService.productsTypes.join(", "));
    // console.log('Carrinho comprastando produtos...');
    // // productsService.getFullName("408", "Coca-cola", "R$ 5,00");
    // // productsService.getFullName("409", "Pepsi", "R$ 4,00");
    // productsService.getName("Coca-cola");
    // productsService.getName("Pepsi");
    // productsService.getPrice(""408", R$ 5,00");
    // productsService.getPrice("R$ 4,00");
    productsTypes.forEach(type => console.log("Tipo de produto: " + type));
    getName("Coca-cola");
    getPrice("R$ 5,00");
    console.log("Conectando ao banco de dados...");
    await database.connectToDatabase("ProdutosDB");
    console.log("Configurações do ambiente: " + config.devArea.version + " - " + config.devArea.production + " - " + config.client.device);

}


//Conectando ao banco de dados antes de executar a função principal

//Executando a função principal do programa

main();