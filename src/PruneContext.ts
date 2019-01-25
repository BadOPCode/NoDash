/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

/**
 * This function traces the specified object in searchObject using the dot 
 * delimited string and deletes the property.
 * This is useful to easily use programtic object paths in code.
 * @param searchObject object type to be searched.
 * @param context string that holds a dot delimited context to property your looking for.
 * @return value at the location of the dot delimited string. Returns false if specified context is bad.
 */
export const PruneContext = (searchObject: any, context: string): any => {
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

    // validate context exists in object
    if (searchObject.hasOwnProperty(propertyName) === false) {
        return undefined;
    }


    if (context !== "") { 
        // not traced to the end of the context specifier
        // continue tracing
        PruneContext(
            searchObject[propertyName],
            context
        );
    } else {
        // we made it to the end
        delete searchObject[propertyName];
    }

    // we traced to the end and returning value
    return tracedObject;
}

export default PruneContext;