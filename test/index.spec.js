// importamos la funcion que vamos a testear
import { signIn } from '../src/lib/index.js';

describe('login usuario existente', () => {
  it('debería ser una función', () => {
    expect(typeof signIn).toBe('function');
  });
});
