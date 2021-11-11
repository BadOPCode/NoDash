/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
'use strict';

import { Merge } from './Merge';

const ABREVIATED_MONTHS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];
const FULL_MONTHS: string[] = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'November', 'December'];
const ABREVIATED_DOW: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const FULL_DOW: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/*
 * This function is useful for finding time from the begining of the year.
 */
const getStartOfYear = (fromDate: Date): Date => {
    const startDate: Date = new Date(fromDate.getTime());

    startDate.setMonth(0);
    startDate.setDate(1);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    return startDate;
};

const convert24to12 = (hour: number): number => {
    return ((hour > 12) || (hour === 0)) ? Math.abs(hour - 12) : hour;
};

const ordinalSuffix = (num: number): string => {
    const secondDigit = ('' + num).slice(-2, -1);

    if (secondDigit === '1') {
        return 'th';
    }

    const firstDigit = ('' + num).slice(-1);
    switch (firstDigit) {
    case '1':
        return 'st';
    case '2':
        return 'nd';
    case '3':
        return 'rd';
    default:
        return 'th';
    }
};

const fetchDateFormatTokens = (specifiedDate: Date): {[key: string]: string} => {
    const StartOfYear = getStartOfYear(specifiedDate);
    // 24 hours in milliseconds
    const DayOfYear = Math.ceil((specifiedDate.getTime() - StartOfYear.getTime()) / 86400000);
    const WeekOfYear = Math.ceil(DayOfYear / 7);

    return {
        // tslint:disable:object-literal-sort-keys
        // *** Must be in exact order that keeps search/replace from conflicting
        YYYY: '' + specifiedDate.getFullYear(), // year four digit
        YY: specifiedDate.getFullYear().toString().slice(2, 4),
        MMMM: FULL_MONTHS[specifiedDate.getMonth()], // full month name
        MMM: ABREVIATED_MONTHS[specifiedDate.getMonth()], // abreviated month Jan, Feb, etc.
        MM: ('00' + (specifiedDate.getMonth() + 1)).slice(-2), // two digit (pad with 0)
        M: '' + (specifiedDate.getMonth() + 1), // month 1-12
        Q: '' + Math.ceil((specifiedDate.getMonth() + 1) / 3), // return quarter
        DDDD: FULL_DOW[specifiedDate.getDay()], // full day of the week
        DDD: ABREVIATED_DOW[specifiedDate.getDay()], // three letter day of the week
        DD: ('00' + specifiedDate.getDate()).slice(-2), // left padded day of the month
        DOY: '' + DayOfYear, // the day of the year. 1 = jan 1st. 365 = Dec 31st (most years)
        // the day with ordinal suffix 1st, 2nd, 5th etc
        DS: specifiedDate.getDate() + ordinalSuffix(specifiedDate.getDate()),
        D: '' + specifiedDate.getDate(), // day of the month
        WW: ('00' + WeekOfYear).slice(-2), // padded jan 1 is week 1; dec 31 is week 52
        W: '' + WeekOfYear // not padded
        // tslint:enable:object-literal-sort-keys
    };
};

const fetchTimeFormatTokens = (specifiedDate: Date): {[key: string]: string} => {
    return {
        // tslint:disable:object-literal-sort-keys
        // *** Must be in exact order that keeps search/replace from conflicting
        'hh+': ('00' + convert24to12(specifiedDate.getHours())).slice(-2), // padded 12 hour  format
        hh: ('00' + specifiedDate.getHours()).slice(-2), // padded 24 hour  format
        'h+': '' + convert24to12(specifiedDate.getHours()), // 12 hour format
        h: '' + specifiedDate.getHours(), // 24 hour format
        mm: ('00' + specifiedDate.getMinutes()).slice(-2), // padded minutes
        m: '' + specifiedDate.getMinutes(), // minutes
        ss: ('00' + specifiedDate.getSeconds()).slice(-2), // padded seconds
        s: '' + specifiedDate.getSeconds(), // seconds
        A: specifiedDate.getHours() >= 12 ? 'PM' : 'AM', // upper meridiem
        a: specifiedDate.getHours() >= 12 ? 'pm' : 'am', // lower meridiem
        lll: ('000' + specifiedDate.getMilliseconds()).slice(-3), // padded milliseconds
        l: '' + specifiedDate.getMilliseconds() // milliseconds
        // tslint:enable:object-literal-sort-keys
    };
};

const replaceFormatTokens = (
    retStr: string,
    format: string,
    token: string,
    formatTokens: any
): {retStr: string, format: string} => {
    while (format.indexOf(token) > -1) {
        const foundPos = format.indexOf(token);
        if (format.charAt(foundPos - 1) === '_') { // it's a literal
            retStr = retStr.slice(0, foundPos - 1) +
                retStr.slice(foundPos);
            // erase the literal
            format = format.slice(0, foundPos - 1) + ' ' +
                format.slice(foundPos + 1);
        } else {
            const valueStr = formatTokens[token];
            retStr = retStr.slice(0, foundPos) +
                    valueStr +
                    retStr.slice(foundPos + token.length);

            // erase find and adjust format to return strings new string
            // This prevents finding matches in already replaced.
            format = format.slice(0, foundPos) +
                    Array(valueStr.length + 1).join(' ') +
                    format.slice(foundPos + token.length);
        }
    }

    return {
        format,
        retStr
    };
};

/**
 * This function returns the date in the format specified.
 * @param specifiedDate
 * @param format
 */
export const DateFormat = (specifiedDate: Date, format: string): string => {
    const formatTokens: {[key: string]: string} = Merge(
        fetchDateFormatTokens(specifiedDate),
        fetchTimeFormatTokens(specifiedDate)
    );

    let retStr = format;
    // pareses format string and replaces it with time information.

    // tslint:disable:forin
    // the condition is in the subroutine that is outside of tslint scope.
    for (const token in formatTokens) {
        const results = replaceFormatTokens(retStr, format, token, formatTokens);
        retStr = results.retStr;
        format = results.format;
    }
    // tslint:enable:forin

    return retStr;
};

export default DateFormat;
