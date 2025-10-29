import dotenv from 'dotenv';
dotenv.config();
import request from 'supertest';
import app from '../src/server';


describe('POST /generate', () => {
  it('Should return combinations', async () => {
    const res = await request(app)
      .post('/generate')
      .send({
        items: [1, 2, 1],
        length: 2,
      })
      .expect(200);

    expect(res.body).toEqual({
      id: expect.any(Number),
      combinations: [
        ['A1', 'B1'],
        ['A1', 'B2'],
        ['A1', 'C1'],
        ['B1', 'C1'],
        ['B2', 'C1'],
      ],
    });
  });

  it('Should return error for invalid combinations length', async () => {
    const res = await request(app)
      .post('/generate')
      .send({
        items: [],
        length: 0,
      })
      .expect(400);

    expect(res.body).toEqual({
      error: 'Invalid combinations length',
    });
  });

  it('Should return error for invalid body model', async () => {
    const res = await request(app)
      .post('/generate')
      .send({
        items: [
          1,
          2,
          1
      ],
        length: "0",
      })
      .expect(400);

    expect(res.body).toEqual({
      _errors: [],
      length: {
          _errors: [
              "Invalid input: expected number, received string"
          ]
      }
    });
  });
});
