import { Calc } from '../src/calc';

describe('calc', () => {
  it('addition', () => {
    const calc = new Calc();
    expect(calc.add(1, 2)).toEqual(3);
  });
});
