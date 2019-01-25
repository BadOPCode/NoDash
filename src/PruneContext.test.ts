/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
import { Expect, Test, TestFixture } from "alsatian";
import PruneContext from "./PruneContext";

"use strict";


@TestFixture("PruneContext")
export class FixturePruneContext {
    @Test("It should delete a property on a root object.")
    public testPropertySimple() {
        const testObj = {
            a: 12,
            b: 34,
            c: 56
        }
        Expect(PruneContext(testObj, "b")).toEqual({a:12, c:56});
    }

    @Test("It should delete a object from a root object.")
    public testDeleteObject() {
        const testObj = {
            a: {
                b: {
                    c: 42
                }
            },
            d: "hi"
        }

        Expect(PruneContext(testObj, "a")).toEqual({d:"hi"});
    }

    @Test("It should be able to traverse a object to delete a property")
    public testDeleteComplexProperty() {
        const testObj = {
            a: {
                b: {
                    c: 42,
                    d: "hi"
                }
            },
            d: "hi"
        }

        Expect(PruneContext(testObj, "a.b.c")).toEqual({a:{b:{d:"hi"}}, d:"hi"});
    }

    @Test("It should be able to traverse a object to delete a object")
    public testDeleteComplexObject() {
        const testObj = {
            a: {
                b: {
                    c: {
                        x: 12,
                        y: 34
                    },
                    d: "hello"
                }
            },
            d: "world"
        }

        Expect(PruneContext(testObj, "a.b.c")).toEqual({a:{b:{d:"hello"}}, d:"world"});
    }
}