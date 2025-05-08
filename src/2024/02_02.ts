import { readInput } from "../utils";

const input = readInput('02');

const reports = input.split('\n').map(input => input.split(' ').map(str => parseInt(str)));

const total = reports.reduce((acc: number, curr: number[]) =>
  validate_with_removal(curr) ? acc + 1 : acc
  , 0)
console.log(total);

function validate_with_removal(report: number[]) {
  if (validate(report)) return true;
  for (let i = 0; i < report.length; i++) {
    const valid = validate(report.slice(0, i).concat(report.slice(i + 1)))
    if (valid) return true;
  }
  return false;
}

function validate(row: number[]) {
  const diffs = [...row.keys()].slice(0, row.length - 1).map((index) => row[index] - row[index + 1]);
  return diffs.every((v) => v > 0 && v <= 3) || diffs.every((v) => v < 0 && v >= -3);
}