import {execute} from './bign.mjs';

// +
console.log('Сложение');

console.assert(execute('5 + 2') == '7', '5 + 2');
console.assert(execute('511 + 234') == 511 + 234, `511 + 234 = ${execute('511 + 234')}`);
console.assert(execute('511 + 534') == 511 + 534, `511 + 534 = ${execute('511 + 534')}`);
console.assert(execute('511 + 0') == 511 + 0, '511 + 0');
console.assert(execute('99999 + 99999') == 99999 + 99999, '99999 + 99999');
console.assert(execute('4 + 214531') == 4 + 214531, '4 + 214531');

console.assert(execute('999999999999999 + 999999999999999') == BigInt('999999999999999') + BigInt('999999999999999'));
console.assert(execute('52846218448276542 + 284626618448276165284') == BigInt('52846218448276542') + BigInt('284626618448276165284'));

console.assert(execute('-52846218448276542 + 284626618448276165284') == BigInt('-52846218448276542') + BigInt('284626618448276165284'));
console.assert(execute('52846218448276542 + -284626618448276165284') == BigInt('52846218448276542') + BigInt('-284626618448276165284'));
console.assert(execute('-52846218448276542 + -284626618448276165284') == BigInt('-52846218448276542') + BigInt('-284626618448276165284'));

// -
console.log('вычитание');

console.assert(execute('5 - 3') == 2, '5 - 3');
console.assert(execute('71 - 39') == 71 - 39, `71 - 39 ${execute("71 - 39")} vs ${71 - 39}`);
console.assert(execute('5 - 7') == -2, `5 - 7 = ${execute('5 - 7')}`);
console.assert(execute('55 - 77') == 55 - 77, '55 - 77');
console.assert(execute('753826 - 367482') == 753826 - 367482, '753826 - 367482');

console.assert(execute('5000000 - 4999999') == 5000000 - 4999999, '5000000 - 4999999');
console.assert(execute('5 - 177') == 5 - 177, '5 - 177');
console.assert(execute('5 - 1777') == 5 - 1777, '5 - 1777');
console.assert(execute('5115 - 5115') == 5115 - 5115, '5115 - 5115');
console.assert(execute('1000000000001 - 999') == 1000000000001 - 999, '1000000000001 - 999');

console.assert(execute('123 - 9999999999999999876') == BigInt('123') - BigInt('9999999999999999876'));
console.assert(execute('923 - 1999999999999999876') == BigInt('923') - BigInt('1999999999999999876'));
console.assert(execute('9999999999999999999 - 9999999999999999876') == BigInt('9999999999999999999') - BigInt('9999999999999999876'));
console.assert(execute('83983503826348392847 - 41298287498712649192836273') == BigInt('83983503826348392847') - BigInt('41298287498712649192836273'));

console.assert(execute('-83983503826348392847 - 41298287498712649192836273') == BigInt('-83983503826348392847') - BigInt('41298287498712649192836273'));
console.assert(execute('83983503826348392847 - -41298287498712649192836273') == BigInt('83983503826348392847') - BigInt('-41298287498712649192836273'));
console.assert(execute('-83983503826348392847 - -41298287498712649192836273') == BigInt('-83983503826348392847') - BigInt('-41298287498712649192836273'));

// *
console.log('Умножение')

console.assert(execute('13 * 15') == 13 * 15);
console.assert(execute('13 * 0') == '0');
console.assert(execute('999999999999 * 9999999999999') == BigInt('999999999999') * BigInt('9999999999999'));
console.assert(execute('5892146052912792812 * 4218521487528192836') == BigInt('5892146052912792812') * BigInt('4218521487528192836'));

console.assert(execute('5892146052912792812 * -4218521487528192836') == BigInt('5892146052912792812') * BigInt('-4218521487528192836'));
console.assert(execute('-5892146052912792812 * 4218521487528192836') == BigInt('-5892146052912792812') * BigInt('4218521487528192836'));
console.assert(execute('-5892146052912792812 * -4218521487528192836') == BigInt('-5892146052912792812') * BigInt('-4218521487528192836'));

// /
console.log('Целочисленное деление')

console.assert(execute('123 / 11') == BigInt('123') / BigInt('11'));
console.assert(execute('123 / 7693') == BigInt('123') / BigInt('7693'));
console.assert(execute('9999999987654321 / 1234567890') == BigInt('9999999987654321') / BigInt('1234567890'));
console.assert(execute('9999999987654321999 / 648456789087657992') == BigInt('9999999987654321999') / BigInt('648456789087657992'));

console.assert(execute('5892146052912792812 / -4218521487528192836') == BigInt('5892146052912792812') / BigInt('-4218521487528192836'));
console.assert(execute('-5892146052912792812 / 4218521487528192836') == BigInt('-5892146052912792812') / BigInt('4218521487528192836'));
console.assert(execute('-5892146052912792812 / -4218521487528192836') == BigInt('-5892146052912792812') / BigInt('-4218521487528192836'));