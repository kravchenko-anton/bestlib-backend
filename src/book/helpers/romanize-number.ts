const numeralCodes = [
	['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // Ones
	['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // Tens
	['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
] as const
//TODO: обернуть всё тестами

export function convertToRoman(number: number) {
	let numeral = ''
	const digits = [...number.toString()].reverse()
	for (const [index, digit] of digits.entries()) {
		// @ts-ignore - digit is a string
		numeral = numeralCodes[index][Number.parseInt(digit)] + numeral
	}
	return numeral
}
