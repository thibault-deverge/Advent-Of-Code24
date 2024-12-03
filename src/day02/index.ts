import { promises as fs } from "fs";

function isInRange(past: number, current: number, direction: number): boolean {
	if (direction === 1) {
		return current > past && current <= past + 3;
	} else {
		return current < past && current >= past - 3;
	}
}

function isReportSafe(report: string): boolean {
	const levels = report.split(" ").map((level) => Number(level));
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

(async function main() {
	const fileContent = await fs.readFile("./src/day02/data/input.txt", "utf-8");
	const reports = fileContent.split("\n");
	let safeReports = 0;

	for (const report of reports) {
		isReportSafe(report) && safeReports++;
	}

	console.log(safeReports);
})();
