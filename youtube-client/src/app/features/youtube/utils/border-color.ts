const DAY_IN_MILLISECOND = 86400000;
const MONTH_IN_MILLISECOND = DAY_IN_MILLISECOND * 30;
const COUNT_MONTHS = 6;
const COUNT_DAYS = 7;

const RED_COLOR = '#f48282';
const YELLOW_COLOR = '#ffff90';
const GREEN_COLOR = '#8aba8a';
const BLUE_COLOR = '#5b5b9d';

export function getBorderColor(publishTime: string): string {
  const difference = Date.now() - new Date(publishTime).getTime();
  if (difference > MONTH_IN_MILLISECOND * COUNT_MONTHS) {
    return RED_COLOR;
  }
  if (difference > MONTH_IN_MILLISECOND) {
    return YELLOW_COLOR;
  }
  if (difference > DAY_IN_MILLISECOND * COUNT_DAYS) {
    return GREEN_COLOR;
  }
  return BLUE_COLOR;
}
