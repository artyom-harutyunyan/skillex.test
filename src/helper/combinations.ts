export class CombinationsHelper {
  private values: string[];
  private prefixes: string[];
  private combinationLength: number;

  private combinations: string[][] = [];

  constructor(values: string[], prefixes: string[], combinationLength: number) {
    this.values = values;
    this.prefixes = prefixes;
    this.combinationLength = combinationLength;
  }

  private validate(): boolean {
    return !(this.combinationLength <= 0 || this.combinationLength > this.values.length);
  }

  public generate() {
    const isValid = this.validate();
    if (!isValid) return this.combinations;
    const combination: string[] = [];
    const usedPrefixes = new Set();
    this.generateLocalCombination(0, combination, usedPrefixes);
  }

  private generateLocalCombination(start: number, combination: string[], usedPrefixes: Set<unknown>) {
    if (combination.length === this.combinationLength) {
      return this.combinations.push(combination.slice());
    }

    for (let i = start; i < this.values.length; i++) {
      const prefix = this.prefixes[i];
      const value = this.values[i] as string;
      let isValidCombination = true;
      if (usedPrefixes.has(prefix)) continue;

      if (combination.length) {
        for (let c = 0; c < combination.length; c++) {
          const existsCombinationPrefix = combination[c]?.substring(0, 1);
          if (this.values[i]?.includes(existsCombinationPrefix as string)) {
            isValidCombination = false;
          };
        }
      }
      if (isValidCombination) {
        combination.push(value);
        this.generateLocalCombination(i + 1, combination, usedPrefixes.add(prefix));
        combination.pop();
        usedPrefixes.delete(prefix);
      }

      isValidCombination = true;

    }
  }

  public getResults() {
    return this.combinations;
  }

}