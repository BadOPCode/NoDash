/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

export interface IMergeBehavior {
    [key:string]:(originalObject:any, newObject:any) => any;
}

const handleDefinedBehavior = (originalObject:any, newObject:any, behavior: IMergeBehavior) => {
    const originalTypeName = originalObject ? originalObject.constructor.name : "Undefined";
    const newTypeName = newObject ? newObject.constructor.name : "Undefined";

    if (behavior[`${originalTypeName}To${newTypeName}`]) {
        return behavior[`${originalTypeName}To${newTypeName}`](originalObject, newObject);
}

    if (behavior[originalTypeName] !== undefined) {
        return behavior[originalTypeName](originalObject, newObject);
    }
}

const processBehavior = (originalObject: any, newObject: any, behavior?: IMergeBehavior) => {
    // Property in destination object set; update its value.
    if (typeof(newObject) === "object") {
        originalObject = Merge(originalObject, newObject, behavior);
    } else {
        if (behavior && originalObject) { // if original isn't there than lets just set it
            originalObject = handleDefinedBehavior(originalObject, newObject, behavior);
        } else {
            originalObject = newObject;
        }
    }

    return originalObject
}

const  handleDefaultBehavior = (originalObject:any, newObject:any, behavior?: IMergeBehavior) => {
    if (typeof(originalObject) === "undefined") {
        return newObject;
    }

    const originalTypeName = originalObject.constructor.name;
    const newTypeName = newObject.constructor.name;
    if (originalTypeName === "Object" && newTypeName === "Object") { // built-in behavior
        for (const p in newObject) {
            originalObject[p] = processBehavior(originalObject[p], newObject[p], behavior);
        }
        return originalObject;
    }
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

    if (behavior) {
        const definedBehaviorResults = handleDefinedBehavior(originalObject, newObject, behavior);
        if (definedBehaviorResults) {
            return definedBehaviorResults;
        }
    }

    return handleDefaultBehavior(originalObject, newObject, behavior);
};

export default Merge;