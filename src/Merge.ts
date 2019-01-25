/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

export interface IMergeBehavior {
    [key:string]:(originalObject:any, newObject:any) => any;
}

const defaultObjectBehavior = (originalObject:any, newObject:any) => {
}

/**
 * Recursively merge two objects together.
 * @param originalObject The base object. Properties here will be overwritten
 * by properties that also exist in newObject.
 * @param newObject Properties in this object that are also in the original will
 * be overwritten by the values in this object.
 */
export const Merge = (originalObject: any, newObject: any, behavior?: IMergeBehavior) => {
    if (typeof(newObject) === "undefined") {
        return originalObject;
    }

    if (typeof(originalObject) === "undefined") {
        return newObject;
    }

    const originalTypeName = originalObject.constructor.name;
    const newTypeName = newObject.constructor.name;
    if (behavior) {
        if (behavior[`${originalTypeName}To${newTypeName}`]) {
            return behavior[`${originalTypeName}To${newTypeName}`](originalObject, newObject);
        }

        if (behavior[originalTypeName]) {
            return behavior[originalTypeName](originalObject, newObject);
        }
    }

    if (originalTypeName === "Object" && newTypeName === "Object") { // built-in behavior
        for (const p in newObject) {
            // Property in destination object set; update its value.
            if (typeof(newObject[p]) !== "undefined") {
                if (typeof(newObject[p]) === "object") {
                    originalObject[p] = Merge(originalObject[p], newObject[p]);
                } else {
                    originalObject[p] = newObject[p];
                }
            }
        }
        return originalObject;
    }

    return newObject;
};

export default Merge;