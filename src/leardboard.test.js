import { putScore, getScores } from './leaderboard.js';

describe('Test Adding Player scores and getting all scores for leaderboard from API', () => {
  test('Should save the score to the API', () => {
    putScore('Jest t1', 40).then(data => {
      expect(data.result).toBe('Leaderboard score created correctly.');
    });
  });
  test('Should receive an object from the API', () => {
    getScores().then(data => {
      expect(typeof data).toBe('object');
    });
  });
  test('The object should contain the created user', () => {
    getScores().then(data => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            user: 'Jest t1',
          }),
        ]),
      );
    }).catch(() => {

    });
  });
  test('The object should contain the created score', () => {
    getScores().then(data => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            score: '40',
          }),
        ]),
      );
    }).catch(() => {

    });
  });
});