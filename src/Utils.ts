import { JsonProperty } from "./Types";

export const CheckTypesMatch = (leftObject: JsonProperty, rightObject: JsonProperty) => {
    const leftType = typeof (leftObject);
    const rightType = typeof (rightObject);

    if (leftType !== rightType) {
        return false;
    }

    // the OR is redundent due to the code above but is used
    // to validate the return constructor compare bellow.
    if (leftObject == null || rightObject == null) return true;

    return leftObject.constructor === rightObject.constructor;
};
