// This file is required by karma.conf.js and loads recursively all the .spec and framework files

<<<<<<< HEAD
import 'zone.js/dist/zone-testing';
=======
import 'zone.js/testing';
>>>>>>> 9f07836a94e805e2b507156ed16fd1e7aa15f0cd
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
<<<<<<< HEAD
    keys(): string[];
    <T>(id: string): T;
=======
    <T>(id: string): T;
    keys(): string[];
>>>>>>> 9f07836a94e805e2b507156ed16fd1e7aa15f0cd
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
<<<<<<< HEAD
  platformBrowserDynamicTesting()
);
=======
  platformBrowserDynamicTesting(),
);

>>>>>>> 9f07836a94e805e2b507156ed16fd1e7aa15f0cd
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
