import mysql from 'mysql2/promise';
export async function seed(database: mysql.Connection) {
  await database.query(`DROP TABLE IF EXISTS items`);

  await database.query(`
    CREATE TABLE items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      value VARCHAR(10) NOT NULL,
      prefix CHAR(1) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Items seeded successfully!');
}