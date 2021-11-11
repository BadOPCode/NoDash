/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
'use strict';

/**
 * This looks at the current context dot delimited string and returns a split between
 * what is the current property name and what is the next part of the context.
 * @param currentContext string that is the currnet context
 * @returns { propertyName, nextContext }
 */
export const getNextContext = (currentContext: string): { propertyName: string, nextContext: string } => {
    if (!currentContext) {
        return {
            nextContext: '',
            propertyName: ''
        };
    }
    const delimiterPosition = currentContext.indexOf('.');
    let propertyName = currentContext;
    let nextContext = '';

    if (delimiterPosition > -1) {
        // context still has a delimiter
        // fetch the next property name out of context string
        propertyName = currentContext.slice(0, delimiterPosition);
        // remove this property name from context
        nextContext = currentContext.slice(delimiterPosition + 1);
    }

    return {
        nextContext,
        propertyName
    };
};
