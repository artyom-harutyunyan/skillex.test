import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../utils/variables';
import { seed as seedItems } from './items';
import { seed as seedCombinations } from './combinations';
import { seed as seedResponses } from './responses';


async function seed() {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log('Database created successfully!');

    const database = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    await seedItems(database);
    await seedCombinations(database);
    await seedResponses(database);

    console.log('Database seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error}`);
  }
}

seed();