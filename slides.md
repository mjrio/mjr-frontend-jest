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
* Works with typescript & angular
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

## Jest Powerfull Mocking

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

----

## Jest Powerfull Mocking

#### Predefined mocks

Create a mock inside ```__mocks__``` folder

```bash
data/
    db.js
    __mocks__/
        db.js
```

```js
// db/__mocks__/db.js
export const db = {
    save: jest.fn()
}
```

When importing ```./data/db``` the mock will be loaded

```js
// userRepo.spec.js
import { db } from './data/db'

test('userRepo', async () => {
    const sut = new UserRepo();
    await sut.save(testUser)
    expect(db.save).toHaveBeenCalledWith(user)
})
```

No more accidental access to the DB

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

