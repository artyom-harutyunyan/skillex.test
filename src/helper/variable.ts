export function envVariable(variable: string, convertTo?: string): string | number | boolean {
  const envVar = process.env[variable];
  if (envVar != null && envVar.trim() !== '') {
    switch (convertTo?.toLowerCase()) {
    case 'int':
      return parseInt(envVar, 10);
    case 'string':
      return envVar.toString();
    case 'boolean':
      return !!(envVar === 'true');
    default:
      return envVar;
    }
  }
  throw new Error(`Environment variable ${variable} is not set.`);
}