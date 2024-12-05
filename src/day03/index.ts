import { promises as fs } from "fs";

const REG_INSTRUCTION = /mul\((\d{1,3}),(\d{1,3})\)/g;
const REG_DONT = /don't\(\)/g;
const REG_DO = /do\(\)/g;

function processPart1(fileContent: string): number {
	const regMatches = fileContent.matchAll(REG_INSTRUCTION);
	let result = 0;

	for (const match of regMatches) {
		result += Number(match[1]) * Number(match[2]);
	}
	return result;
}

function processPart2(fileContent: string): number {
	const regMatchesMul = fileContent.matchAll(REG_INSTRUCTION);
	const regMatchesDisable = fileContent.matchAll(REG_DONT);
	const regMatchesEnable = fileContent.matchAll(REG_DO);
	const instructionMatches = [];
	let enable = true;
	let result = 0;

	// Populate the instructionMatches array with all the matches
	for (const matchDisable of regMatchesDisable) {
		instructionMatches.push({ type: "disable", index: matchDisable.index });
	}
	for (const matchEnable of regMatchesEnable) {
		instructionMatches.push({ type: "enable", index: matchEnable.index });
	}
	for (const matchMul of regMatchesMul) {
		instructionMatches.push({
			type: "mul",
			index: matchMul.index,
			value1: matchMul[1],
			value2: matchMul[2],
		});
	}

	// Sort the instructionMatches array by index
	instructionMatches.sort((a, b) => a.index - b.index);

	// Iterate over the instructionMatches array and apply the instructions if enable is true
	for (const match of instructionMatches) {
		if (match.type === "mul") {
			enable && (result += Number(match.value1) * Number(match.value2));
		} else if (match.type === "disable") {
			enable = false;
		} else if (match.type === "enable") {
			enable = true;
		}
	}

	return result;
}

(async function main() {
	const fileContent: string = await fs.readFile("./src/day03/data/input.txt", "utf-8");

	console.log(processPart1(fileContent));
	console.log(processPart2(fileContent));
})();
