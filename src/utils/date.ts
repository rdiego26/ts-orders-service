export class DateUtils {
  public static getFirstDayOfMonth(year: number, month: number): Date {
    return new Date(year, month, 1);
  }

  public static getLastDayOfMonth(year: number, month: number): Date {
    return new Date(year, month + 1, 0);
  }
}
