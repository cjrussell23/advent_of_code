import { readInput } from "../utils";

function printInput(input: string) {
  // Print the input with numbered axes
  const lines = input.split('\n');
  const maxX = lines[0].length;
  const maxY = lines.length;
  console.log(' ', Array.from({ length: maxX }, (_, i) => i % 10).join(' '));
  for (let i = 0; i < maxY; i++) {
    const line = lines[i];
    const row = line.split('').map((char, j) => {
      if (char === '.') return '.';
      return char;
    }).join(' ');
    console.log(i % 10, row);
  }
}

function printMap(
  width: number,
  height: number,
  antennas: Map<string, { x: number, y: number }[]>,
  antinodes: Map<string, { x: number, y: number }[]>,
) {
  const map: string[][] = Array.from({ length: height }, () => Array(width).fill('.'));

  // Add antinodes as "#" if they exist and are in bounds
  if (antinodes) {
    antinodes.forEach((positions) => {
      positions.forEach(({ x, y }) => {
        if (x >= 0 && x < width && y >= 0 && y < height) {
          map[y][x] = '#';
        }
      });
    });
  }

  // Add antennas (these take precedence over antinodes)
  antennas.forEach((positions, char) => {
    positions.forEach(({ x, y }) => {
      map[y][x] = char;
    });
  });

  console.log(' ', Array.from({ length: width }, (_, i) => i % 10).join(' '));
  for (let i = 0; i < height; i++) {
    const row = map[i].map((char, j) => {
      if (char === '.') return '.';
      return char;
    }).join(' ');
    console.log(i % 10, row);
  }
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

function getAntinodes(antenna: { x: number, y: number }[]) {
  const antinodes: { x: number, y: number }[] = [];
  for (let i = 0; i < antenna.length; i++) {
    for (let j = 0; j < antenna.length; j++) {
      if (i === j) continue;
      const x = antenna[i].x + (antenna[i].x - antenna[j].x);
      const y = antenna[i].y + (antenna[i].y - antenna[j].y);
      antinodes.push({ x, y });
    }
  }
  return antinodes;
}

function getUniqueAntinodesWithinBounds(
  antinodes: Map<string, { x: number, y: number }[]>,
  width: number,
  height: number,
) {
  const flattenedAntinodes = Array.from(antinodes.values()).flat();
  const uniqueAntinodes = new Set<string>();
  for (const { x, y } of flattenedAntinodes) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      uniqueAntinodes.add(`${x},${y}`);
    }
  }
  return Array.from(uniqueAntinodes).map((pos) => {
    const [x, y] = pos.split(',').map(Number);
    return { x, y };
  });
}

function main() {
  const raw = readInput('08');
  const { width, height } = getWidthAndHeight(raw);
  const antennas = getInput(raw);
  const antinodes: Map<string, { x: number, y: number }[]> = new Map();
  for (const [char, antenna] of antennas) {
    const antenna_antinodes = getAntinodes(antenna);
    antinodes.set(char, antenna_antinodes);
  }
  const uniqueAntinodes = getUniqueAntinodesWithinBounds(
    antinodes,
    width,
    height,
  );
  // printMap(width, height, antennas, antinodes);
  console.log('uniqueAntinodes', uniqueAntinodes.length);
}

main();