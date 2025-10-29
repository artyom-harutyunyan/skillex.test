import mysql from 'mysql2/promise';

export async function seed(database: mysql.Connection) {
  await database.query(`DROP TABLE IF EXISTS combinations`);

  await database.query(`
    CREATE TABLE combinations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      combinations JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Combinations seeded successfully!');
}