/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
'use strict';

/**
 * This module forwards imports from the module root to the dist directory
 * that is ES5 friendly without flow.
 */
export default './dist/index.js';
export * from '../nodash-old/dist/index.js';
