// src/nvs.ts
import { config } from "dotenv";

config({ path: ".env" }); // Carrega as variáveis do arquivo .env

export enum EnvKey {
  ATLAS_CONNECTION_STRING = "ATLAS_CONNECTION_STRING",
  HUGGING_FACE_ACCESS_TOKEN = "HUGGING_FACE_ACCESS_TOKEN",
}

export class EnvHandler {
  getEnv(key: EnvKey): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }
  getEnvAsNumber(key: EnvKey): number {
    const value = this.getEnv(key);
    const parsed = Number.parseInt(value);
    if (isNaN(parsed)) {
      throw new Error(`Environment variable ${key} is not a valid number.`);
    }
    return parsed;
  }

}
