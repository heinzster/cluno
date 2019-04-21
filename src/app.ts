import * as express from 'express';
import indexRouter from './index_router';

const app = express();

app.use('/', indexRouter);

export default app;
