import { readInput } from "../utils";

function blink(stoneMap: Map<number, number>) {
  const newStoneMap = new Map<number, number>();

  for (const [stone, count] of stoneMap.entries()) {
    const changedStones = change(stone);
    for (const newStone of changedStones) {
      const currentCount = newStoneMap.get(newStone) || 0;
      newStoneMap.set(newStone, currentCount + count);
    }
  }

  return newStoneMap;
}

function change(stone: number) {
  if (stone === 0) {
    return [1];
  }
  const str = stone.toString();
  if (str.length % 2 === 0) {
    const mid = str.length / 2;
    return [parseInt(str.slice(0, mid)), parseInt(str.slice(mid))];
  }
  const result = Number(BigInt(stone) * BigInt(2024) % BigInt(Number.MAX_SAFE_INTEGER));

  return [result];
}

function countStones(stones: number[], blinks: number) {
  let stoneMap = new Map<number, number>();

  for (const stone of stones) {
    stoneMap.set(stone, (stoneMap.get(stone) || 0) + 1);
  }

  for (let i = 0; i < blinks; i++) {
    stoneMap = blink(stoneMap);
    const totalStones = Array.from(stoneMap.values()).reduce((sum, count) => sum + count, 0);
    console.log(`Blinks: ${i + 1}, Stones: ${totalStones}`);
  }

  return Array.from(stoneMap.values()).reduce((sum, count) => sum + count, 0);
}

function part1() {
  const input = readInput("11");
  let stones = input.split(" ").map(Number);
  const blinks = 25;
  const result = countStones(stones, blinks);
  console.log(result);
}

function part2() {
  const input = readInput("11");
  let stones = input.split(" ").map(Number);
  const blinks = 75;
  const result = countStones(stones, blinks);
  console.log(result);
}

function test() {
  const input = readInput("11", true);
  let stones = input.split(" ").map(Number);
  const tests = [
    {
      blinks: 6,
      expected: 22,
    },
    {
      blinks: 25,
      expected: 55312
    }
  ];
  for (const test of tests) {
    const count = countStones(stones, test.blinks);
    console.log(`Blinks: ${test.blinks}, Count: ${count}, Expected: ${test.expected}`);
    if (count !== test.expected) {
      console.error(`Test failed for blinks: ${test.blinks}`);
    }
  }
}

part2();