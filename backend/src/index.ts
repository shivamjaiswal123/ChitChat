import { app } from './app';
import { connectDatabase } from './db/db';
import { startWebSocketServer } from './ws';

const port = process.env.PORT || 3000;

const startHTTPServer = async () => {
  try {
    await connectDatabase();
    console.log('Connected to DB');

    const http = app.listen(port, () => {
      console.log(`HTTP Server started on port: ${port}`);
    });

    startWebSocketServer(http);
  } catch (error) {
    console.error('Error while running the server: ', error);
  }
};

startHTTPServer();
