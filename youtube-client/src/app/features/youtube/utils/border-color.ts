const DAY_IN_MILLISECOND = 86400000;
const MONTH_IN_MILLISECOND = DAY_IN_MILLISECOND * 30;
const COUNT_MONTHS = 6;
const COUNT_DAYS = 7;

export function getBorderColor(publishTime: string): string {
  const difference = Date.now() - new Date(publishTime).getTime();
  if (difference > MONTH_IN_MILLISECOND * COUNT_MONTHS) {
    return '#f48282';
  }
  if (difference > MONTH_IN_MILLISECOND) {
    return '#ffff90';
  }
  if (difference > DAY_IN_MILLISECOND * COUNT_DAYS) {
    return '#8aba8a';
  }
  return '#5b5b9d';
}
