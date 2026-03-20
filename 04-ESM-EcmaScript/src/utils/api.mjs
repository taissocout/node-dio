const key = {
    apiKey: "1234567890abcdef",
    secretKey: "abcdef1234567890",
    permission: "Admin"
}

export const fetchData = () => {
    // Simulando uma requisição a uma API
    console.log("Buscando dados da API...");
    console.log(`Usando a chave de API: ${key.apiKey}`);
    console.log(`Usando a chave secreta: ${key.secretKey}`);
    console.log(`Permissão do usuário: ${key.permission}`);
    doBreakLine();
}


async function doBreakLine () {
    console.log("\n")
}

