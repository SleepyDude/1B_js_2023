function Result({number, success, message}) {
    this.number = number;
    this.success = success;
    this.message = message;
}

const MULTCUTSIZE = 7;
const SUMCUTSIZE = 14;

/**
 * Разрезает строку на чанки начиная с конца.
 * Возвращает массив строк.
 * @param {string} str 
 * @param {number} cutsize 
 * @returns {Array}
 */
function cutString(str, cutsize) {
    let res = [];
    let begin = str.length;
    while (begin) {
        let end = begin;
        begin = (begin > cutsize) ? begin - cutsize : 0;
        res.push( str.slice(begin, end) );
    }
    return res;
}

/**
 * check if a >= b as number. a and b are positive
 * @param {string} a 
 * @param {string} b 
 */
function ge(a, b) {
    if (a.length > b.length) return true;
    if (a.length < b.length) return false;

    let aParts = cutString(a, 14);
    let bParts = cutString(b, 14);
    for (let i = aParts.length - 1; i >= 0; i--) {
        if (+aParts[i] > +bParts[i]) return true;
        if (+aParts[i] < +bParts[i]) return false;
    }
    return true;
}

/**
 * a and b >= 0
 * @param {string} a 
 * @param {string} b 
 * @param {boolean} sub 
 * @returns 
 */
function sumBig(a, b) {
    let aChunks = cutString(a, SUMCUTSIZE).map( x => +x );
    let bChunks = cutString(b, SUMCUTSIZE).map( x => +x );
    // console.log(aPieces);
    // console.log(bPieces);
    let resarr = [];
    let overflow = 0;
    let i = 0;
    while (i < aChunks.length && i < bChunks.length) {
        let aNum = aChunks[i];
        let bNum = bChunks[i];
        let sum = aNum + bNum + overflow;

        overflow = Math.floor(sum / 10**SUMCUTSIZE);
        sum = sum % 10**SUMCUTSIZE;

        let zeroesNeed = SUMCUTSIZE - ('' + sum).length;
        sum = '0'.repeat(zeroesNeed) + sum;

        resarr.push(sum);
        i++;
    }

    let rest = [];
    if (i < aChunks.length) rest = aChunks;
    if (i < bChunks.length) rest = bChunks;

    while (i < rest.length) {
        let sum = rest[i] + overflow;

        overflow = Math.floor(sum / 10**SUMCUTSIZE);
        sum = sum % 10**SUMCUTSIZE;

        resarr.push(sum);
        i++;
    }
    if (overflow) resarr.push(overflow);

    resarr[resarr.length - 1] = +resarr[resarr.length - 1]; // erase beginning zeroes

    let result = resarr.reduceRight( (res, num) => {
        return res + num;
    }, '');

    return result
}

function eraseLeadingZeroes(chunksArray) {
    for (let i = chunksArray.length - 1; i >= 0; i--) {
        if (chunksArray.length === 1) break;
        if (+chunksArray[i] === 0) {
            chunksArray.pop();
        } else {
            break;
        }
    }
    chunksArray[chunksArray.length - 1] = 
        +chunksArray[chunksArray.length - 1];
}


/**
 * a >= b
 * @param {string} a 
 * @param {string} b 
 * @param {boolean} sub 
 * @returns 
 */
function subBig(a, b) {
    let aChunks = cutString(a, SUMCUTSIZE).map( x => +x );
    let bChunks = cutString(b, SUMCUTSIZE).map( x => +x );
    // console.log(aPieces);
    // console.log(bPieces);
    let resarr = [];
    let debt = 0;
    let i = 0;
    while (i < aChunks.length && i < bChunks.length) {
        let aNum = aChunks[i];
        let bNum = bChunks[i];
        let sub = aNum - bNum - debt;
        if (sub < 0) {
            sub = 10**SUMCUTSIZE + sub;
            debt = 1;
        }

        let zeroesNeed = SUMCUTSIZE - ('' + sub).length;
        sub = '0'.repeat(zeroesNeed) + sub;
        resarr.push(sub);
        i++;
    }

    while (i < aChunks.length) {
        let sub = aChunks[i] - debt;
        if (sub < 0) {
            sub = 10**SUMCUTSIZE + sub;
            debt = 1;
        }
        let zeroesNeed = SUMCUTSIZE - ('' + sub).length;
        sub = '0'.repeat(zeroesNeed) + sub;
        resarr.push(sub);
        i++;
    }

    eraseLeadingZeroes(resarr);

    let result = resarr.reduceRight( (res, num) => {
        return res + num;
    }, '');

    return result
}

/**
 * Сегмент - часть числа. Любое целое число представимо в виде суммы сегментов.
 */
class Segment {
    constructor(num, pos = 0) {
        this.num = num;
        this.pos = pos;
    }
    toString = function() {
        return '' + this.num + '0'.repeat(this.pos);
    }
    mul(segment) {
        return new Segment(this.num * segment.num, this.pos + segment.pos);
    }
}

function multChunksArrays(aChunks, bChunks) {
    // console.log(`mult chunks ${aChunks} and ${bChunks}`);
    let result = [];

    for (let ai = 0; ai < aChunks.length; ai++) {
        for (let bi = 0; bi < bChunks.length; bi++) {
            let segA = new Segment(aChunks[ai], MULTCUTSIZE * ai);
            let segB = new Segment(bChunks[bi], MULTCUTSIZE * bi);
            let segMul = segA.mul(segB);
            // console.log(`mult two segments: ${segA} and ${segB}. Result = ${segMul}`);
            result.push(segMul.toString());
        }
    }
    return result;
}

/**
 * Multiply two big POSITIVE numbers
 * @param {string} a 
 * @param {string} b 
 * @returns 
 */
function multBig(a, b) {
    // console.log(`multiply ${a} and ${b}`)
    let aChunks = cutString(a, MULTCUTSIZE).map( x => +x );
    let bChunks = cutString(b, MULTCUTSIZE).map( x => +x );

    let bignums = multChunksArrays(aChunks, bChunks);
    
    let result = bignums.reduce( (total, num) => {
        return sumBig(total, num);
    }, '0');

    return result;
}

/**
 * Метод только если remain и b - сравнимые большие числа, то есть
 * результатом деления является целое число от 1 до 9.
 * @param {string} remain 
 * @param {string} b 
 */
function divSimple(remain, b) {
    let cycle = 0;
    while ( ge(remain, b) ) {
        remain = subBig(remain, b);
        cycle += 1;
    }
    return [cycle, remain]; // remain < b && remain >= 0
}

/**
 * Результат деления в виде целого числа округленного в меньшую сторону
 * @param {string} a 
 * @param {string} b 
 */
function divBig(a, b) {
    if ( !ge(a, b) ) return 0;

    let result = '';
    let remain = '';
    let pos = 0;

    while(pos < a.length) {
        remain += a[pos];
        // console.log(`remain extend ${remain}`);
        if ( ge(remain, b) ) {
            // console.log(`remain ${remain} >= b ${b}`);
            let res;
            [res, remain] = divSimple(remain, b);
            // console.log(`simple res ${res}  remain ${remain}`);
            result += res;
        } else {
            if (result.length) result += '0';
        }
        pos++;
    }

    return result;
}

const operations = {
    '+': (a, b) => {
        if (a[0] === '-' && b[0] === '-') {
            return '-' + sumBig(a.slice(1), b.slice(1));
        }
        if (a[0] === '-') {
            return operations['-'](b, a.slice(1));
        }
        if (b[0] === '-') {
            return operations['-'](a, b.slice(1));
        }
        return sumBig(a, b);
    },
    '-': (a, b) => {
        if (a[0] === '-' && b[0] === '-') {
            return operations['-'](b.slice(1), a.slice(1));
        }
        if (a[0] === '-') {
            return '-' + sumBig(a.slice(1), b);
        }
        if (b[0] === '-') {
            return sumBig(a, b.slice(1));
        }
        if ( ge(a, b) ) {
            return subBig(a, b)
        }
        return '-' + subBig(b, a);
    },
    '*': (a, b) => {
        if (a[0] === '-' && b[0] === '-') {
            return multBig(a.slice(1), b.slice(1));
        }
        if (a[0] === '-') {
            return '-' + multBig(a.slice(1), b);
        }
        if (b[0] === '-') {
            return '-' + multBig(a, b.slice(1));
        }
        return multBig(a, b);
    },
    '/': (a, b) => {
        if (a[0] === '-' && b[0] === '-') {
            return divBig(a.slice(1), b.slice(1));
        }
        if (a[0] === '-') {
            return '-' + divBig(a.slice(1), b);
        }
        if (b[0] === '-') {
            return '-' + divBig(a, b.slice(1));
        }
        return divBig(a, b);
    }
}


/**
 * 
 * @param {string} expression 
 * @returns {string}
 */
export function execute(expression) {
    let items = expression.split(' ');
    if (items.length != 3) {
        return new Result({
            number: NaN,
            success: false,
            message: 'Wrong format'
        })
    }

    let [a, op, b] = items;

    if ( !(op in operations) ) {
        return new Result({
            number: NaN,
            success: false,
            message: `Wrong operator '${op}' Module supports '${Object.keys(operations)}'`
        })
    }

    return operations[op](a, b);
}