import { createUser } from '../userService';

test('createUser', () => {
  const result = createUser('peter', 52);
  expect(result).toEqual({
    name: 'peter',
    age: 52,
  });
});
