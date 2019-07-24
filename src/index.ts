import express from 'express';
import http from 'http';
import fs from 'fs';
import Bundler from 'parcel-bundler';
import path from 'path';

const app: express.Application = express();
const server: http.Server = new http.Server(app);

const port: number = 8080 || parseInt(process.env.PORT, 10);

app.use(express.static('dist'));
app.use('/Resources', express.static('Resources'));

app.get('/', (req: express.Request, res: express.Response) => {
  const page: string = fs.readFileSync(__dirname + '/../dist/index.html', 'utf8');
  res.send(page);
});

server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
