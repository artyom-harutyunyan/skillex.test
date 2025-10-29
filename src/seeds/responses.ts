import mysql from 'mysql2/promise';

export async function seed(database: mysql.Connection) {
  await database.query(`DROP TABLE IF EXISTS responses`);

  await database.query(`
    CREATE TABLE responses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      payload JSON NOT NULL,
      combinations JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Responses seeded successfully!');
}