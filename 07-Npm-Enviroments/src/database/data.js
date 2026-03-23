async function connectToDatabase(user, password) {
    // Simulando uma conexão com o banco de dados
    if (user === process.env.USERDATABASE && password === process.env.USERDATABASE) {
        console.log("Conexão bem-sucedida ao banco de dados!");
    } else {
        console.log("Falha ao conectar ao banco de dados!");
    }
    
}

async function disconnectFromDatabase() {
    // Simulando uma desconexão com o banco de dados
    console.log("Desconexão bem-sucedida do banco de dados!");
}


export { connectToDatabase, disconnectFromDatabase};