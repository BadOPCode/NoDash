/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import { Expect, Test, TestFixture } from "alsatian";
import Contains from "../src/Contains";

 @TestFixture("Contains Function")
export class FixtureContains {
    @Test("should match strings")
    public testPassMatchStrings() {
        const result = Contains("Hello there world.", "there");
        Expect(result).toBe(true);
    }

    @Test("should fail strings does not match")
    public testFailStringsDontMatch() {
        const result = Contains("hello world", "fox");
        Expect(result).toBe(false);
    }

    @Test("should fail if types do not match")
    public testFailDifferentTypes() {
        const x = [1, 2, 3];
        const y = { a: 1, b: 2, c: 3 };
        const result = Contains(x, y);
        Expect(result).toBe(false);
    }

    @Test("should pass if array elements are found")
    public testPassArrayFound() {
        const x = [1, 2, 3];
        const y = [2];
        const result = Contains(x, y);
        Expect(result).toBe(true);
    }

    @Test("should pass if object properties are found")
    public testPassObjectFound() {
        const x = { a: 1, b: 2, c: 3 };
        const y = { b: 2 };
        const result = Contains(x, y);
        Expect(result).toBe(true);
    }

    @Test("should pass with large embedded object types")
    public testPassComplexFound() {
        const x = {
            a: 1,
            b: {
                c: 2,
                d: [
                    {
                        e: 3,
                    },
                ],
                f: "hello world",
            },
        };
        const y = {
            b: {
                d: [
                    {
                        e: 3,
                    },
                ],
                f: "hello",
            },
        };
        const result = Contains(x, y);
        Expect(result).toBe(true);
    }

    @Test("it should fail if complex doesn't match")
    public testFailComplexNotFound() {
        const x = {
            a: 1,
            b: {
                c: 2,
                d: [
                    {
                        e: 3,
                    },
                ],
                f: "hello world",
            },
        };
        const y = {
            b: {
                d: [
                    {
                        z: 42,
                    },
                ],
            },
        };
        const result = Contains(x, y);
        Expect(result).toBe(false);
    }

    @Test("it should pass if two values are null")
    public testPassNull() {
        const x = {
            a: 1,
            b: {
                c: 2,
                d: [
                    {
                        e: 3,
                        g: null,
                    },
                ],
                f: "hello world",
            },
        };
        const y = {
            b: {
                d: [
                    {
                        g: null,
                    },
                ],
            },
        };

        const result = Contains(x, y);
        Expect(result).toBe(true);
    }

    @Test("it should fail quickly if more elements are in compare array")
    public testFailQuickArray() {
        const x = [1, 2, 3];
        const y = [1, 2, 3, 4];
        const result = Contains(x, y);
        Expect(result).toBe(false);
    }

    @Test("it should fail quickly if a property is not found in object")
    public testFailQuickObject() {
        const x = { a: 1, b: 2, c: 3 };
        const y = { z: 42, b: 2, c: 3 };
        const result = Contains(x, y);
        Expect(result).toBe(false);
    }
}
