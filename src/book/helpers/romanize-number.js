"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToRoman = convertToRoman;
const numeralCodes = [
    ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // Ones
    ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // Tens
    ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
];
//TODO: обернуть всё тестами
function convertToRoman(number) {
    let numeral = '';
    const digits = [...number.toString()].reverse();
    for (const [index, digit] of digits.entries()) {
        // @ts-ignore - digit is a string
        numeral = numeralCodes[index][Number.parseInt(digit)] + numeral;
    }
    return numeral;
}
//# sourceMappingURL=romanize-number.js.map