export class DateUtils {
  public static getFirstDayOfMonth(year: number, month: number): Date {
    return new Date(year, month, 1);
  }

  public static getLastDayOfMonth(year: number, month: number): Date {
    return new Date(year, month + 1, 0);
  }

  public static getNextDayOfTheWeek(
    dayName: string,
    excludeToday: boolean = true,
    refDate: Date = new Date(),
  ): Date | undefined {
    const dayOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(dayName.slice(0, 3).toLowerCase());
    if (dayOfWeek < 0) return;
    refDate.setHours(0, 0, 0, 0);
    refDate.setDate(refDate.getDate() + +excludeToday + ((dayOfWeek + 7 - refDate.getDay() - +excludeToday) % 7));

    return refDate;
  }
}
