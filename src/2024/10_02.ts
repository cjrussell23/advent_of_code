import { readInput } from "../utils";

function getPositions(map: number[][], x: number, y: number) {
  const directions = [
    { dx: 0, dy: -1 }, // up
    { dx: 1, dy: 0 }, // right
    { dx: 0, dy: 1 }, // down
    { dx: -1, dy: 0 }, // left
  ];
  const positions: { x: number, y: number }[] = [];
  for (const { dx, dy } of directions) {
    const pos = map[y + dy]?.[x + dx];
    if (pos && pos - 1 === map[y][x]) {
      positions.push({ x: x + dx, y: y + dy });
    }
  }
  return positions;
}

function branch(map: number[][], x: number, y: number, path: string, paths: string[]) {
  const positions = getPositions(map, x, y);
  for (const pos of positions) {
    const newPath = `${path}(${pos.x},${pos.y})`;
    if (map[pos.y][pos.x] === 9) {
      paths.push(newPath);
    } else {
      branch(map, pos.x, pos.y, newPath, paths);
    }
  }
}

function getTrailheadRating(map: number[][], x: number, y: number) {
  const paths: string[] = [];
  branch(map, x, y, '', paths);
  const uniquePaths = new Set(paths);
  const score = uniquePaths.size;
  return score;
}


function main() {
  const input = readInput("10");
  const map = input.split("\n").map(line => line.trim().split("").map(Number));
  const trailheads: { x: number, y: number }[] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        trailheads.push({ x: j, y: i });
      }
    }
  }
  const scores = trailheads.map(th => getTrailheadRating(map, th.x, th.y));
  console.log(scores);
  console.log(scores.reduce((a, b) => a + b, 0));
}

main();