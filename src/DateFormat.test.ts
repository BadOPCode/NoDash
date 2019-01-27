/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import { Expect, Test, TestFixture } from "alsatian";
import DateFormat from "./DateFormat";

@TestFixture("DateFormat Function")
export class FixtureDateFormat {
    testDate = new Date("Jan 2 2003 16:35:46:57");

    @Test("It should return a formal date.")
    public testFormalDate() {
        Expect(DateFormat(this.testDate, "MMMM DS, YYYY")).toBe("January 2nd, 2003");
    }

    @Test("It should return a standard US slash format.")
    public testUsSlashDate() {
        Expect(DateFormat(this.testDate, "MM/DD/YY")).toBe("01/02/03");
    }

    @Test("It should return accounting compressed format.")
    public testAccountingCompressed() {
        Expect(DateFormat(this.testDate, "DDMMMYY")).toBe("02Jan03");
    }

    @Test("It should return eastern popular date format.")
    public testEastDate() {
        Expect(DateFormat(this.testDate, "YYYY-MM-DD")).toBe("2003-01-02");
    }

    @Test("It should return traditional German format.")
    public testGermanDate() {
        Expect(DateFormat(this.testDate, "DD.MM.YYYY")).toBe("02.01.2003")
    }

    @Test("It should return a quarterly format.")
    public testQuarterlyDate() {
        Expect(DateFormat(this.testDate, "Q_QYYYY")).toBe("1Q2003");
    }

    @Test("It should return a week of the year format")
    public testWeekYearDate() {
        Expect(DateFormat(this.testDate, "WW _WK YYYY")).toBe("01 WK 2003");
    }

    @Test("It should return with a US standard time.")
    public testUsStandardTime() {
        Expect(DateFormat(this.testDate, "h+:mm A")).toBe("4:35 PM");
    }

    @Test("It should return with military time format.")
    public testMilitaryTime() {
        Expect(DateFormat(this.testDate, "hh:mm")).toBe("16:35");
    }

    @Test("it should contain a high percision time format.")
    public testPercisionTime() {
        Expect(DateFormat(this.testDate, "h:mm:ss.lll")).toBe("16:35:46.057");
    }

    @Test("It should generate a SQL timestamp")
    public testSqlTimestampTime() {
        Expect(DateFormat(this.testDate, "YYYY-MM-DD hh:mm:ss")).toBe("2003-01-02 16:35:46");
    }

    @Test("It should return a IBM DATETIME time stamp")
    public testIbmDateTime() {
        Expect(DateFormat(this.testDate, "DD-MMM-YYYY hh:mm")).toBe("02-Jan-2003 16:35");
    }

    @Test("It should return st as long as number is not greater than 9 and less than 20.")
    public testOrdinalSuffix() {
        this.testDate.setDate(21);
        Expect(DateFormat(this.testDate, "DS")).toBe("21st");
    }

    @Test("It should return th as long as number is greater than 9 and less than 20.")
    public testOrdinalSuffixTh() {
        this.testDate.setDate(11);
        Expect(DateFormat(this.testDate, "DS")).toBe("11th");

        this.testDate.setDate(8);
        Expect(DateFormat(this.testDate, "DS")).toBe("8th");

        this.testDate.setDate(29);
        Expect(DateFormat(this.testDate, "DS")).toBe("29th");
    }

    @Test("It should return rd suffix when the number is 3 or 23.")
    public testOrdinalSuffixRd() {
        this.testDate.setDate(3);
        Expect(DateFormat(this.testDate, "DS")).toBe("3rd");

        this.testDate.setDate(23);
        Expect(DateFormat(this.testDate, "DS")).toBe("23rd");
    }

    @Test("It should be able to format correct 12 hour times")
    public test12HourTime() {
        this.testDate.setHours(23);
        Expect(DateFormat(this.testDate, "h+A")).toBe("11PM");

        this.testDate.setHours(5);
        Expect(DateFormat(this.testDate, "h+A")).toBe("5AM");

        this.testDate.setHours(14);
        Expect(DateFormat(this.testDate, "h+a")).toBe("2pm");

        this.testDate.setHours(11);
        Expect(DateFormat(this.testDate, "h+a")).toBe("11am");
    }
}