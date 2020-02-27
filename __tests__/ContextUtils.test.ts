/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import { Expect, Test, TestFixture } from "alsatian";
import * as utils from "../src/ContextUtils";

@TestFixture("ContextUtils Module")
export class FixtureContextUtils {
    @Test("getNextContext should return value with blank context.")
    public testSimpleContext() {
        Expect(utils.getNextContext("test")).toEqual({ propertyName: "test", nextContext: ""});
    }

    @Test("getNextContext should return property name and next context.")
    public testNormalContext() {
        Expect(utils.getNextContext("testA.testB")).toEqual({ propertyName: "testA", nextContext: "testB"});
    }

    @Test("getNextContext should return property name and the rest of the context.")
    public testLongContext() {
        Expect(utils.getNextContext("testA.testB.testC")).toEqual({ propertyName: "testA", nextContext: "testB.testC"});
    }

    @Test("getNextContext should return blank if currentContext is blank or undefined.")
    public testBlankContext() {
        Expect(utils.getNextContext("")).toEqual({ propertyName: "", nextContext: ""});
    }
}
