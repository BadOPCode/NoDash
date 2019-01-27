/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

export type TDecision = string | number | undefined;

export interface IDecisionTree {
    [key: string]: any
}


export const defaultUnknownDecision = (decision: any) => {
    console.log('Unknown "' + decision + '" command.');
}

const processOption = (decisionTree: IDecisionTree, decision: TDecision, params?: any) => {
    return (decisionTree[`${decision}`] instanceof Function) ? 
        decisionTree[`${decision}`](params):
        decisionTree[`${decision}`]; 
}

const processDefaultOption = (decisionTree: IDecisionTree, decision: TDecision, params?: any) => {
    return (decisionTree['default'] instanceof Function) ? 
        decisionTree['default'](`${decision}`, params):
        decisionTree['default']; 
}

const runDecision = (decisionTree: IDecisionTree, decision: any, params?: any) => {
    if (decisionTree[`${decision}`]) {
        return processOption(decisionTree, decision, params);
    }

    if (decisionTree['default']) { //fall back to default if specified
        return processDefaultOption(decisionTree, decision, params);
    }

    // default was not specified
    defaultUnknownDecision(`${decision}`);
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