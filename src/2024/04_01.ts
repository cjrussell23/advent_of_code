import { readInput } from "../utils";

const input = readInput('04')
const regular = input.split('\n')
const { diagonal, reverseDiagonal, vertical } = getRotations(regular);

const horizontalTotal = getXmasTotal(regular);
const verticalTotal = getXmasTotal(vertical)
const diagonalTotal = getXmasTotal(diagonal);
const reverseDiagonalTotal = getXmasTotal(reverseDiagonal);
const total = horizontalTotal + verticalTotal + diagonalTotal + reverseDiagonalTotal;
console.log(total);

function isXMAS(chunk: string) {
  return chunk === 'XMAS' || chunk === 'SAMX'
}

function getXmasTotal(lines: string[]) {
  let total = 0;
  lines.forEach(line => {
    if (line.length < 4) return;
    for (let i = 0; i < line.length - 3; i++) {
      const chunk = line.slice(i, i + 4);
      const isXmas = isXMAS(chunk);
      if (isXmas) {
        total++;
      }
    }
  })
  return total;
}

function getRotations(input: string[]) {
  const rows = input.length;
  const cols = input[0]?.length || 0;

  const diagonal: string[] = [];
  const reverseDiagonal: string[] = []
  const vertical: string[] = [];

  for (let i = 0; i < input[0].length; i++) {
    let str = '';
    for (let j = 0; j < input.length; j++) {
      str += input[j][i]
    }
    vertical.push(str);
  }
  for (let d = 0; d < rows + cols - 1; d++) {
    let diag = '';
    let rev = '';
    for (let i = 0; i <= d; i++) {
      const j = d - i;
      if (i < rows && j < cols) {
        diag += input[i][j];
      }
      const row = rows - 1 - i;
      if (row >= 0 && j < cols) {
        rev += input[row][j];
      }
    }
    diagonal.push(diag);
    reverseDiagonal.push(rev)
  }

  return { diagonal, reverseDiagonal, vertical };
}