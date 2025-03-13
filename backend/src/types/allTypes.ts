export type llmModel = "groq" | "hf" | "gemma";

export interface messageInterface {
  role: string;
  content: string;
}
