---
title: Jest
revealOptions:
    transition: 'fade'
    transition-speed: 'slow'
    width: 1024
    height: 900
    margin: 0.1
    minScale: 0.5
    maxScale: 1.0
    controls: false
---

<img src="./images/jest.jpg" width="1000px" /><br>
<small>by Peter Cosemans </small>

---

# mjr

https://github.com/mjrio/mjr-frontend-jest

---

# JS Testing

The old ones
- [Karma / jasmine](https://jasmine.github.io/) - What we all use :)
- [Mocha / Chai](https://mochajs.org/) - Simple, flexible, fun

New and improved
- [Tape](https://github.com/substack/tape) - A new style
- [Ava](https://github.com/avajs/ava) - Futuristic JavaScript test runner
- [Jest](https://facebook.github.io/jest/) - Delightful JavaScript Testing

Note: Speaker notes

- Mocha:
- Tape: No config, no globals, no shared state, simple assertion errors
- Ava: Concurrent tests / process by file, no shared state, custom assertion
- Jest: All the above

---

# Jest

Jest is an popular integrated testing solution<br> written by Facebook.

<small>Famous especially in the React world.</small>

----

## Key features

* Ease of use
* Speed
* Instant feedback
* Powerful mocking
* Works with typescript
* Snapshot testing

Note: Speaker notes

Easy setup, meaning that you need almost zero configuration to get started.
* Instant feedback, because he will run only the test files related to the changes.
* Powerful mocking, through easy to use mock functions
* Works with typescript and angular
* Snapshot testing

---

# Ease of use
> Zero config, less dependencies & re-use of existing patterns

----

## Zero configuration

Simple service (ESM module)

```js
// calc.js
export class Calc {
  add(x, y) {
    return x + y;
  }
}
```

My test

```js
// calc.spec.js
import { Calc } from './calc';

test('add', () => {
  const calc = new Calc();
  expect(calc.add(1, 2)).toBe(3);
});
```

Standard Babel config

```json
{
  "presets": ["es2015"]
}
```

---

## Zero configuration

Install jest

```bash
$ yarn add jest
```

And go!

```bash
$ npx jest
 PASS  ./calc.spec.js
  ✓ add (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.908s
Ran all test suites.
```

Watch mode

```bash
$ npx jest --watch
```

---

## Flexible style

Jasmine Style

```js
describe('Calc', () => {
    it('should add 1 + 2', () => {
    })

    fit('should test only this one', () => {
    })

    xit('should skip this one', () => {
    })
})
```

Tape & Ava Style

```js
// describe is optional
describe('Calc', () => {
    test(() => {

    })

    test.only('addition', () => {
    })

    test.skip('addition of string', () => {
    })
})
```

---

## Flexible style

Name your test files

```
cals.js
calc.spec.js
calc.test.js
```

or put your tests in '\_\_tests\_\_'

```bash
calc.js
__tests__
    calc.js
```

<small>
Jest will not load any source files not referenced via a test file.
</small>

----

## Friendly errors

Karma

<image src="images/karma-failed.png"></image>

Huum, not so friendly

----

## Friendly errors

Jest

<image src="images/jest-failed.png"></image>

---

# Speed
> Unit test should run fast.

---

## Speed

Comparing unit tests created with the @angular/cli

<image src="images/performance-chrome.png" width="1000px"></image>

**karma-chrome**: 14.911s

----

## Speed

<image src="images/performance-phantomjs.png"></image>

**karma-phantomjs**: 13.119s

[Is PhantomJS a better choice?](https://www.infoq.com/news/2017/04/Phantomjs-future-uncertain)

----

## Speed

<image src="images/performance-jest.png"></image>

**jest**: 4.970s

----

## Speed

Unit test should run fast.

<image src="images/unit-test-speed.png"></image>

----

## Speed

> How they get there.

- Runs test in parallel
- ES6/TS transformation cache
- No browser, uses JSDOM

---

# Instant feedback
> Speed it not the main factor

----

## Instant feedback

> Advanced watch mode

Run only the following:

- The failed tests
- The relevant test of your changes
    + Test dependency tree
    + Git status
- The filtered tests

---

# Jest & Angular
> A good couple together

---

## Setup

Add jest & jest-angular presets

```bash
$ yarn add jest @types/jest jest-preset-angular --dev
```

Make sure you don't have '@types/jasmine'

```bash
$ yarn remove @types/jasmine
```

Config

```json
"scripts": {
    "test:watch": "jest --watch"
},
"jest": {
    "preset": "jest-preset-angular",
    "setupTestFrameworkScriptFile": "<rootDir>/test/jest.ts"
}
```

Script file

```js
// test/jest.ts
import 'jest-preset-angular';

// we need to mock 'getComputedStyle' to make angular run in Jest
Object.defineProperty(window, 'getComputedStyle', {
    value: () => ['-webkit-appearance']
});
```

That's all.

---

# The End :)

---

## Resources

- [Unit testing Angular applications with Jest](https://izifortune.com/unit-testing-angular-applications-with-jest/)

---

## New slide

```js
export class User {
    constructor(name, age) {
    }
}

```

----

Use ^Note: as speaker notes separator.
Use <!-- .slide: data-background="#ff0000" --> to customize slide styles.
Use <!-- .element: style="width: 60%;" --> to customize element styles.
Use <!-- .element: class="fragment" --> to create fragment.

