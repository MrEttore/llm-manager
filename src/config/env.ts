import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  llmCoreUrl: process.env.LLM_CORE_URL ?? 'http://localhost:11434',
  openaiApiKey: process.env.OPENAI_API_KEY,

  // ... other providers
};

if (!ENV.openaiApiKey) throw new Error('Missing OPENAI_API_KEY');
