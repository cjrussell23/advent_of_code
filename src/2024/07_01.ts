import { readInput } from "../utils";

function getInput() {
  const input = readInput('07');
  const lines = input.split('\n').map(line => {
    const [total, numbers] = line.split(':');
    const nums = numbers.trim().split(' ').map(num => parseInt(num.trim()));
    return {
      total: parseInt(total.trim()),
      nums,
    };
  });
  return lines;
}

function getOperatorCombinations(positions: number) {
  const operators = ["+", "*"];
  const combinations: string[] = [];
  const max = Math.pow(operators.length, positions - 1);
  for (let i = 0; i < max; i++) {
    let combination = "";
    let num = i;
    for (let j = 0; j < positions - 1; j++) {
      const index = num % operators.length;
      combination += operators[index];
      num = Math.floor(num / operators.length);
    }
    combinations.push(combination);
  }
  return combinations;
}

function getTotals(nums: number[]) {
  const totals: number[] = [];
  const combinations = getOperatorCombinations(nums.length);
  for (const combination of combinations) {
    let total = nums[0];
    for (let i = 0; i < combination.length; i++) {
      if (combination[i] === "+") {
        total += nums[i + 1];
      } else if (combination[i] === "*") {
        total *= nums[i + 1];
      }
    }
    totals.push(total);
  }
  return totals;
}

function main() {
  const input = getInput();
  let totalCount = 0;
  input.forEach(({ total, nums }) => {
    const totals = getTotals(nums);
    if (totals.includes(total)) totalCount += total;
  });
  console.log("Total Count:", totalCount);
}

main();