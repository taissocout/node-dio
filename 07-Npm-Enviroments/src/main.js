// main.js
import { connectToDatabase, disconnectFromDatabase } from './database/data.js';

async function main() {
  await connectToDatabase('admin', '123456');
  // Resto do código
  await disconnectFromDatabase();
}

main();