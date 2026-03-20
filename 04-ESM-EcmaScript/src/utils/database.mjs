const dataBaseType = {
    userType: "User",
    productType: "Product",
    orderType: "Order"
}

async function connectToDataBase(dataBase) {
    // Simulando uma conexão com o banco de dados
    console.log(`Conectando ao banco de dados: ${dataBase}...`);
    doBreakLine();
}

async function disconnectFromDataBase(dataBase) {
    // Simulando uma desconexão com o banco de dados
    console.log(`Desconectando do banco de dados: ${dataBase}...`);
    doBreakLine();
}

//Hidden function, not exported, used to break line in the console.
async function doBreakLine () {
    console.log("\n");
}


export { connectToDataBase, disconnectFromDataBase, dataBaseType };