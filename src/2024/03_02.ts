import { readInput } from "../utils";

const input = readInput('03')
let total = 0;
let mul = true;
const matches = [...input.matchAll(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g)].map(([match]) => {
  if (match === "don't()") mul = false;
  else if (match === "do()") mul = true;
  else if (mul) {
    const parts = match.split(',').map(part => parseInt(part.replace(/\D+/g, "")));
    total += parts[0] * parts[1]
  }
})

console.log(total)