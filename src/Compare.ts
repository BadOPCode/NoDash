/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

export interface ICompareOptions {
    arrayOrderDoesNotMatter?: boolean;
}

/**
 * Will compare two objects of any type and checks to see if their values match recurisively.
 * @param leftObject First object to be compared to.
 * @param rightObject Second object that is compared to the first.
 */
export const Compare = (leftObject: any, rightObject: any, options?:ICompareOptions) => {
    const leftType = typeof(leftObject);
    const rightType = typeof(rightObject);

    if (leftType !== rightType) {
        return false;
    }

    if (leftType === "object") {
        if (leftObject.constructor === Array) {
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
        }

        if (leftObject.constructor === Object) {
            if (Compare(Object.keys(leftObject), Object.keys(rightObject)) === false) {
                return false;
            }
            for (const p in leftObject) {
                if (leftObject.hasOwnProperty(p)) { // don't trace ancestor prototype
                    if (Compare(leftObject[p], rightObject[p]) === false) {
                        return false;
                    }
                }
            }
        }
    } else {
        return leftObject === rightObject;
    }

    return true;
};

export default Compare;