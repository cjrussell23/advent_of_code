import { readInput } from "../utils";

type Block = number | undefined;

function getIds(input: string) {
  let free = false;
  const result: Block[] = [];
  let index = 0;
  for (let i = 0; i < input.length; i++) {
    const char = parseInt(input[i]);
    for (let j = 0; j < char; j++) {
      if (free) {
        result.push(undefined);
      } else {
        result.push(index);
      }
    }
    if (!free) {
      index++;
    }
    free = !free;
  }
  return result;
}

function findFirst(input: Block[], start: number) {
  for (let i = start; i < input.length; i++) {
    const block = input[i];
    if (block === undefined) {
      return i;
    }
  }
}

function moveBlocks(input: Block[]) {
  let first: number | undefined = 0;
  for (let i = input.length - 1; i >= 0; i--) {
    const block = input[i];
    if (block === undefined) {
      continue;
    }
    first = findFirst(input, first);
    if (!first) {
      break;
    }
    if (first > i) {
      continue;
    }
    input[first] = block;
    input[i] = undefined;
  }
  return input;
}

function getChecksum(input: Block[]) {
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    const block = input[i];
    if (block === undefined) {
      continue;
    }
    result += block * i;
  }
  return result;
}

function main() {
  const raw = readInput("09");
  const ids = getIds(raw);
  const blocks = moveBlocks(ids);
  const checksum = getChecksum(blocks);
  console.log(checksum);
}

main();
