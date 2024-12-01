import { promises as fs } from "fs";
import { parseLine, InputPair } from "./helpers/parser";

function processPart1(leftInputs: number[], rightInputs: number[]): number {
	const leftSorted = leftInputs.toSorted();
	const rightSorted = rightInputs.toSorted();
	const differences: number[] = [];

	for (let i = 0; i < leftSorted.length; i++) {
		differences.push(Math.abs(leftSorted[i] - rightSorted[i]));
	}
	return differences.reduce((acc, curr) => acc + curr, 0);
}

function processPart2(leftInputs: number[], rightInputs: number[]): number {
	let result = 0;

	for (const leftInput of leftInputs) {
		for (const rightInput of rightInputs) {
			if (leftInput === rightInput) {
				result += leftInput;
			}
		}
	}
	return result;
}

(async function main() {
	try {
		// Read the file and split it into lines
		const fileContent = await fs.readFile("./src/day01/data/input.txt", "utf-8");
		const lines = fileContent.split("\n");

		// Parse the lines into InputPair objects and separate left and right inputs
		const pairs: InputPair[] = lines.map(parseLine);
		const leftInput = pairs.map((pair) => pair.first);
		const rightInput = pairs.map((pair) => pair.second);

		// Log the results
		console.log(processPart1(leftInput, rightInput));
		console.log(processPart2(leftInput, rightInput));
	} catch (error) {
		console.error("Error reading file:", error);
	}
})();
