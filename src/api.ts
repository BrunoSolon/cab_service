import crypto from 'node:crypto';
import express from 'express';
import pgp from 'pg-promise';
import { validate } from './validateCpf';
const app = express();
app.use(express.json());

app.post('/signup', async function (req, res) {
  let result;
  const connection = pgp()('postgres://postgres:123456@localhost:5432/app');
  try {
    const id = crypto.randomUUID();

    const [acc] = await connection.query('select * from cccat15.account where email = $1', [req.body.email]);
    if (acc) {
      // already exists
      result = -4;
    } else {
      if (/[A-Za-z] [A-Za-z]+/.test(req.body.name)) {
        if (/^(.+)@(.+)$/.test(req.body.email)) {
          if (validate(req.body.cpf)) {
            if (req.body.isDriver) {
              if (/[A-Z]{3}\d{4}/.test(req.body.carPlate)) {
                await connection.query(
                  'insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)',
                  [
                    id,
                    req.body.name,
                    req.body.email,
                    req.body.cpf,
                    req.body.carPlate,
                    !!req.body.isPassenger,
                    !!req.body.isDriver
                  ]
                );

                const obj = {
                  accountId: id
                };
                result = obj;
              } else {
                // invalid car plate
                result = -5;
              }
            } else {
              await connection.query(
                'insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)',
                [
                  id,
                  req.body.name,
                  req.body.email,
                  req.body.cpf,
                  req.body.carPlate,
                  !!req.body.isPassenger,
                  !!req.body.isDriver
                ]
              );

              const obj = {
                accountId: id
              };
              result = obj;
            }
          } else {
            // invalid cpf
            result = -1;
          }
        } else {
          // invalid email
          result = -2;
        }
      } else {
        // invalid name
        result = -3;
      }
    }
    if (typeof result === 'number') {
      res.status(422).send(result + '');
    } else {
      res.json(result);
    }
  } finally {
    await connection.$pool.end();
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
