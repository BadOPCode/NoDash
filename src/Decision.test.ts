/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import { Expect, Test, TestFixture, SpyOn } from "alsatian";
import Decision, * as spyMod from "./Decision";


@TestFixture("Decision Function")
export class FixtureDecision {
    @Test("Simple decision tree returns number.")
    public testSimpleDecisionNumber() {
        const x = Decision({
            a: 1,
            b: 2,
            c: 3
        });
        Expect(x('b')).toBe(2);
    }

    @Test("Simple decision tree returns string.")
    public testSimpleDecisionString() {
        const x = Decision({
            1: "a",
            2: "b",
            3: "c"
        });
        Expect(x(2)).toBe('b');
    }

    @Test("Should be able to pass in and execute functions")
    public testSimpleDecisionFunc() {
        const x = Decision({
            "less": (value: number) => value-1,
            "more": (value: number) => value+1,
            "same": (value: number) => value
        });
        const value = 42;
        Expect(x("more", value)).toBe(43);
        Expect(x("less", value)).toBe(41);
        Expect(x("same", value)).toBe(42);
    }

    @Test("Should be able to setup a default value")
    public testDefaultDecision() {
        const x = Decision({
            a: 1,
            b: 2,
            c: 3,
            default: 42
        });
        Expect(x()).toBe(42);
    }

    @Test("Without unknown decision option specified value should use default when option isn't in the list.")
    public testDefaultWithUnknownDecision() {
        const x = Decision({
            a: 1,
            b: 2,
            c: 3,
            default: 42
        });
        Expect(x('z')).toBe(42);
    }

    @Test("Should be able to specify a function for default returns")
    public testDefaultDecisionWithFunc() {
        const x = Decision({
            a: 1,
            b: 2,
            c: 3,
            default: (decision: string) => `${decision}:42`
        });
        Expect(x('z')).toBe("z:42");
    }

    @Test("Should return error and quit if unknown and default are not specified")
    public testUnknownWithNoDefaultOrUnknownDecision() {
        const x = Decision({
            a: 1,
            b: 2,
            c: 3,
        });
        SpyOn(spyMod, "defaultUnknownDecision");
        Expect(x('z')).toBe(undefined);
        Expect(spyMod.defaultUnknownDecision).toHaveBeenCalled();
    }

    @Test("There should be no issue passing algorithms in as decision.")
    public testAlgorithmDecision() {
        const x = Decision({
            1: "hi",
            2: "hello world",
            3: "bye"
        });
        Expect(x(1+1)).toBe("hello world");        
    }
}