/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import { Expect, Test, TestFixture } from "alsatian";
import PutContext from "./PutContext";


@TestFixture("PutContext Function")
export class FixturePutContext {
    @Test("It should return with a property added to a flat object.")
    public testPutSimple() {
        const testObj = {}
        Expect(PutContext(testObj, "a", 42)).toEqual({a:42});
    }

    @Test("It should overwrite a existing property.")
    public testPutOverwrite() {
        const testObj = { a:23 };
        Expect(PutContext(testObj, "a", 42)).toEqual({a:42});
    }

    @Test("It should not bother other properties.")
    public testDoNotTouch() {
        const testObj = { a:12, b:23 };
        Expect(PutContext(testObj, "a", 42)).toEqual({a:42, b:23});
    }

    @Test("It should be able to set a property deep in a object.")
    public testPutDeep() {
        const testObj = { a: { b: { c: 23 } } };
        Expect(PutContext(testObj, "a.b.c", 42)).toEqual({a:{b:{c:42}}});
    }

    @Test("It should place a object deep withing another object.")
    public testPutObjectDeep() {
        const testObj = { a: { b: { c: 23 } } };
        Expect(PutContext(testObj, "a.b.c", {d:{e:42}})).toEqual({a:{b:{c:{d:{e:42}}}}});
    }

    @Test("It should make the path if it doesn't exist.")
    public testMakePath() {
        const testObj = { d:23 };
        Expect(PutContext(testObj, "a.b.c", 42)).toEqual({a:{b:{c:42}}, d:23});
    }
}