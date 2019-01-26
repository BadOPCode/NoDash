/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";


const ABREVIATED_MONTHS: string[] = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec" ];
const FULL_MONTHS: string[] = [ "January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "November", "December" ]
const ABREVIATED_DOW: string[] = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
const FULL_DOW: string[] = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];


/*
 * This function is useful for finding time from the begining of the year.
 */
const getStartOfYear = (fromDate: Date): Date  => {
    const startDate: Date = new Date(fromDate.getTime());

    startDate.setMonth(0);
    startDate.setDate(1);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    return startDate;
} 

const convert24to12 = (hour: number): number => {
    return ((hour > 12) || (hour == 0)) ? Math.abs(hour-12) : hour
}

const ordinalSuffix = (num: number): string => {
    const secondDigit = ("" + num).slice(-2, -1);

    if (secondDigit === "1")
        return "th";

    const firstDigit = ("" + num).slice(-1);
    switch(firstDigit) {
        case "1":
            return "st";
        case "2":
            return "nd";
        case "3":
            return "rd";
        default:
            return "th";
    }
}

const fetchFormatOptions = (specifiedDate: Date):{[key:string]:string} => {
    const StartOfYear = getStartOfYear(specifiedDate);
    const DayOfYear = Math.ceil((specifiedDate.getTime() - StartOfYear.getTime()) / 86400000); //24 hours in milliseconds 
    const WeekOfYear = Math.ceil(DayOfYear / 7);

    return { 
        // format tries to adhere to ISO 8601 mixed with IBM date/time format
        // using CAPS as date related and lower case time related.
        // search for largest pattern to smallest. Important to use this order as the 
        // pattern search and replace uses this order.
        "YYYY": "" + specifiedDate.getFullYear(), // year four digit
        "YY": specifiedDate.getFullYear().toString().slice(2,4),
        "MMMM": FULL_MONTHS[specifiedDate.getMonth()], //full month name
        "MMM": ABREVIATED_MONTHS[specifiedDate.getMonth()], //abreviated month Jan, Feb, etc.
        "MM": ("00" + specifiedDate.getMonth()+1).slice(-2), // two digit (pad with 0)
        "M": "" + specifiedDate.getMonth()+1, // month 1-12
        "Q": "" + Math.ceil((specifiedDate.getMonth()+1) / 3), // return quarter
        "DDDD": FULL_DOW[specifiedDate.getDay()], // full day of the week
        "DDD": ABREVIATED_DOW[specifiedDate.getDay()], // three letter day of the week
        "DD": ("00" + specifiedDate.getDate()).slice(-2), // left padded day of the month
        "DOY": "" + DayOfYear, // the day of the year. 1 = jan 1st. 365 = Dec 31st (most years)
        "DS": specifiedDate.getDate() + ordinalSuffix(specifiedDate.getDate()), // the day with ordinal suffix 1st, 2nd, 5th etc
        "D": "" + specifiedDate.getDate(), // day of the month
        "WW": ("00" + WeekOfYear).slice(-2),  // padded jan 1 is week 1; dec 31 is week 52
        "W": "" + WeekOfYear, // not padded
        "hh+": ("00" + convert24to12(specifiedDate.getHours())).slice(-2), //padded 12 hour  format 
        "hh": ("00" + specifiedDate.getHours()).slice(-2), //padded 24 hour  format
        "h+": "" + convert24to12(specifiedDate.getHours()), // 12 hour format
        "h": "" + specifiedDate.getHours(), // 24 hour format
        "mm": ("00" + specifiedDate.getMinutes()).slice(-2), // padded minutes
        "m": "" + specifiedDate.getMinutes(), // minutes
        "ss": ("00" + specifiedDate.getSeconds()).slice(-2), // padded seconds
        "s": "" + specifiedDate.getSeconds(), // seconds
        "A" : specifiedDate.getHours() >= 12 ? "PM" : "AM", //upper meridiem
        "a" : specifiedDate.getHours() >= 12 ? "pm" : "am",  //lower meridiem
        "lll": ("000" + specifiedDate.getMilliseconds()).slice(-3), // padded milliseconds
        "l": "" + specifiedDate.getMilliseconds(), // milliseconds
    }
}

/**
 * This function returns the date in the format specified.
 * @param specifiedDate 
 * @param format 
 */
export const DateFormat = (specifiedDate: Date, format: string): string  => {
    const formatOptions: {[key:string]:string} = fetchFormatOptions(specifiedDate);
  
    let retStr = format;
    // pareses format string and replaces it with time information.
    for(var optType in formatOptions) {
        while (format.indexOf(optType) > -1) {
            const foundPos = format.indexOf(optType);
            if (format.charAt(foundPos-1) === "_") { //it's a literal
                retStr = retStr.slice(0, foundPos-1) +
                    retStr.slice(foundPos);
                //erase the literal
                format = format.slice(0, foundPos-1) + " " +
                    format.slice(foundPos + 1);
            } else {
                const valueStr = formatOptions[optType];
                retStr = retStr.slice(0, foundPos) +
                        valueStr +
                        retStr.slice(foundPos + optType.length);

                // erase find and adjust format to return strings new string
                // This prevents finding matches in already replaced.
                format = format.slice(0, foundPos) +
                        Array(valueStr.length+1).join(" ") +
                        format.slice(foundPos + optType.length);
            }
        }
    }

    return retStr;
  }

  export default DateFormat;