import { promises as fs } from "fs";

const DIRECTIONS = [
	{ dx: -1, dy: 0 }, // Up
	{ dx: 1, dy: 0 }, // Down
	{ dx: 0, dy: -1 }, // Left
	{ dx: 0, dy: 1 }, // Right
	{ dx: -1, dy: -1 }, // Up-Left
	{ dx: -1, dy: 1 }, // Up-Right
	{ dx: 1, dy: -1 }, // Down-Left
	{ dx: 1, dy: 1 }, // Down-Right
];

function processPart1(input: string[]): number {
	const numRows = input.length;
	const numCols = input[0].length;
	let count = 0;

	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j < numCols; j++) {
			const element: string = input[i][j];

			if (element === "X") {
				for (const { dx, dy } of DIRECTIONS) {
					const sequence: string[] = [element];

					for (let k = 1; k <= 3; k++) {
						const newRow = i + dx * k;
						const newCol = j + dy * k;
						sequence.push(input[newRow]?.[newCol]);
					}

					if (sequence.join("") === "XMAS") {
						count++;
					}
				}
			}
		}
	}

	return count;
}

(async function main() {
	const input = (await fs.readFile("src/day04/data/input.txt", "utf-8")).split("\n");

	console.log(processPart1(input));
})();
