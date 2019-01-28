/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

export interface ICompareOptions {
    arrayOrderDoesNotMatter?: boolean;
}

const checkTypesMatch = (leftObject: any, rightObject: any) => {
    const leftType = typeof(leftObject);
    const rightType = typeof(rightObject);

    if (leftType !== rightType) {
        return false;
    }

    return true;
}

const matchArrays = (leftObject:Array<any>, rightObject:Array<any>, options?:ICompareOptions): boolean => {
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
}

const matchObjects = (leftObject:any, rightObject:any, options?:ICompareOptions): boolean => {
    if (Compare(Object.keys(leftObject), Object.keys(rightObject)) === false) {
        return false;
    }
    for (const p in leftObject) {
        if (Compare(leftObject[p], rightObject[p]) === false) {
                return false;
        }
    }

    return true;
}

/**
 * Will compare two objects of any type and checks to see if their values match recurisively.
 * @param leftObject First object to be compared to.
 * @param rightObject Second object that is compared to the first.
 */
export const Compare = (leftObject: any, rightObject: any, options?:ICompareOptions) => {
    if (!checkTypesMatch(leftObject, rightObject)) {
        return false;
    }

    if (leftObject.constructor === Array) {
        return matchArrays(leftObject, rightObject, options);
    }

    if (leftObject.constructor === Object) {
        return matchObjects(leftObject, rightObject, options);
    }

    return leftObject === rightObject;
};

export default Compare;