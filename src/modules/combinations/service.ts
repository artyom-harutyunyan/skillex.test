import { letters } from '../../constants';
import { CombinationsHelper } from '../../helper/combinations';
import { Repository } from './repository';
import { IBody } from './schema';

class Service {
  public async generate(data: IBody) {
    const { values, prefixes } = this.generateItems(data.items);
    const combinations = this.getCombinations(values, prefixes, data.length);
    if (combinations.length === 0) throw new Error('Invalid combinations length', { cause: 400 });
    const items = values.map((value) => ({value, prefix: value.substring(0, 1)}));
    const res = await Repository.insertByTransactions(combinations, items, data);
    return res;
  }

  private generateItems(eachCounts: number[]) {
    const values: string[] = [], prefixes: string[] = [];
    for (let i = 0; i < eachCounts.length; i++) {
      const count = eachCounts[i] as number;
      const prefix = letters[i];
      prefixes.push(`${prefix}`);
      for (let j = 0; j < count; j++) {
        values.push(`${prefix}${j + 1}`);
      }

    }
    return { values, prefixes };
  }

  private getCombinations(values: string[], prefixes: string[], combinationLength: number) {
    const combinationHelper = new CombinationsHelper(values, prefixes, combinationLength);
    combinationHelper.generate();
    return combinationHelper.getResults();
  }
  
}

export default new Service();