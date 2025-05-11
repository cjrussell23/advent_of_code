import { readInput } from "../utils";

const input = readInput('05')
const sections = input.split('\n\n');

const rules = sections[0].split('\n').map(line => line.split('|').map(Number));
const instructions = sections[1].split('\n').map(line => line.split(',').map(Number));

let total = 0;
for (const set of instructions) {
  const sortedSet = [...set];
  sortedSet.sort((a, b) => {
    const rule = rules.find(rule => rule.includes(a) && rule.includes(b));
    if (rule) {
      const indexA = rule.indexOf(a);
      const indexB = rule.indexOf(b);
      return indexA - indexB;
    }
    return 0;
  });
  const eq = sortedSet.every((value, index) => value === set[index]);
  if (!eq) {
    const center = sortedSet[Math.floor(set.length / 2)];
    total += center;
    // console.log(`Set: ${sortedSet}, Center: ${center}`);
  }
}

console.log(`Total: ${total}`);