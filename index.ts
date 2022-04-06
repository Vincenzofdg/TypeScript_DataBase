import express, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import 'express-async-errors';
import Books from './routes/books.routes'

const app = express();

app.use(express.json());

const PORT =  process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => res.status(StatusCodes.OK).send('Express + TypeScript'));

app.use('/books', Books);

// Tratamento de Erro:
app.use((err: Error , req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;
  console.log(`name: ${name}`);

  switch(name) {
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflitError':
      res.status(409).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }

  next()
});

app.listen(PORT, () => console.log(`Server is running at http://localhost: ${PORT}`));
