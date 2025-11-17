import { app } from '@/app.js';
import { ENV } from '@/config/env.js';
const port = ENV.port;

app.listen(port, () => {
  console.log(`⚡️ LLM Manager listening on port ${port}`);
});
