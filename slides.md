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

<style>
.reveal .slides {
  height: 100%;
  top: 20px;
  margin-top: 0;
}

.reveal .slides>section {
  min-height: 90%;
}

.reveal .slides>section>section {
  min-height: 100%;
}

.reveal p {
    text-align: center;
    margin: 20px 0;
    line-height: 1.0;
}
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
}
</style>

<img src="./images/jest.jpg" width="1000px" /><br>
<small>by Peter Cosemans </small>

---

# mjr

https://github.com/mjrio/mjr-frontend-jest

---

# JS Testing

The old ones

- [Karma / jasmine](https://jasmine.github.io/) - Karma == Angular
- [Mocha / Chai](https://mochajs.org/) - Simple, flexible, fun
<br><br>

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
* Works with typescript & angular
* Snapshot testing
* Code coverage included

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

----

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

----

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

Mocha style

```js
it('should do this....', () => {
})

it.only('should ...', () => {
})

it.skip('should ...', () => {
})
```

Tape & Ava Style

```js
test('addition', () => {
})
```

----

## File & Folders

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

----

## Jasmine Matchers

toBe (===)

```js
test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});
```

toEqual (checks every property)

```js
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
});
```

Truthiness

```js
test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});
```

----

## Jasmine Matchers

Numbers

```js
test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBe(4);
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
});

test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    expect(value).not.toBe(0.3);    // It isn't! Because rounding error
    expect(value).toBeCloseTo(0.3); // This works.
});
```

Strings

```js
test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
});
```

Exceptions

```js
test('compiling android goes as expected', () => {
    expect(fn).toThrow();
    expect(fn).toThrow(ConfigError);

    // warp a function with arguments
    expect(() => testMe(1, 2, 3)).toThrow();
});
```

----

## Jasmine Matchers

And More

[Jest Expect API](https://facebook.github.io/jest/docs/expect.html)

And easy to extend

[Jasmine-Matchers](https://github.com/JamieMason/Jasmine-Matchers)

----

## Async support

Promise support; like Mocha

```js
import { find } from './myService'

describe('myService', () => {
    test('find', () => {
        // return the promise here
        return find('query')
            .then(data => {
                expect(data).toEqual('abc')
            })
        })
    });
});
```

Async & await support

```js
import { find } from './myService'

describe('myService', () => {
    test('find', async () => {
        const result = await find('query');
        expect(data).toEqual('abc')
    });
});
```

Async expect

```js
test ('should work', () => {
    return expect(find('query')).resolves.toEqual('abc');
});
```

----

## Client and Server code

Node

```json
{
    jest: {
        testEnvironment: 'node'
    }
}
```

No browser required (Angular, VueJS, React)

```json
{
    jest: {
        testEnvironment: 'jsdom'
    }
}
```

```js
test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});
```

<br>

## [jsdom](https://github.com/tmpvar/jsdom)

A JavaScript implementation of the WHATWG DOM and HTML standards, for use with node.js

---

## Code coverage

> It's all included

```json
jest --coverage
```

```
Test Suites: 2 failed, 1 passed, 3 total
Tests:       2 failed, 1 passed, 3 total
Snapshots:   0 total
Time:        0.869s, estimated 1s
Ran all test suites.
----------------|----------|----------|----------|----------|----------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------|----------|----------|----------|----------|----------------|
All files       |    85.71 |       50 |       80 |    85.71 |                |
 calc.js        |       75 |      100 |       50 |       75 |              9 |
 formatter.js   |      100 |       50 |      100 |      100 |              4 |
 userService.js |      100 |      100 |      100 |      100 |                |
----------------|----------|----------|----------|----------|----------------|
```

---

# Speed
> Unit test should run fast.

----

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
> Speed is not the main factor

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

# Powerfull mocking
> More then stubs and spies

----

## Mocking

Jasmine

```js
// mocked function
const stub = jasmine.createSpy('name')

// mocked function with return
const stub = jasmine.createSpy('name').and.returnValue(2)

// mocked function on foo with new implementation
spyOn(foo, 'setBar').and.callFake(() => { throw new Error('bad') })

// assert
foo.setBar('abc');
expect(foo.setBar).toHaveBeenCalledWith();
```

Sinon

```js
const stub = sinon.stub()
const stub = sinon.stub().andReturns(2)
sinon.stub(foo, 'setBar').callsFake(() => { throw new Error('bad') })
sinon.stub(foo, 'setBar').throws(new Error('bad') })

// assert
foo.setBar('abc');
expect(mock2.calledWith('abc')).toBeTruthy();
```

Jest

```js
const stub = jest.fn()
const stub = jest.fn().mockReturnValue(2)
jest.spyOn(foo, 'setBar').mockImplementation(() => { throw new Error('bad') })

// assert
foo.setBar('abc');
expect(foo.setBar).toHaveBeenCalledWith('abc');
```

Just the same but different :)

----

## Mocking dependencies

```js
// userRepo.js
import { db } from './data/db'
import { eventBus } from './eventBus'

export class UserRepo {
    save(user) {
        eventBus.publish('save', user)
        return db.save(user); // this call to the DB
    }
}
```

```js
// userRepo.spec.js
import { eventBus } from './eventBus'
import { db } from './data/db'
jest.mock('./eventBus');
jest.mock('./data/db');

test('userRepo', async () => {
    const user = { id: 12, name: 'John' };
    db.save.mockReturnValue(Promise.resolve(user))
    const sut = new UserRepo();

    await sut.save(testUser)
    expect(db.save).toHaveBeenCalledWith(user)
    expect(eventBus.publish).toHaveBeenCalledWith('save', user)
})
```

All functions on db & eventBus are mocked

---

# Jest & Angular
> A good couple together

----

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

// limit Zone.js messy error stack trace
Error.stackTraceLimit = 2
```

That's all.

----

## Use

```js
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppComponent,
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }),
  );

  it('should create the app', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }),
  );
})
```

> All Angular test feature can he used.

----

# Snapshot testing
> One you have it, you never go back.

----

## How to test this?

```js
export function formatList(listName, items, key) {
  return `These are the items in the ${listName}:${items.reduce(
    (itemsList, item) => {
      return `${itemsList}\n  - ${key ? item[key] : item}`;
    },
    '',
  )}`;
}
```

----

## Snapshot testing

```js
  it('should create the app', async(() => {
    const items = [{ name: 'beer', name: 'soup'}]
    const result = formatList('Shopping', items, 'name');
    expect(result).toMatchSnapshot();
  }),
);
```

> Make hard to test content easy

----

## Angular component testing

The old way

```js
it('contains list of blog items by default', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // check the basic component state
    expect(fixture.componentInstance.editing).toBe(false);
    expect(fixture.nativeElement
       .querySelector('#blog-editor-panel') === null).toBe(true);
    expect(fixture.nativeElement
       .querySelector('#blog-roll-panel') === null).toBe(false);
    let trs = fixture.nativeElement.querySelectorAll('tr.rows');
    expect(trs.length).toBe(2);
    let tdTitleContent = trs[0].cells[1].textContent;
    let tdRenderedContent = trs[0].cells[2].textContent;
    expect(tdTitleContent).toContain('Article Title...');
    expect(tdRenderedContent).toContain('*Hi there*');
})
```

With snapshot testing

```js
it('should render correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
})
```

---

# Migrating

[jest-codemods](https://github.com/skovhus/jest-codemods)

Migrating JavaScript test files from AVA, Chai, Jasmine, Mocha, proxyquire, Should.js and Tape to Jest.

```
$ jest-codemods --help

    Codemods for migrating test files to Jest.

    Usage
      $ jest-codemods <path> [options]

    path    Files or directory to transform. Can be a glob like src/**.test.js

    Options
      --force, -f   Bypass Git safety checks and forcibly run codemods
      --dry, -d     Dry run (no changes are made to files)
      --parser      The parser to use for parsing your source files (babel | babylon | flow)  [babel]
```

> Sorry, not for TypeScript!

----

## Chai and jest

```js
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const dirtyChai = require('dirty-chai');

chai.use(dirtyChai);

// Make sure chai and jasmine ".not" play nice together
const originalNot = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'not').get;
Object.defineProperty(chai.Assertion.prototype, 'not', {
  get() {
    Object.assign(this, this.assignedNot);
    return originalNot.apply(this);
  },
  set(newNot) {
    this.assignedNot = newNot;
    return newNot;
  },
});

// Combine both jest and chai matchers on expect
const originalExpect = global.expect;

global.expect = (actual) => {
  const originalMatchers = originalExpect(actual);
  const chaiMatchers = chai.expect(actual);
  const combinedMatchers = Object.assign(chaiMatchers, originalMatchers);
  return combinedMatchers;
};

```

- [Combining Chai and Jest matchers](https://medium.com/@RubenOostinga/combining-chai-and-jest-matchers-d12d1ffd0303)
- [Jest + Chai and expect.assertions](http://www.andrewsouthpaw.com/2017/05/12/jest-chai-and-expect-assertions/)

---

## Resources

- [Jest Snapshots and Beyond](https://www.youtube.com/watch?v=HAuXJVI_bUs)
- [Unit testing Angular applications with Jest](https://izifortune.com/unit-testing-angular-applications-with-jest/)
- [Test JavaScript with Jest from @kentcdodds on @eggheadio](https://egghead.io/lessons/javascript-test-javascript-with-jest)
- [Unlocking Test Performance — Migrating from Mocha to Jest](https://medium.com/airbnb-engineering/unlocking-test-performance-migrating-from-mocha-to-jest-2796c508ec50)

---

# The End :)


