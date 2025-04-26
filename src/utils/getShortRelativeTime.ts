import dayjs from "dayjs";

export const getShortRelativeTime = (date: string | Date) => {
  const now = dayjs();
  const target = dayjs(date);

  const minutes = now.diff(target, "minute");
  if (minutes < 60) return `${minutes}m`;

  const hours = now.diff(target, "hour");
  if (hours < 24) return `${hours}h`;

  const days = now.diff(target, "day");
  if (days < 30) return `${days}d`;

  const months = now.diff(target, "month");
  if (months < 12) return `${months}mo`;

  const years = now.diff(target, "year");
  return `${years}y`;
};
