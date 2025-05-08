import { readInput } from "../utils";

const input = readInput('02');
let total = 0;
const reports = input.split('\n').map(input => input.split(' ').map(str => parseInt(str)));
reports.forEach(report => {
  let safe = true;
  const asc = report[1] > report[0];
  let prev = report[0];
  for (let i = 1; i < report.length; i++) {
    const level = report[i];
    const diff = level - prev; // 7 5 = -2
    if (asc) {
      if (diff < 1 || diff > 3) safe = false;
    }
    else if (diff > -1 || diff < -3) safe = false;
    prev = level;
  }
  if (safe) total += 1
})
console.log(total);

