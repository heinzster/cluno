import { agent } from 'supertest';
import app from '../src/app';

const appAgent = agent(app);

describe('Cluno REST app works correctly', () => {
  describe('GET / correctly works', () => {
  });
});
