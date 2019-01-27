/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

export interface IDecisionTree {
    [key: string]: any
}

export const defaultUnknownDecision = (decision: any) => {
    console.log('Unknown "' + decision + '" command.');
}

const runDecision = (decisionTree: IDecisionTree, decision: any, params?: any) => {
    if (decisionTree[`${decision}`]) {
        if (decisionTree[`${decision}`] instanceof Function) {
            return decisionTree[`${decision}`](params);
        } else {
            return decisionTree[`${decision}`];
        }
    } else { // can't find option
        if (decisionTree['default']) { //fall back to default if specified
            return (decisionTree['default'] instanceof Function) ? 
                decisionTree['default'](`${decision}`, params):
                decisionTree['default']; 
        }
        // default was not specified
        defaultUnknownDecision(`${decision}`);
    }
}

export const Decision = (decisionTree: IDecisionTree) => {
    return (decision?: any, params?: any) => {
        if (!decision) { //blank decision
            return runDecision(decisionTree, 'default');
        }
        return runDecision(decisionTree, decision, params);
    };
};

export default Decision;