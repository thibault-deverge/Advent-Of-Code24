import { promises as fs } from "fs";

/* **** Part One **** */
function isInRange(past: number, current: number, direction: number): boolean {
	if (direction === 1) {
		return current > past && current <= past + 3;
	} else {
		return current < past && current >= past - 3;
	}
}

function isReportSafePart1(levels: number[]): boolean {
	const direction = levels[0] < levels[1] ? 1 : -1;
	let pastLevel = levels[0];

	for (const level of levels.slice(1)) {
		if (!isInRange(pastLevel, level, direction)) {
			return false;
		}
		pastLevel = Number(level);
	}

	return true;
}

/* **** Part Two **** */
function isReportSafePart2(levels: number[]): boolean {
	if (isReportSafePart1(levels)) {
		return true;
	}

	for (let i = 0; i < levels.length; i++) {
		const newLevels = [...levels.slice(0, i), ...levels.slice(i + 1)];
		if (isReportSafePart1(newLevels)) {
			return true;
		}
	}

	return false;
}

/* **** Main **** */
(async function main() {
	const fileContent = await fs.readFile("./src/day02/data/input.txt", "utf-8");
	const reports = fileContent.split("\n");
	let safeReportsPart1 = 0;
	let safeReportsPart2 = 0;

	for (const report of reports) {
		const reportInt = report.split(" ").map((level) => Number(level));

		isReportSafePart1(reportInt) && safeReportsPart1++;
		isReportSafePart2(reportInt) && safeReportsPart2++;
	}

	console.log(safeReportsPart1);
	console.log(safeReportsPart2);
})();
