import { readInput } from "../utils";

type Map = string[][];

function printMap(map: Map) {
  for (const row of map) {
    console.log(row.join(""));
  }
}

function part1() {
  const input = readInput("12");
  console.log(getFencePrice(input));
}

function part2() {
  const input = readInput("12");
  console.log(getDiscountFencePrice(input));
}

function getRegions(map: Map) {
  const regions: Map[] = [];
  const visited = new Set<string>();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (!visited.has(`${x},${y}`)) {
        createRegion(map, x, y, visited, regions);
      }
    }
  }
  return regions;
}

function getDiscountFencePrice(input: string) {
  const map = input.split("\n").map((line) => line.trim().split(""));
  const regions = getRegions(map);
  let total = 0;
  for (const region of regions) {
    // printMap(region);
    const sides = getRegionSides(region);
    const area = region.reduce((acc, row) => {
      return acc + row.filter((cell) => cell !== ".").length;
    }, 0);
    // console.log("Area: ", area);
    // console.log("Sides: ", sides);
    total += area * sides;
  }
  return total;
}

function getFencePrice(input: string) {
  const map = input.split("\n").map((line) => line.trim().split(""));
  const regions = getRegions(map);
  let total = 0;
  for (const region of regions) {
    const perimeter = getRegionPerimeter(region);
    const area = region.reduce((acc, row) => {
      return acc + row.filter((cell) => cell !== ".").length;
    }, 0);
    total += area * perimeter;
  }
  return total;
}

function getRegionPerimeter(region: Map) {
  let perimeter = 0;
  for (let y = 0; y < region.length; y++) {
    for (let x = 0; x < region[y].length; x++) {
      if (region[y][x] !== ".") {
        const directions = [
          { dx: 0, dy: -1 },
          { dx: 1, dy: 0 },
          { dx: 0, dy: 1 },
          { dx: -1, dy: 0 },
        ];

        for (const { dx, dy } of directions) {
          const newY = y + dy;
          const newX = x + dx;
          if (
            newY < 0 ||
            newY >= region.length ||
            newX < 0 ||
            newX >= region[y].length ||
            region[newY][newX] === "."
          ) {
            perimeter++;
          }
        }
      }
    }
  }
  return perimeter;
}

function getRegionSides(region: Map) {
  const edges = new Map<string, string[]>();
  let sides = 0;
  for (let y = 0; y < region.length; y++) {
    for (let x = 0; x < region[y].length; x++) {
      if (region[y][x] !== ".") {
        const directions = [
          { dx: 0, dy: -1, dir: "up" },
          { dx: 1, dy: 0, dir: "right" },
          { dx: 0, dy: 1, dir: "down" },
          { dx: -1, dy: 0, dir: "left" },
        ];

        for (const { dx, dy, dir } of directions) {
          const newY = y + dy;
          const newX = x + dx;
          if (
            newY < 0 ||
            newY >= region.length ||
            newX < 0 ||
            newX >= region[y].length ||
            region[newY][newX] === "."
          ) {
            const key = `${x},${y}`;
            if (!edges.has(dir)) {
              edges.set(dir, []);
            }
            const coords = edges.get(dir) as string[];
            // If left or right, check up and down
            if (dir === "left" || dir === "right") {
              const upKey = `${x},${y - 1}`;
              const downKey = `${x},${y + 1}`;
              if (!coords.includes(upKey) && !coords.includes(downKey)) {
                sides++;
              }
            }
            // If up or down, check left and right
            else {
              const leftKey = `${x - 1},${y}`;
              const rightKey = `${x + 1},${y}`;
              if (!coords.includes(leftKey) && !coords.includes(rightKey)) {
                sides++;
              }
            }
            coords.push(key);
          }
        }
      }
    }
  }
  return sides;
}

function addToRegion(
  map: Map,
  region: Map,
  x: number,
  y: number,
  visited: Set<string>,
  regions: Map[]
) {
  visited.add(`${x},${y}`);
  region[y][x] = map[y][x];
  const positions = getPositions(map, x, y);
  for (const pos of positions) {
    if (!visited.has(`${pos.x},${pos.y}`)) {
      if (map[pos.y][pos.x] === map[y][x]) {
        addToRegion(map, region, pos.x, pos.y, visited, regions);
      }
    }
  }
}

function createRegion(
  map: Map,
  x: number,
  y: number,
  visited: Set<string>,
  regions: Map[]
) {
  // Region is a 2D array of the same size as the map with all values set to "."
  const region: Map = Array.from({ length: map.length }, () =>
    Array.from({ length: map[0].length }, () => ".")
  );
  addToRegion(map, region, x, y, visited, regions);
  regions.push(region);
}

function getPositions(map: string[][], x: number, y: number) {
  const directions = [
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
  ];
  const positions: { x: number; y: number }[] = [];
  for (const { dx, dy } of directions) {
    const pos = map[y + dy]?.[x + dx];
    if (pos) {
      positions.push({ x: x + dx, y: y + dy });
    }
  }
  return positions;
}

part2();
