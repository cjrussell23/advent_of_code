import { readFileSync } from "fs";
export function readInput(day: string) {
  return readFileSync(`src/inputs/${day}`, 'utf-8').trim();
}
