//export default function connectToDatabase
exports.connectToDatabase = async (dataName) => {
    console.log("Conectando ao banco de dados: " + dataName);
    await doBreakLine();
    if (dataName === "ProdutosDB") {
        console.log("Conexão bem-sucedida ao banco de dados: " + dataName);
    } else {
        console.log("Falha ao conectar ao banco de dados: " + dataName);    
    }
}    

exports.disconnectFromDatabase = async (dataName) => {
    console.log("Desconectando do banco de dados: " + dataName);
    await doBreakLine();
    if (dataName === "ProdutosDB") {
        console.log("Desconexão bem-sucedida do banco de dados: " + dataName);
    } else {
        console.log("Falha ao desconectar do banco de dados: " + dataName);    
    }
}

//Hidden function, not exported, used to break line in the console.
const doBreakLine = async () => {
    console.log("\n");
}
