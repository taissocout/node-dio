// main.js
import { connectToDatabase, disconnectFromDatabase } from './database/data.js';

async function main() {
  await connectToDatabase(process.env.USERDATABASE,
    process.env.PASSWORDDATABASE);
  // Resto do código
  await disconnectFromDatabase();
}

main();