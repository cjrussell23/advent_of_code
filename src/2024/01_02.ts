import { readInput } from "../utils";

const input = readInput('01')

const pairs = input.split('\n');
const left: number[] = [];
const right: number[] = [];

pairs.forEach(pair => {
  const [l, r] = pair.split("  ");
  left.push(parseInt(l));
  right.push(parseInt(r));
})

let sim = 0;
left.forEach(l => {
  right.forEach(r => {
    if (l === r) sim += l
  })
})

console.log(sim);