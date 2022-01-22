/**
 * Test the gerneral utility functions
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import { Expect, Test, TestFixture } from 'alsatian';
import * as Utils from '../src/Utils';

@TestFixture('Utils Functions')
export class FixtureUtils {
    @Test('should not match if string to number')
    public testFailStrToNum() {
        const results = Utils.CheckTypesMatch('hello', 42);
        Expect(results).toBe(false);
    }

    @Test('should match if both are arrays')
    public testPassArrToArr() {
        const x = [1,2,3];
        const y = ["a", "b", "c"];
        const results = Utils.CheckTypesMatch(x,y);
        Expect(results).toBe(true);
    }
    
    @Test('should not match if one is an array and the other is an object')
    public testFailArrToObj() {
        const x = [1,2,3];
        const y = {"a":1, "b":2, "c":3};
        const results = Utils.CheckTypesMatch(x,y);
        Expect(results).toBe(false);
    }
}