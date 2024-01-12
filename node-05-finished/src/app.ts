//  Request, Response, NextFunction 是 express 提供的类型，用来告诉 express 这个函数是用来处理请求的，它接受三个参数，分别是 Request, Response, NextFunction
import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import todoRoutes from './routes/todos';

const app = express();

app.use(json());

app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
