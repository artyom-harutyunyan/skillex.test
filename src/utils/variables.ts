import { envVariable } from "../helper/variable";

export const PORT = envVariable("PORT", "int") as number;
export const DB_HOST = envVariable("DB_HOST", "string") as string;
export const DB_USER = envVariable("DB_USER", "string") as string;
export const DB_PASSWORD = envVariable("DB_PASSWORD", "string") as string;
export const DB_NAME = envVariable("DB_NAME", "string") as string;