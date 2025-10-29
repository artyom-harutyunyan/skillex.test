import dotenv from 'dotenv';
dotenv.config();

import server from './server';
import http from 'node:http';
import { PORT } from './utils/variables';

http.createServer(server).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});