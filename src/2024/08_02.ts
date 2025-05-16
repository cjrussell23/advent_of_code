import { readInput } from "../utils";

function printInput(input: string): string {
  // Print the input with numbered axes
  const lines = input.split('\n');
  const maxX = lines[0].length;
  const maxY = lines.length;

  let result = `  ${Array.from({ length: maxX }, (_, i) => i % 10).join(' ')}\n`;
  for (let i = 0; i < maxY; i++) {
    const line = lines[i];
    const row = line.split('').map((char, j) => {
      if (char === '.') return '.';
      return char;
    }).join(' ');
    result += `${i % 10} ${row}\n`;
  }

  return result;
}

function printMap(
  width: number,
  height: number,
  antennas: Map<string, { x: number, y: number }[]>,
  antinodes: { x: number, y: number }[],
): string {
  const map: string[][] = Array.from({ length: height }, () => Array(width).fill('.'));

  antinodes.forEach(({ x, y }) => {
    map[y][x] = '#';
  });

  antennas.forEach((positions, char) => {
    positions.forEach(({ x, y }) => {
      map[y][x] = char;
    });
  });


  let result = `  ${Array.from({ length: width }, (_, i) => i % 10).join(' ')}\n`;
  for (let i = 0; i < height; i++) {
    const row = map[i].map((char, j) => {
      if (char === '.') return '.';
      return char;
    }).join(' ');
    result += `${i % 10} ${row}\n`;
  }

  return result;
}

function getWidthAndHeight(input: string) {
  const lines = input.split('\n');
  const width = lines[0].length;
  const height = lines.length;
  return { width, height };
}


function getInput(input: string) {
  const antennas: Map<string, { x: number, y: number }[]> = new Map();
  const lines = input.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '.') continue;
      const antenna = antennas.get(char);
      if (!antenna) {
        antennas.set(char, [{ x: j, y: i }]);
      }
      else {
        antenna.push({ x: j, y: i });
      }
    }
  }
  return antennas;
}

function getAntinodes(antenna: { x: number, y: number }[], width: number, height: number) {
  const antinodes: { x: number, y: number }[] = [];
  for (let i = 0; i < antenna.length; i++) {
    for (let j = 0; j < antenna.length; j++) {
      if (i === j) continue;
      const dx = antenna[i].x - antenna[j].x;
      const dy = antenna[i].y - antenna[j].y;
      let x = antenna[i].x + dx;
      let y = antenna[i].y + dy;
      while (x >= 0 && x < width && y >= 0 && y < height) {
        antinodes.push({ x, y });
        x += dx;
        y += dy;
      }
    }
  }
  // Also add the original antenna positions
  antenna.forEach(({ x, y }) => {
    antinodes.push({ x, y });
  });
  return antinodes;
}

function main() {
  const raw = readInput('08');
  const { width, height } = getWidthAndHeight(raw);
  const antennas = getInput(raw);
  const antinodes: Set<string> = new Set();
  for (const [char, antenna] of antennas) {
    const nodes = getAntinodes(antenna, width, height);
    nodes.forEach(({ x, y }) => {
      antinodes.add(`${x},${y}`);
    });
  }
  const uniqueAntinodes = Array.from(antinodes).map((pos) => {
    const [x, y] = pos.split(',').map(Number);
    return { x, y };
  });
  const answer = printMap(width, height, antennas, uniqueAntinodes);
  console.log(answer);

  console.log('uniqueAntinodes', uniqueAntinodes.length);
}

main();