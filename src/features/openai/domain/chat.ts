export type ChatMessage = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

export type GenerateCompletionParams = {
  model: string;
  messages: ChatMessage[];
};

export type GenerateCompletionResult = {
  role: 'assistant';
  content: string | null;
};

export type StreamCompletionParams = {
  model: string;
  messages: ChatMessage[];
  signal?: AbortSignal;
};

export type StreamCompletionResult = {
  role: 'user' | 'system' | 'assistant' | 'tool' | 'developer';
  content: string | null;
};
