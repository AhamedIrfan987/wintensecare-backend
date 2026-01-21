import type { Range } from "@/types/heart";

/* Convert range to milliseconds */
export function getRangeMs(range: Range): number {
  switch (range) {
    case "30m":
      return 30 * 60 * 1000;
    case "1h":
      return 60 * 60 * 1000;
    case "8h":
      return 8 * 60 * 60 * 1000;
    case "1d":
      return 24 * 60 * 60 * 1000;
    case "7d":
      return 7 * 24 * 60 * 60 * 1000;
    default:
      return 60 * 60 * 1000;
  }
}

/* Suggested tick counts for the X axis per range */
export function getTickCount(range: Range): number {
  switch (range) {
    case "30m":
      return 6; // every ~5 min
    case "1h":
      return 6; // every ~10 min
    case "8h":
      return 8; // hourly-ish
    case "1d":
      return 6; // every 4 hours
    case "7d":
      return 7; // daily
    default:
      return 6;
  }
}