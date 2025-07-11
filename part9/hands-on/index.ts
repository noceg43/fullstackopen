// rule of dumbs: try to use import first instead of require, 
// if it doesn't work, use require and read the suggested VScode fix
import express from 'express';
import { calculator, Operation } from './calculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});


app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  // use the as keyword to assert the type of op
  const result = calculator(
    Number(value1), Number(value2), op as Operation
  );
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});