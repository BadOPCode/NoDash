/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import { Expect, Test, TestFixture } from "alsatian";
import Merge from "../src/Merge";

@TestFixture("Merge Function")
export class FixtureMerge {
    @Test("It should return original if there is no new.")
    public testUndefinedNew() {
        Expect(Merge("a", undefined)).toBe("a");
    }

    @Test("It should always return new value if original is undefined.")
    public testUndefinedOriginal() {
        Expect(Merge(undefined, 42)).toBe(42);
    }

    @Test("It should merge two objects together.")
    public testSimpleMerge() {
        const baseObj = {
            hello: "world",
        };
        const newObj = {
            test: 42,
        };
        const mergedObjects = Merge(baseObj, newObj);
        Expect(mergedObjects).toEqual({ hello: "world", test: 42 });
    }

    @Test("It should overwrite base properties with ones in new one.")
    public testOverwriteMerge() {
        const baseObj = {
            hello: "world",
        };
        const newObj = {
            hello: 42,
        };
        const mergedObjects = Merge(baseObj, newObj);
        Expect(mergedObjects).toEqual({ hello: 42 });
    }

    @Test("It should merge complex objects together.")
    public testComplexMerge() {
        const baseObj = {
            common: {
                a: 1,
                b: 2,
                d: 24,
            },
            hello: "world",
        };
        const newObj = {
            common: {
                c: 3,
                d: "four",
            },
            test: 42,
        };
        const mergedObjects = Merge(baseObj, newObj);
        Expect(mergedObjects).toEqual({
            common: {
                a: 1,
                b: 2,
                c: 3,
                d: "four",
            },
            hello: "world",
            test: 42,
        });
    }

    @Test("Developers should be able to override behaviors.")
    public testOverrideBehavior() {
        let mergedArray = Merge([1, 2, 3], [4, 5, 6], {
            ArrayToArray: (originalObject: any, newObject: any) => {
                return originalObject.concat(newObject);
            },
        });

        Expect(mergedArray).toEqual([1, 2, 3, 4, 5, 6]);

        mergedArray = Merge([1, 2, 3], 4, {
            ArrayToNumber: (originalObject: any, newObject: any) => {
                originalObject.push(newObject);
                return originalObject;
            },
        });
        Expect(mergedArray).toEqual([1, 2, 3, 4]);
    }

    @Test("Developers should be able to make broad behavior changes")
    public testOverrideBroadBehavior() {
        const override = {
            String: (originalObject: any, newObject: any) => {
                originalObject += newObject;
                return originalObject;
            },
        };
        Expect(Merge("Easy as ", 123, override)).toBe("Easy as 123");

        const mergedObjects = Merge({
            a: "Answer to the universe is ",
            b: 23,
        }, {
            a: 42,
            c: 45,
        }, override);

        Expect(mergedObjects).toEqual({
            a: "Answer to the universe is 42",
            b: 23,
            c: 45,
        });
    }

    @Test("it should be able to merge null values")
    public testMergeNulls() {
        const mergedObjects = Merge({
            a: 1,
        }, {
            b: null,
        });
        Expect(mergedObjects).toEqual({
            a: 1,
            b: null,
        });
    }

    @Test("it should be able to convert nulls")
    public testMergeConvertNull() {
        const mergedObjects = Merge({
            a: 1,
            c: null,
        }, {
            b: null,
            c: "hi",
        }, {
            UndefinedToNull: () => {
                return 0;
            },
            NullToString: () => {
                return false;
            },
        });
        Expect(mergedObjects).toEqual({
            a: 1,
            b: 0,
            c: false,
        });
    }
}
