import { JsonArray, JsonObject, JsonProperty } from "./Types";
import { CheckTypesMatch } from "./Utils";

const matchArrays = (baseObject: JsonArray, comparedObject: JsonArray):boolean => {
    // more required comparedObjects than there are of the base
    if (comparedObject.length > baseObject.length) {
        return false;
    }

    // iterate through list of required compare
    return comparedObject.reduce<boolean>((found, compare) => {
        // if something has been found already missing don't bother
        if (!found) return false;

        // look through list to find the compare object
        found = baseObject.reduce<boolean>((accum, base) => {
            // if we already found a match than dont bother comparing more
            if (accum) return true;

            // recurse through objects to see if compare is contained in base
            if (Contains(base, compare)) {
                accum = true;
            }

            return accum;
        }, false);

        return found;
    }, true);
};

const matchObjects = (baseObject: JsonObject, comparedObject: JsonObject): boolean => {
    if (Contains(Object.keys(baseObject), Object.keys(comparedObject)) === false) {
        return false;
    }

    for (const key in comparedObject) {
        if (Contains(baseObject[key], comparedObject[key]) === false) {
            // quit looking if we find something not found
            return false;
        }
    }

    return true;
};

/**
 * This function is similar to Compare only it ensures all of the comparedObject is contained in the baseObject
 * and ignores extra data that is in baseObject.
 */
export const Contains = (baseObject: any, comparedObject: any): boolean => {
    if (!CheckTypesMatch(baseObject, comparedObject)) {
        return false;
    }

    let retValue = baseObject === comparedObject;

    if (comparedObject?.constructor === String) {
        retValue = (baseObject as string).indexOf((comparedObject as string)) > -1;
    } else if (Array.isArray(comparedObject)) {
        retValue = matchArrays((baseObject as JsonArray), (comparedObject as JsonArray));
    } else if (comparedObject?.constructor === Object) {
        retValue = matchObjects((baseObject as JsonObject), (comparedObject as JsonObject));
    }

    return retValue;
};

export default Contains;
