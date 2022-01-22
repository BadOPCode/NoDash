/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import { Expect, Test, TestFixture } from "alsatian";
import FetchContext from "../src/FetchContext";

@TestFixture("FetchContext Function")
export class FixtureFetchContext {
    @Test("It should return a number from a flat object.")
    public testNumberValue() {
        Expect(FetchContext({a: 42}, "a")).toBe(42);
    }

    @Test("It should return an object from a flat object.")
    public testObjectValue() {
        const testObj = {
            a: {
                b: 2,
            },
        };
        Expect(FetchContext(testObj, "a")).toEqual({b: 2});
    }

    @Test("It should return undefined if it can't find the context.")
    public testBadContext() {
        const testObj = {
            a: {
                b: 2,
            },
        };
        Expect(FetchContext(testObj, "a.z")).toBe(undefined);
    }

    @Test("It should fetch a string deep inside of a object.")
    public testDeepObject() {
        const testObj = {
            a: {
                b: {
                    c: "hello world",
                },
            },
        };

        Expect(FetchContext(testObj, "a.b.c")).toBe("hello world");
    }

    @Test("It should fetch a object deep from within a object.")
    public testObjectDeepObject() {
        const testObj = {
            a: {
                b: {
                    c: {
                        a: 42,
                        q: "What is the answer to life, the universe and everything?",
                    },
                },
            },
        };
        Expect(FetchContext(testObj, "a.b.c")).toEqual({
            a: 42,
            q: "What is the answer to life, the universe and everything?",
        });
    }
}
