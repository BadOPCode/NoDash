/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import { JsonArray, JsonObject, JsonProperty } from "./Types";
import { CheckTypesMatch } from "./Utils";

export interface ICompareOptions {
    arrayOrderDoesNotMatter?: boolean;
}

const matchArrays = (leftObject: JsonArray, rightObject: JsonArray, options?: ICompareOptions): boolean => {
    let lArray = leftObject;
    let rArray = rightObject;

    if (leftObject.length !== rightObject.length) {
        return false;
    }

    if (options && options.arrayOrderDoesNotMatter) {
        lArray = leftObject.sort();
        rArray = rightObject.sort();
    }

    for (let i = 0; i < leftObject.length; i++) {
        if (Compare(lArray[i], rArray[i]) === false) {
            return false;
        }
    }

    return true;
};

const matchObjects = (leftObject: JsonObject, rightObject: JsonObject): boolean => {
    if (Compare(Object.keys(leftObject), Object.keys(rightObject)) === false) {
        return false;
    }
    for (const p in leftObject) {
        if (Compare(leftObject[p], rightObject[p]) === false) {
            return false;
        }
    }

    return true;
};

/**
 * Will compare two objects of any type and checks to see if their values match recurisively.
 * @param leftObject First object to be compared to.
 * @param rightObject Second object that is compared to the first.
 */
export const Compare = (leftObject: JsonProperty, rightObject: JsonProperty, options?: ICompareOptions) => {
    if (!CheckTypesMatch(leftObject, rightObject)) {
        return false;
    }

    let retValue = leftObject === rightObject;
    if (leftObject === null) {
        // already compared left and right types match.
        // null only has a value of null
        retValue = true;
    } else if (Array.isArray(leftObject)) {
        retValue = matchArrays(leftObject, (rightObject as JsonArray), options);
    } else if (leftObject?.constructor === Object) {
        retValue = matchObjects((leftObject as JsonObject), (rightObject as JsonObject));
    }

    return retValue;
};

export default Compare;
