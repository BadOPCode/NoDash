/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import { Expect, Test, TestFixture } from "alsatian";
import Merge from "./Merge";

@TestFixture("Merge Function")
export class FixtureMerge {
    @Test("It should merge two objects together.")
    public testSimpleMerge() {
        const baseObj = {
            hello: "world"
        };
        const newObj = {
            test: 42
        };
        const mergedObjects = Merge(baseObj, newObj);
        Expect(mergedObjects).toEqual({ hello: "world", test: 42 });
    }

    @Test("It should overwrite base properties with ones in new one.")
    public testOverwriteMerge() {
        const baseObj = {
            hello: "world"
        };
        const newObj = {
            hello: 42
        };
        const mergedObjects = Merge(baseObj, newObj);
        Expect(mergedObjects).toEqual({ hello: 42 });
    }

    @Test("It should merge complex objects together.")
    public testComplexMerge() {
        const baseObj = {
            hello: "world",
            common: {
                a: 1,
                b: 2,
                d: 24
            }
        };
        const newObj = {
            test: 42,
            common: {
                c: 3,
                d: "four"
            }
        };
        const mergedObjects = Merge(baseObj, newObj);
        Expect(mergedObjects).toEqual({ 
            hello: "world", 
            test: 42, 
            common: {
                a: 1,
                b: 2,
                c: 3,
                d: "four"
            } 
        });
    }

    @Test("Developers should be able to override behaviors.")
    public testOverrideBehavior() {
        let mergedArray = Merge([1,2,3], [4,5,6], {
            ArrayToArray: (originalObject: any, newObject:any) => {
                return originalObject.concat(newObject);
            }
        });
        
        Expect(mergedArray).toEqual([1,2,3,4,5,6]);
        
        mergedArray = Merge([1,2,3], 4, {
            ArrayToNumber: (originalObject: any, newObject:any) => {
                originalObject.push(newObject);
                return originalObject;
            }
        });
        Expect(mergedArray).toEqual([1,2,3,4]);
    }
}