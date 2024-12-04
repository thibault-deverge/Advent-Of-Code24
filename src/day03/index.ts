import { promises as fs } from "fs";

const REG_INSTRUCTION = /mul\((\d{1,3}),(\d{1,3})\)/g;

function processPart1(fileContent: string): number {
	const regMatches = fileContent.matchAll(REG_INSTRUCTION);
	let result = 0;

	for (const match of regMatches) {
		result += Number(match[1]) * Number(match[2]);
	}
	return result;
}

(async function main() {
	const fileContent: string = await fs.readFile("./src/day03/data/input.txt", "utf-8");

	console.log(processPart1(fileContent));
})();

/*
--------- DAY 3 ---------
******* Part One ******* 
mul\(\d{1,3},\d{1,3}\)
- use matchAll()
*/
