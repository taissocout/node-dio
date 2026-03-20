//Todas as fuções que lidam com o produtos.



const productsTypes = ["Bebidas", "Alimentos", "Eletrônicos", "Roupas", "Calçados"];

async function getFullName(codeId, productName, price) {
    console.log("Produto: " + codeId + "--" + productName + "--" + price);
    await doBreakLine();
}

async function getName(productName) {
    console.log("Nome do produto: " + productName);
    await doBreakLine(); 
}

async function getPrice(price) {
    console.log("Preço do produto: " + price);
    await doBreakLine();
}

//Hidden function, not exported, used to break line in the console.
async function doBreakLine() {
    console.log("\n");
}


//Exportando as funções para serem usadas em outros arquivos.
module.exports = {
    getFullName,
    getName,
    getPrice,
    productsTypes
}