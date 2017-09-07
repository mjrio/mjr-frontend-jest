import { formatList } from '../formatter';

test('can format a list', () => {
  const formattedList = formatList(
    'Star Wars Names',
    [
      { name: 'Qui-Gon Jinn' },
      { name: 'Chewbacca' },
      { name: 'Han Solo' },
      { name: 'Luke Skywalker' },
    ],
    'name',
  );
});
