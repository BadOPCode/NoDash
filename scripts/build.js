/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

const shell = require("shelljs");

shell.exec("tsc", (code, stdout, stderr) => {
    if (code == 0) {
        console.log("NoDash built successfully.")
    }
});