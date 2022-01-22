/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import * as utils from "./ContextUtils";

/**
 * This function traces the specified object in searchObject using the dot
 * delimited string and returns the property value.
 * This is useful to easily use programtic object paths in code.
 * @param searchObject object type to be searched.
 * @param context string that holds a dot delimited context to property your looking for.
 * @return value at the location of the dot delimited string. Returns false if specified context is bad.
 */
export const FetchContext = (searchObject: any, context: string): any => {
    const contextInfo: {propertyName: string, nextContext: string} = utils.getNextContext(context);
    let tracedObject = searchObject;

    // validate context exists in object
    if (Object.prototype.hasOwnProperty.call(searchObject, contextInfo.propertyName) === false) {
        return undefined;
    }

    if (contextInfo.nextContext !== "") {
        // not traced to the end of the context specifier
        // continue tracing
        tracedObject = FetchContext(
            searchObject[contextInfo.propertyName],
            contextInfo.nextContext,
        );
    } else {
        // we made it to the end
        tracedObject = searchObject[contextInfo.propertyName];
    }

    // we traced to the end and returning value
    return tracedObject;
};

export default FetchContext;
