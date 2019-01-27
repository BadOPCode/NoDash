# TS-NoDash Library

Module that provides functions for manipulating objects.


[![Build Status](https://travis-ci.com/BadOPCode/NoDash.svg?branch=master)](https://travis-ci.com/BadOPCode/NoDash) 
[![Greenkeeper badge](https://badges.greenkeeper.io/BadOPCode/NoDash.svg)](https://greenkeeper.io/)
[![Maintainability](https://api.codeclimate.com/v1/badges/6a17e02fd7282740f43c/maintainability)](https://codeclimate.com/github/BadOPCode/NoDash/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6a17e02fd7282740f43c/test_coverage)](https://codeclimate.com/github/BadOPCode/NoDash/test_coverage)



## Description

While the name of this library is a friendly poke at LoDash, I have nothing but respect for LoDash.  The idea behind this library is to tackle the same problems LoDash and Underscore address but with the organization on functional design instead of being organized around native base classes. This library was designed to use ES6 style imports and does not provide any global module that can be directly loaded in a browser.  It's written in TypeScript but can just as easily be used in Babel projects as well.



## Installation

To install type...
```
npm i -S ts-nodash
```

In ES6, TypeScript or Babel you can include the entire module.
```typescript
import * as nodash from "ts-nodash";
```

In ES5 Node JS you can add this line.
```javascript
var nodash = require("ts-nodash");
```


## Usage

This module provides similiar functionality as Lodash or Underscore.  The primary need for it is that a lot of the other libraries come with a lot of baggage or has safeties that get in the way.
They will mess with global name space, extend base class prototypes, have object depth restrictions with no override or documentation that they are there.
These functions are simple and transparent with no hand holding leaving better judgement up to you.
The design philosophy is organizing by functionality rather than by object type.  So the functions defined should take any object (if possible)



## Functions

### Compare

The Compare function takes two parameters that can be of any object type and it compares the two objects and returns boolean true or false if they are the same.

To import specifically this function use the following code:
```typescript
//ES6
import { Compare } from "ts-nodash";

//Node JS
var Compare = require("ts-node").Compare;
```

**Syntax**
```
Compare(object1, object2[, options])
```
> object1 (required): Any type of javascript object you want to be compared to object2

> object2 (required): Any type of javascript object you want to be compared with object1

> options (optional): a object that contains overrides to default behavior of comparing.

    - arrayOrderDoesNotMatter(optional) true | false - If set to true the array will not care the order of the data just that all the elements and values match. If set to false (default) the order is taken into consideration on matching

> returns: boolean true or false.

**Examples**
```typescript
Compare("42", 42) // returns false because the types don't match
Compare(42, 36) // returns false because values don't match
Compare({
    a: 1,
    b: 2,
    c: ["e", "f", "g"]
}, {
    c: ["g", "f", "e"],
    b: 2,
    a: 1
}, {
    arrayOrderDoesNotMatter: true
}) //returns true despite the order differences.

compare([1,2,3],[3,2,1]]) //returns false because by default array order does matter.
```



### DateFormat

The DateFormat function will format a date or time specified and returns the string.

To import specifically this function use the following code:

```typescript
//ES6
import { DateFormat } from "ts-nodash";

//Node JS
var DateFormat = require("ts-node").DateFormat;
```

**Syntax**
```
DateFormat(date, format)
```
> date (required): Is a JavaScript Date type object.

> format (required): Specifies how the date should be formatted.

Format Symbol | Description
--------------|------------
"YYYY" | Four digit date. (2019)
"YY" | Two digit date. (19)
"MMMM" | Full month's name. (January, Febuary, etc.)
"MMM" | Abreviated month's name. (Jan, Feb, etc.)
"MM" | Month in digit format with padded 0 if value is bellow 10. (01-12)
"M" | Month in digit format without pad. (1-12)
"Q" | Quarter (1-4)
"DDDD" | Full day of the week name. (Monday, Tuesday, etc)
"DDD" | Abreviated day of the week. (Mon, Tues, etc)
"DD" | Zero padded day of the month. (01-31)
"DOY" | Day of the year. (1-365)
"DS" | The day of the month using ordinal suffix. (1st, 2nd, 3rd, 4th, etc.)
"D" | Non-padded day of the month. (1-31)
"WW" | Padded week of the year. (01-52)
"W" | Non-padded week of the year. (1-52)
"hh+" | Padded hour in 12 hour time. (01-12)
"hh" | Padded hour in 24 hour time. (01-24)
"h+" | Non-padded 12 hour time. (1-12)
"h" | Non-padded 24 hour time. (1-24)
"mm" | Padded minutes. (00-59)
"m" | Non-padded minutes. (0-59)
"ss" | Padded seconds. (00-59)
"s" | Non-padded seconds. (0-59)
"A" | Meridiem in uppercase. (AM, PM)
"a" | Meridiem in lowercase. (am, pm)
"lll" | Padded milliseconds. (000-999)
"l" | Non-padded millisecond. (0-999)
"_" | To specify that the next character is to be displayed literally.

> returns: A string of the date specified in the format given.

**Examples**
```typescript
const testDate = new Date("Jan 2 2003 16:35:46:57");
DateFormat(testDate, "MMMM DS, YYYY")  // returns "January 2nd, 2003"
DateFormat(testDate, "MM/DD/YY") // returns "01/02/03"
DateFormat(testDate, "Q_QYY") // returns "1Q03"
DateFormat(testDate, "WW _WK YYYY") // returns "01 WK 2003"
DateFormat(testDate, "h+:mm A") // returns "4:35 PM"
DateFormat(testDate, "h:mm:ss.lll") // returns "16:35:46.057"
DateFormat(testDate, "YYYY-MM-DD hh:mm:ss") //returns "2003-01-02 16:35:46"
```



### Decision
This is meant as a cleaner more functional replacement for switch case in JavaScript.
Decision function lets you make a object that contains all the options possible represented as a object key which can be either a string or a number. When you pass the object into the Decision function it returns a fuction that takes a decision parameter and a secondary parameters that will be passed into functions that might be contained within the decision object.

To import specifically this function use the following code:
```typescript
//ES6
import { Decision } from "ts-nodash";

//Node JS
var Decision = require("ts-node").Decision;
```


**Syntax**
```
FetchContext(decisionObject)

decisionObject = {
    "option": Function(parameter) | value
    ["default": Function(decision, parameter) | value]
}
```

> decisionObject (required): Object that specifies the decision tree. Each option within the decisionObject can be a property of any type or a function.  The decisionObject is processed at the moment it's passed into the Decision function, so the decisionObject can be programatically made before hand.

> returns: a function that can be used multiple times to return decisions based off of the originating decisionObject.  The function takes optional 2 parameters.  The first one is the value of the decision to make.  The second is parameters to pass if the option in the decisionObject is a function.  If "default" is specified as an option, any time a decision is not on the decisionObject list it will execute this option.  This option is a little different if it's a function.  The function's first parameter was the decision that brought it to "default". The second parameter is the parameter that was being passed.


**Examples**
```typescript
Decision({
    a: "hello",
    b: "world"
})("a") // returns "hello"

const decisionFunc = Decision({
    a: (param) => `a:${param}`,
    b: (param) => `b:${param}`
})
decisionFunc("b", 42) // returns "b:42"
decisionFunc("a", 25) // returns "a:25"

Decision({
    1: "a",
    2: "b",
    default: (decision, params) => `uknown option ${decision} with params "${params}"`
})(23)  // returns "default option 23 with params \"\""

Decision({
    1: "a",
    2: "b",
    default: "c"
})(23)  // returns "c"

Decision({
    1: "a",
    2: "b",
    default: "c"
})() //returns "c"
```



### FetchContext
This will fetch a property from a object using a dot ('.') delimited string.
This is a useful function for easily making programatic functions to return values within objects.

To import specifically this function use the following code:
```typescript
//ES6
import { FetchContext } from "ts-nodash";

//Node JS
var FetchContext = require("ts-node").FetchContext;
```

**Syntax**
```
FetchContext(object, "dot.delimited.string")
```

> object1 (required): is the object you want to fetch data from.

> "dot.delimited.string" (required): is the location using dots to seperate the objects names.

> returns: The value specified there. Undefined if it doesn't find anything.

**Examples**
```typescript
const testObj = {
    a: { b: { c: 42 }},
    d: 12
}
FetchContext(testObj, "d") //returns 12
FetchContext(testObj, "a") //returns { b: { c: 42 } }
FetchContext(testObj, "a.b") //returns { c: 42 }
FetchContext(testObj, "a.b.c") //returns 42
```


### Merge

The Merge function takes two parameters that can be of any object type and will try to merge them together.  The third parameter is to override the default behavior.

To import specifically this function use the following code:
```typescript
//ES6
import { Merge } from "ts-nodash";

//Node JS
var Merge = require("ts-node").Merge;
```

**Syntax**
```
Merge(object1, object2[, behavior])
```
> object1 (required): is the object you want to merge object2 in. By default common properties will be clobbered in this object by object2.

> object2 (required): is the object you want data to be merged into object1. By default same properties in this object will clobber data in object1.

> behavior (optional): this is a object that stores overrides of the default behavior.  The format of the behavior name is [Type1]To[Type2] or Type.  "Type1ToType2" is for when object1 is of type1 and object2 is of type2.  The "Type" is triggered whenever the original type (object1) is of that type.

> returns: The combination of the two objects based on the behavior rules.

**Examples**
```typescript
Merge({a:1, b:"hello", c:3}, {d:4, e:5, f:6}) // returns {a:1, b:"hello", c:3, d:4, e:5, f:6}
Merge({a:1, b:"hello", c:3}, {b:2}) //returns {a:1, b:2, c3}
Merge("Hello world", 42, {
    String: (originalObj, newObj) => {
        return originalObj + newObj;
    }
}) // returns "Hello world42"
Merge({a:[1,2,3], c:3}, {a:[4,5,6], b:2}, {
    ArrayToArray: (originalObj, newObj) => {
        return originalObj.concat(newObj);
    }
}) // returns {a:[1,2,3,4,5,6], b:2, c:3}
Merge({a:{b:{c:[1,2,3], d:"hello"}}}, {a:{b:{c:[4,5,6], e:"world"}}}) // returns {a:{b:{c:[4,5,6], d:"hello", e:"world"}}}  The default behavior is to clobber all value types except for objects. So the Array "c" in object1 gets clobbered by the "c" in object2.
```



### PruneContext

The PruneContext removes a property within a object using the dot (".") delimited 
string as a specifier of where the property is.

To import specifically this function use the following code:
```typescript
//ES6
import { PruneContext } from "ts-nodash";

//Node JS
var PruneContext = require("ts-node").PruneContext;
```

**Syntax**
```
PruneContext(object, "dot.delimited.string")
```

> object (required): The object to remove a property from

> "dot.delimited.string" (required): The path to the property to be removed.

> returns: The object without the specified property.

**Examples**
```typescript
const testObj = {
    a: { b: { c: 42 }},
    d: 12
}
PruneContext(testObj, "d") //returns { a: { b: { c: 42 } } }
PruneContext(testObj, "a") //returns { d: 12 }
PruneContext(testObj, "a.b") //returns { a: {}, d:12 }
PruneContext(testObj, "a.b.c") //returns { a: { b: {} }, d:12 }
```


### PutContext
This will place data within a object using the context specified in the string.

To import specifically this function use the following code:
```typescript
//ES6
import { PutContext } from "ts-nodash";

//Node JS
var PutContext = require("ts-node").PutContext;
```

**Syntax**
```
PutContext(object1, "dot.delimited.string", object2)
```

> object1 (required): The object to have data placed into.

> "dot.delimited.string" (required): The string that specifies where in object1 we want the value.

> object2 (required): Any type of value or object that you want to place at the location.

> returns: the value pushed to the location.  If the context path does not exist it will be created.

**Examples**
```typescript
const testObj = {
    a: { b: { c: 42 }},
    d: 12
}
FetchContext(testObj, "d", "hello") // returns { a:{b:{c:42}}, d:"hello" }
FetchContext(testObj, "a.b.c", 25) // returns  { a:{b:{c:25}}, d: 12 }
FetchContext(testObject, "a.b", { e: 23 }) // returns  { a:{b:{e:23}}, d: 12 }
FetchContext(testObject, "a.b.e", 23); // returns  { a:{b:{c:42, e:23}}, d: 12 }
```
