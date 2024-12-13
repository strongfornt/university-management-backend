import { Server } from 'http';
import app from './app';
import config from './app/config';

import mongoose from 'mongoose';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.db_url as string);
   server = app.listen(config.port, () => {
      console.log(`listening on port ${config.port}`);
    });
  } catch (error: any) {
    console.log(error.message);
  }
}

main();


process.on('unhandledRejection', ()=> {
  console.log('unhandledRejection is detected, shutting down the server');
  if(server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () =>  {
  console.log('uncaughtException is detected, shutting down the server');
  process.exit(1)
})



