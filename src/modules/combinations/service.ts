import { letters } from '../../constants';
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
    const results: string[][] = [];
    if (combinationLength <= 0 || combinationLength > values.length) return results;
    const combination: string[] = [];
    const usedPrefixes = new Set();
  
    function combine(fromIndex: number) {
      if (combination.length === combinationLength) {
        results.push(combination.slice());
        return;
      }
      let isValidCombination = true;
      for (let i = fromIndex; i < values.length; i++) {
        const prefix = prefixes[i];
        if (usedPrefixes.has(prefix)) continue;
        if (combination.length) {
          for (let c = 0; c < combination.length; c++) {
            const existsCombinationPrefix = combination[c]?.substring(0, 1);
            if (values[i]?.includes(existsCombinationPrefix as string)) {
              isValidCombination = false;
            };
          }
        }

        if (isValidCombination) {
          combination.push(values[i] as string);
          usedPrefixes.add(prefix);
          combine(i + 1);
          combination.pop();
          usedPrefixes.delete(prefix);
        }
        isValidCombination = true;
      }
    }
  
    combine(0);
    return results;
  }

}

export default new Service();