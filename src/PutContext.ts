/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import * as utils from "./ContextUtils";

/**
 * This function will follow the context path of a object using the dot
 * delimited string until it gets to the path and than insert the data
 * specified. If an object does not exist along the context path it gets created.
 * This is useful to easily use programtic object paths in code.
 * @param searchObject object type to be searched.
 * @param context string that holds a dot delimited context to property your looking for.
 * @param data The data to put in object
 * @return value at the location of the dot delimited string. Returns false if specified context is bad.
 */
export const PutContext = (searchObject: any, context: string, data: any): any => {
    const contextInfo: {propertyName: string, nextContext: string} = utils.getNextContext(context);
    const tracedObject = searchObject;

    if (!searchObject.hasOwnProperty(contextInfo.propertyName)) {
        searchObject[contextInfo.propertyName] = {};
    }

    if (contextInfo.nextContext !== "") {
        // not traced to the end of the context specifier
        // continue tracing
        tracedObject[contextInfo.propertyName] = PutContext(
            searchObject[contextInfo.propertyName],
            contextInfo.nextContext,
            data,
        );
    } else {
        // we made it to the end
        tracedObject[contextInfo.propertyName] = data;
    }

    // we traced to the end and returning value
    return tracedObject;
};

export default PutContext;
