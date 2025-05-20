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

function moveBlocks(input: Block[]) {
  let start = input.length - 1;
  while (start >= 0) {
    if (input[start] === undefined) {
      start--;
      continue;
    }
    let end = start;
    while (end >= 0 && input[end] === input[start]) {
      end--;
    }
    const length = start - end;
    let emptyStart = 0;
    let emptyLength = 0;
    while (
      emptyStart < input.length &&
      emptyLength < length &&
      emptyStart < start
    ) {
      if (input[emptyStart] !== undefined) {
        emptyStart++;
        continue;
      }
      let emptyEnd = emptyStart;
      while (emptyEnd < input.length && input[emptyEnd] === undefined) {
        emptyEnd++;
      }
      emptyLength = emptyEnd - emptyStart;
      if (emptyLength >= length) {
        break;
      }
      emptyStart += emptyLength;
    }
    if (emptyLength >= length) {
      for (let k = 0; k < length; k++) {
        input[emptyStart + k] = input[start - k];
        input[start - k] = undefined;
      }
    }
    start -= length;
  }
  return input;
}

function main() {
  const raw = readInput("09");
  const ids = getIds(raw);
  const moved = moveBlocks(ids);
  const checksum = getChecksum(moved);
  console.log(checksum);
}

main();
