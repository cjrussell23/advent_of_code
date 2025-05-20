import { readFileSync } from "fs";
export function readInput(day: string, test?: boolean) {
  if (test) return readFileSync(`src/tests/${day}`, 'utf-8').trim();
  return readFileSync(`src/inputs/${day}`, 'utf-8').trim();
}
