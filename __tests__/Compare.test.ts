/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import { Expect, Test, TestFixture } from "alsatian";
import Compare from "../src/Compare";

@TestFixture("Compare Function")
export class FixtureCompare {
    @Test("Fail if types are different.")
    public testFailDifferent() {
        const result = Compare("123", 123);
        Expect(result).toBe(false);
    }

    @Test("Pass if two strings are the same.")
    public testPassStrings() {
        const results = Compare("test", "test");
        Expect(results).toBe(true);
    }

    @Test("Fail if two strings are different.")
    public testFailStrings() {
        const results = Compare("test", "abc123");
        Expect(results).toBe(false);
    }

    @Test("Pass if two numbers are the same.")
    public testPassNumbers() {
        const results = Compare(123, 123);
        Expect(results).toBe(true);
    }

    @Test("Fail if two numbers are different.")
    public testFailNumbers() {
        const results = Compare(123, 456);
        Expect(results).toBe(false);
    }

    @Test("Pass if booleans match.")
    public testPassBooleans() {
        const results = Compare(true, true);
        Expect(results).toBe(true);
    }

    @Test("Fail if booleans don't match.")
    public testFailBooleans() {
        const results = Compare(true, false);
        Expect(results).toBe(false);
    }

    @Test("Pass if tupples matches.")
    public testPassArrays() {
        const leftArray = [
            1,
            2,
            3,
            "a",
            "b",
            "c",
        ];
        const rightArray = [
            1,
            2,
            3,
            "a",
            "b",
            "c",
        ];
        const results = Compare(leftArray, rightArray);
        Expect(results).toBe(true);
    }

    @Test("Fail if tupples do not match lengths.")
    public testFailArraysLength() {
        const leftArray = [
            1,
            2,
            3,
        ];
        const rightArray = [
            1,
            2,
            3,
            4,
        ];
        const results = Compare(leftArray, rightArray);
        Expect(results).toBe(false);
    }

    @Test("Fail if array is not in the same order.")
    public testFailArraysOrder() {
        const leftArray = [
            1,
            2,
            3,
        ];
        const rightArray = [
            3,
            2,
            1,
        ];
        const results = Compare(leftArray, rightArray);
        Expect(results).toBe(false);
    }

    @Test("Pass if array order is different but arrayOrderDoesNotMatter is set to true.")
    public testPassArrayOrderOpts() {
        const leftArray = [
            1,
            2,
            3,
        ];
        const rightArray = [
            3,
            2,
            1,
        ];
        const results = Compare(leftArray, rightArray, { arrayOrderDoesNotMatter: true });
        Expect(results).toBe(true);
    }

    @Test("Pass if objects are identical.")
    public testPassObjects() {
        const leftObj = {
            a: 1,
            b: 2,
            c: "hello",
        };
        const rightObj = {
            a: 1,
            b: 2,
            c: "hello",
        };
        const results = Compare(leftObj, rightObj);
        Expect(results).toBe(true);
    }

    @Test("Fail if one object has extra parameter.")
    public testFailObjectsExtraParameter() {
        const leftObj = {
            a: 1,
            b: 2,
            c: "hello",
        };
        const rightObj = {
            a: 1,
            b: 2,
            c: "hello",
            d: "world",
        };
        const results = Compare(leftObj, rightObj);
        Expect(results).toBe(false);
    }

    @Test("Fail if a property is a different value.")
    public testFailObjectDiffValue() {
        const leftObj = {
            a: 3,
            b: 2,
            c: "hello",
        };
        const rightObj = {
            a: 1,
            b: 2,
            c: "hello",
        };
        const results = Compare(leftObj, rightObj);
        Expect(results).toBe(false);
    }

    @Test("Pass if complex structure matches.")
    public testPassComplexMatches() {
        const leftObj = {
            a: [
                1,
                2,
                "hello",
            ],
            c: "world",
        };
        const rightObj = {
            a: [
                1,
                2,
                "hello",
            ],
            c: "world",
        };
        let results = Compare(leftObj, rightObj);
        Expect(results).toBe(true);

        const leftArray = [
            {
                a: 1,
                b: 2,
                c: "hello",
            },
            "world",
        ];
        const rightArray = [
            {
                a: 1,
                b: 2,
                c: "hello",
            },
            "world",
        ];
        results = Compare(leftArray, rightArray);
        Expect(results).toBe(true);
    }

    @Test("Fail if a complex structure doesn't match.")
    public testFailComplexDiff() {
        const leftObj = {
            a: [
                1,
                2,
                "blah",
            ],
            c: "world",
        };
        const rightObj = {
            a: [
                1,
                2,
                "hello",
            ],
            c: "world",
        };
        let results = Compare(leftObj, rightObj);
        Expect(results).toBe(false);

        const leftArray = [
            {
                a: 1,
                b: 2,
                c: "hello",
            },
            "world",
        ];
        const rightArray = [
            {
                a: 1,
                b: 2,
                c: "blah",
            },
            "world",
        ];
        results = Compare(leftArray, rightArray);
        Expect(results).toBe(false);
    }

    @Test("it should pass when comparing two nulls")
    public testPassNull() {
        const results = Compare(null, null);
        Expect(results).toBe(true);
    }
}
