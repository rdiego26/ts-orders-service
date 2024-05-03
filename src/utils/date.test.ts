import { DateUtils } from './date';
import { describe, expect, test } from '@jest/globals';

describe('Date Util', () => {
  test('should return first day of month', () => {
    const january5nd = new Date(2024, 0, 5);
    const result = DateUtils.getFirstDayOfMonth(january5nd.getFullYear(), january5nd.getMonth());
    const expected = new Date(2024, 0, 1);

    expect(result).toStrictEqual(expected);
  });

  test('should return last day of month', () => {
    const januaryFirst = new Date(2024, 0, 1);
    const result = DateUtils.getLastDayOfMonth(januaryFirst.getFullYear(), januaryFirst.getMonth());
    const expected = new Date(2024, 0, 31);

    expect(result).toStrictEqual(expected);
  });
});
