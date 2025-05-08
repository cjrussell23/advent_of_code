import { readInput } from "../utils";

const input = readInput('03')
let total = 0;
const matches = [...input.matchAll(/mul\(\d{1,3},\d{1,3}\)/g)].map(([match]) => {
  const parts = match.split(',').map(part => parseInt(part.replace(/\D+/g, "")));
  total += parts[0] * parts[1]
})

console.log(total)