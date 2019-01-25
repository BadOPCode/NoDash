/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

const shell = require("shelljs");

shell.pushd("scripts");
shell.exec(`ts-node ${__dirname}/testRunner.ts`, (code, stdout, stderr) => {

});
shell.popd();