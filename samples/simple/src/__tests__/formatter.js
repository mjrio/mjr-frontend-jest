import { formatList } from '../formatter';

test('can format a list', () => {
  const items = [
    { name: 'Qui-Gon Jinn' },
    { name: 'Chewbacca' },
    { name: 'Han Solo' },
    { name: 'Luke Skywalker' },
  ];
  const result = formatList('Star Wars Names', items, 'name');

  //
  // Add here your test code
  //
});
