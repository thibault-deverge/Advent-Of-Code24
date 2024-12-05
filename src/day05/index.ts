import { promises as fs } from "fs";

/* ***** MAIN ***** */
(async function main() {
	const input = (await fs.readFile("src/day05/data/test.txt", "utf-8")).split("\n");

	console.log(input);
})();
