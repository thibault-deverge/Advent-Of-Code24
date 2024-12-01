export type InputPair = {
	first: number;
	second: number;
};

/**
 * PART 1 !!!
 * Parses a line of text into an InputPair object.
 *
 * The line should contain two numbers separated by three spaces.
 * If the line does not contain exactly two parts or if either part is not a valid number,
 * an error will be thrown.
 *
 * @param line - The line of text to parse.
 * @returns An object containing the two parsed numbers as `first` and `second`.
 * @throws Will throw an error if the line is invalid or if either part is not a number.
 */
export function parseLine(line: string): InputPair {
	const parts = line.trim().split(/\s{3}/);

	if (parts.length !== 2) {
		throw new Error(`Invalid line: ${line}`);
	}

	const first = Number(parts[0]);
	const second = Number(parts[1]);

	if (isNaN(first) || isNaN(second)) {
		throw new Error(`Invalid line: ${line}`);
	}

	return { first, second };
}
