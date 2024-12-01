import { promises as fs } from "fs";
import { parseLine, InputPair } from "./helpers/parser";

function findDifference(firstInput: number[], secondInput: number[]): number {
	const differences: number[] = [];

	for (let i = 0; i < firstInput.length; i++) {
		differences.push(Math.abs(firstInput[i] - secondInput[i]));
	}
	return differences.reduce((acc, curr) => acc + curr, 0);
}

(async function main() {
	try {
		const fileContent = await fs.readFile("./src/day01/data/input.txt", "utf-8");
		const lines = fileContent.split("\n");
		const pairs: InputPair[] = lines.map(parseLine);

		const firstInputSorted = pairs.map((pair) => pair.first).sort((a, b) => a - b);
		const secondInputSorted = pairs.map((pair) => pair.second).sort((a, b) => a - b);

		const result = findDifference(firstInputSorted, secondInputSorted);
		console.log(result);
	} catch (error) {
		console.error("Error reading file:", error);
	}
})();
