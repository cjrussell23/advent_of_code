import { readInput } from "../utils";

const input = readInput('04')
const regular = input.split('\n')

function getChunks(lines: string[]): string[][][] {
  const chunks: string[][][] = [];
  for (let row = 0; row < lines.length - 2; row++) {
    for (let col = 0; col < lines[row].length - 2; col++) {
      const chunk: string[][] = [];
      for (let i = 0; i < 3; i++) {
        const chunkRow: string[] = [];
        for (let j = 0; j < 3; j++) {
          chunkRow.push(lines[row + i][col + j]);
        }
        chunk.push(chunkRow);
      }
      chunks.push(chunk);
    }
  }
  return chunks;
}

function isMAS(chunk: string) {
  return chunk === 'MAS' || chunk === 'SAM'
}

function isXMAS(chunk: string[][]) {
  const diagonal = chunk[0][0] + chunk[1][1] + chunk[2][2];
  const reverseDiagonal = chunk[0][2] + chunk[1][1] + chunk[2][0];
  return isMAS(diagonal) && isMAS(reverseDiagonal);
}

function main() {
  const chunks = getChunks(regular);
  let total = 0;
  chunks.forEach(chunk => {
    const isXmas = isXMAS(chunk);
    if (isXmas) {
      total++;
    }
  })
  console.log(total);
}

main();