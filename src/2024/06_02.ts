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

function getMapsWithObstacles(
  map: boolean[][],
  player: Player,
) {
  const maps: boolean[][][] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (!map[i][j] && (i !== player.x || j !== player.y)) {
        const newMap = JSON.parse(JSON.stringify(map));
        newMap[i][j] = true;
        maps.push(newMap);
      }
    }
  }
  return maps;
}

function isLoop(
  map: boolean[][],
  player: Player,
) {
  const visited: {
    x: number;
    y: number;
    direction: '^' | 'v' | '<' | '>';
  }[] = [];
  let isLoop = false;
  let inMap = true;
  while (inMap && !isLoop) {
    movePlayer(player, map);
    isLoop = visited.some((v) => {
      return v.x === player.x && v.y === player.y && v.direction === player.direction;
    });
    inMap = isInMap(player.x, player.y, map);
    if (inMap) {
      visited.push({
        x: player.x,
        y: player.y,
        direction: player.direction,
      });
    }
  }
  return isLoop;
}

function main() {
  const input = readInput('06');
  const { map, player } = createMapAndPlayer(input);
  const maps = getMapsWithObstacles(map, player);
  let loops = 0;
  for (let i = 0; i < maps.length; i++) {
    console.log(`Map ${i + 1} of ${maps.length}`);
    const loop = isLoop(maps[i], JSON.parse(JSON.stringify(player)));
    if (loop) {
      loops++;
    }
  }
  console.log('Maps with loops:', loops);
}

main();

