/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

/**
 * This module provides a export path if the TypeScript compiler imports module
 * path. Exports from root everything in src.
 */
import NoDash from "./src/index";

export default NoDash;
export * from "./src/index";