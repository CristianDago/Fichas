import { DateTime } from "luxon";
export const formatDateForInput = (date: string | Date | undefined): string => {
  if (!date) return "";
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }
  if (date instanceof Date) {
    return DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");
  }
  if (typeof date === "string" && DateTime.fromISO(date).isValid) {
    // Aquí no hace falta 'as string'
    return DateTime.fromISO(date).toFormat("yyyy-MM-dd");
  }
  return "";
};
