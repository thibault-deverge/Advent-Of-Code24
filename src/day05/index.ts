import { promises as fs } from "fs";

function processPart1(inputRules: string[], inputSequences: string[]): number {
	let count = 0;

	for (const inputSequence of inputSequences) {
		const seq = inputSequence.split(",").map(Number);
		let isValid = true;

		for (const rule of inputRules) {
			const [first, second] = rule.split("|").map(Number);

			if (seq.includes(first) && seq.includes(second)) {
				const subSeq = seq.slice(0, seq.indexOf(first));

				if (subSeq.includes(second)) {
					isValid = false;
					break;
				}
			}
		}

		isValid && (count += seq[Math.floor(seq.length / 2)]);
	}

	return count;
}

/* ***** MAIN ***** */
(async function main() {
	const input = (await fs.readFile("src/day05/data/input.txt", "utf-8")).split("\n");

	// Separate the input into two parts
	const separator = input.indexOf("");
	const inputRules = input.slice(0, separator);
	const inputSequences = input.slice(separator + 1);

	// Part1
	console.log(processPart1(inputRules, inputSequences));
})();
