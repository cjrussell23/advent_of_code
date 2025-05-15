import { readInput } from "../utils";

type Player = {
  x: number;
  y: number;
  direction: '^' | 'v' | '<' | '>';
}

function createMapAndPlayer(input: string) {
  const lines = input.split('\n');
  const map: boolean[][] = [];
  const player: Player = {
    x: 0,
    y: 0,
    direction: '^',
  }
  for (let i = 0; i < lines.length; i++) {
    const row: boolean[] = [];
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === '#') {
        row.push(true);
      }
      else if (lines[i][j] === '.') {
        row.push(false);
      }
      else {
        player.x = j;
        player.y = i;
        row.push(false);
        if (lines[i][j] in ['^', 'v', '<', '>']) {
          player.direction = lines[i][j] as '^' | 'v' | '<' | '>';
        }
      }
    }
    map.push(row);
  }
  return { map, player };
}

function isInMap(x: number, y: number, map: boolean[][]) {
  if (x < 0 || x >= map.length) {
    return false;
  }
  if (y < 0 || y >= map[x].length) {
    return false;
  }
  return true;
}

function movePlayer(
  player: Player,
  map: boolean[][],
) {
  let nextX = player.x;
  let nextY = player.y;
  if (player.direction === '^') {
    nextY = player.y - 1;
  }
  else if (player.direction === 'v') {
    nextY = player.y + 1;
  }
  else if (player.direction === '<') {
    nextX = player.x - 1;
  }
  else if (player.direction === '>') {
    nextX = player.x + 1;
  }
  if (map[nextY] && map[nextY][nextX]) {
    turnRight(player);
  }
  else {
    player.x = nextX;
    player.y = nextY;
  }
}

function turnRight(
  player: Player
) {
  if (player.direction === '^') {
    player.direction = '>';
  }
  else if (player.direction === '>') {
    player.direction = 'v';
  }
  else if (player.direction === 'v') {
    player.direction = '<';
  }
  else if (player.direction === '<') {
    player.direction = '^';
  }
}

function main() {
  const input = readInput('06');
  const { map, player } = createMapAndPlayer(input);
  const visited: boolean[][] = Array(map.length).fill(false).map(() => Array(map[0]?.length || 0).fill(false));
  while (isInMap(player.x, player.y, map)) {
    movePlayer(player, map);
    visited[player.x][player.y] = true;
  }
  let count = 0;
  for (let x = 0; x < visited.length; x++) {
    for (let y = 0; y < visited[x].length; y++) {
      if (visited[x][y]) {
        count++;
      }
    }
  }
  console.log('Visited cells:', count);
}

main();

