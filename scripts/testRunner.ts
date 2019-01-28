/**
 * @namespace NoDash
 * @author Shawn Rapp
 * @license MIT
 */
"use strict";

import { TestRunner, TestSet } from "alsatian";
import { TapBark } from "tap-bark";

(async () => {
    const testSet = TestSet.create();
    testSet.addTestsFromFiles("../src/**/*.test.ts");

    const testRunner = new TestRunner();

    testRunner.outputStream
        .pipe(TapBark.create().getPipeable())
        .pipe(process.stdout);

    await testRunner.run(testSet);
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
