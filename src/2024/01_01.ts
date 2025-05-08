import { readInput } from "../utils";

const input = readInput('01');

const pairs = input.split('\n');
const left: number[] = [];
const right: number[] = [];

pairs.forEach(pair => {
  const [l, r] = pair.split("  ");
  left.push(parseInt(l));
  right.push(parseInt(r));
})

left.sort();
right.sort();

let distance = 0;
for (let i = 0; i < left.length; i++) {
  distance += Math.abs(left[i] - right[i]);
}

console.log(distance);