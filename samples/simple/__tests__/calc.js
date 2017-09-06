import { Calc } from '../calc';

test('addition', () => {
  const calc = new Calc();
  expect(calc.add(1, 2)).toEqual([1,2,3,4]);
});
