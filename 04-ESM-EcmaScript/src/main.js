// Vamos usar modulação com ESM (EcmaScript Modules)
// Para isso, precisamos usar a extensão .mjs ou configurar o package.json com "type": "module"
// Neste exemplo, vamos usar a extensão .mjs

// import * as dataBase from './utils/database.mjs';
// import config from './services/config.mjs';

// function main() {
//     dataBase.connectToDataBase("MinhaBaseDeDados");
//     dataBase.disconnectFromDataBase("MinhaBaseDeDados");

//     console.log("Configurações de Desenvolvimento:", config.development);
//     console.log("Configurações de Produção:", config.production);
// }

// main();

import { connectToDataBase, dataBaseType, disconnectFromDataBase} from './utils/database.mjs';
import config from './services/config.mjs';
import * as api from './utils/api.mjs';

connectToDataBase();

async function main() {
   await api.fetchData() 
   console.log("Usuario: ", api.fetchData)
}


disconnectFromDataBase();

main()