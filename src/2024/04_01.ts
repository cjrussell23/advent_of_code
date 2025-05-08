import { readInput } from "../utils";

const input = readInput('04')
const lines = input.split('\n')
// lines.forEach(line => console.log(line))


const vert: string[] = [];
for (let i = 0; i < lines[0].length; i++) {
  let str = '';
  for (let j = 0; j < lines.length; j++) {
    str += lines[j][i]
  }
  vert.push(str);
}

const { diagonals: d1, reverse: d2 } = getDiagonals(lines);

const horizontal = chunks(lines);
const vertical = chunks(vert)
const diagonal1 = chunks(d1);
const diagonal2 = chunks(d2);

console.log('D1');
// d1.forEach(line => console.log(line));
console.log(diagonal1);

console.log('D2');
// d2.forEach(line => console.log(line));
console.log(diagonal2);

console.log('Horizontal')
// lines.forEach(line => console.log(line))
console.log(horizontal);

console.log('Vertical');
// vert.forEach(line => console.log(line))
console.log(vertical);

console.log(diagonal1 + diagonal2 + horizontal + vertical)

function xmas(chunk: string) {
  return chunk === 'XMAS' || chunk === 'SAMX'
}
function chunks(lines: string[]) {
  let total = 0;
  lines.forEach(line => {
    if (line.length < 4) return;
    for (let i = 0; i < line.length - 3; i++) {
      const chunk = line.slice(i, i + 4);
      const isXmas = xmas(chunk);
      if (isXmas) {
        // console.log(`line: [${line}], ${i}`)
        total++;
      }
    }
  })
  return total;
}

function getDiagonals(lines: string[]) {
  const rows = lines.length;
  const cols = lines[0]?.length || 0;
  const diagonals: string[] = [];
  const reverse: string[] = []
  for (let d = 0; d < rows + cols - 1; d++) {
    let diag = '';
    let rev = '';
    for (let i = 0; i <= d; i++) {
      const j = d - i;
      if (i < rows && j < cols) {
        diag += lines[i][j];
      }
      const row = rows - 1 - i;
      if (row >= 0 && j < cols) {
        rev += lines[row][j];
      }
    }
    diagonals.push(diag);
    reverse.push(rev)
  }

  return { diagonals, reverse }
}

function getAllAntiDiagonals<T>(matrix: T[][]): T[][] {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;
  const antiDiagonals: T[][] = [];

  const diag: T[] = [];
  for (let d = 0; d < rows + cols - 1; d++) {
    for (let i = 0; i <= d; i++) {
      const j = d - i;
      if (i < rows && j < cols) {
        diag.push(matrix[i][j]);
      }
    }
    antiDiagonals.push(diag);
  }

  return antiDiagonals;
}
