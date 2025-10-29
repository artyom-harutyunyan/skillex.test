import { ResultSetHeader } from 'mysql2';
import { database } from '../../database';

export class Repository {
  public static async getByIdList(list: number[], table: string) {
    const query = `SELECT * FROM ${table} WHERE id IN (${list})`;
    const [rows] = await database.query(query);
    return rows;
  }

  public static async insert(data: unknown, columns: string, table: string) {
    const values = columns.split(', ').map((item: unknown) => '?').join(', ');
    const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
    const [rows] = await database.query<ResultSetHeader>(query, data);
    return rows;
  }

  public static async insertItems<T = unknown>(data: T[]) {
    return Repository.insert(data, 'value, prefix', 'items');;
  }

  public static async insertCombinations<T = unknown>(data: T) {
    const result = await Repository.insert(data, 'combinations', 'combinations');
    const [rows] = await database.query<any>(
      `SELECT id, combinations FROM combinations WHERE id = ?`,
      [result.insertId]
    );
    return rows[0];
  }

  public static async insertResponses<T = unknown>(data: T[]) {
    return Repository.insert(data, 'payload, combinations', 'responses');
  }

  public static async insertByTransactions(combinations: string[][], items: { value: string, prefix: string }[], payload: object) {
    const connection = await database.getConnection();
    try {
      await connection.beginTransaction();

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        await Repository.insertItems([item?.value, item?.prefix]);
      }

      await Repository.insertResponses([JSON.stringify(payload), JSON.stringify(combinations)]);

      const combination = await Repository.insertCombinations(JSON.stringify(combinations));

      await connection.commit();

      return combination;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  }
}