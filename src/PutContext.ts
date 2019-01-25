/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

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
    let propertyName: string = context;
    const delimiterPosition = context.indexOf(".");
    let tracedObject = searchObject;

    if (delimiterPosition > -1) {
        // context still has a delimiter
        // fetch the next property name out of context string
        propertyName = context.slice(0, delimiterPosition);
        // remove this property name from context
        context = context.slice(delimiterPosition + 1);
    } else {
        // we are at the end of the context map so scrub the next context
        context = "";
    }

    if (!searchObject.hasOwnProperty(propertyName)) {
        searchObject[propertyName] = {};
    }

    if (context !== "") { 
        // not traced to the end of the context specifier
        // continue tracing
        tracedObject[propertyName] = PutContext(
            searchObject[propertyName],
            context,
            data
        );
    } else {
        // we made it to the end
        tracedObject[propertyName] = data;
    }

    // we traced to the end and returning value
    return tracedObject;
}

export default PutContext;