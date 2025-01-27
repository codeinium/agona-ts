/*

Intro:

    For some unknown reason most of our developers left
    the company. We need to actively hire now.
    In the media we've read that companies that invent
    and publish new technologies attract more potential
    candidates. We need to use this opportunity and
    invent and publish some npm packages. Following the
    new trend of functional programming in JS we
    decided to develop a functional utility library.
    This will put us on the bleading edge since we are
    pretty much sure no one else did anything similar.
    We also provided some jsdoc along with the
    functions, but it might sometimes be inaccurate.

Exercise:

    Provide proper typing for the specified functions.

Bonus:

    Could you please also refactor the code to reduce
    code duplication?
    You might need some excessive type casting to make
    it really short.

*/
/**
 * 2 arguments passed: returns a new array
 * which is a result of input being mapped using
 * the specified mapper.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being mapped using original mapper.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} mapper
 * @param {Array} input
 * @return {Array | Function}
 */
export interface MapOverload {
    <T, U>(mapper: (value: T) => U, input: T[]): U[];
    <T, U>(mapper: (value: T) => U): (input: T[]) => U[];
    (): typeof map;
}

export function map<T, U>(
    mapper?: (value: T) => U,
    input?: T[]
): U[] | ((input: T[]) => U[]) | typeof map {
    if (arguments.length === 0) {
        return map as any;
    }
    if (arguments.length === 1) {
        return (subInput: T[]) => subInput.map(mapper as (value: T) => U);
    }
    return input!.map(mapper as (value: T) => U);
} (map as MapOverload);

/**
 * 2 arguments passed: returns a new array
 * which is a result of input being filtered using
 * the specified filter function.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being filtered using original filter
 * function.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} filterer
 * @param {Array} input
 * @return {Array | Function}
 */
export interface FilterOverload {
    <T>(filterer: (value: T) => boolean, input: T[]): T[];
    <T>(filterer: (value: T) => boolean): (input: T[]) => T[];
    (): typeof filter;
}

export function filter<T>(
    filterer?: (value: T) => boolean,
    input?: T[]
): T[] | ((input: T[]) => T[]) | typeof filter {
    if (arguments.length === 0) {
        return filter as any;
    }
    if (arguments.length === 1) {
        return (subInput: T[]) => subInput.filter(filterer!);
    }
    return input!.filter(filterer!);
} (filter as FilterOverload);

/**
 * 3 arguments passed: reduces input array it using the
 * specified reducer and initial value and returns
 * the result.
 *
 * 2 arguments passed: returns a function which accepts
 * input array and reduces it using previously specified
 * reducer and initial value and returns the result.
 *
 * 1 argument passed: returns a function which:
 *   * when 2 arguments is passed to the subfunction, it
 *     reduces the input array using specified initial
 *     value and previously specified reducer and returns
 *     the result.
 *   * when 1 argument is passed to the subfunction, it
 *     returns a function which expects the input array
 *     and reduces the specified input array using
 *     previously specified reducer and inital value.
 *   * when 0 argument is passed to the subfunction, it
 *     returns itself.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} reducer
 * @param {*} initialValue
 * @param {Array} input
 * @return {* | Function}
 */
export interface ReduceOverload {
    <T, U>(reducer: (accumulator: U, currentValue: T) => U, initialValue: U, input: T[]): U;
    <T, U>(reducer: (accumulator: U, currentValue: T) => U, initialValue: U): (input: T[]) => U;
    <T, U>(reducer: (accumulator: U, currentValue: T) => U): (initialValue: U, input: T[]) => U | ((input: T[]) => U);
    (): typeof reduce;
}

export function reduce<T, U>(
    reducer?: (accumulator: U, currentValue: T) => U,
    initialValue?: U,
    input?: T[]
): U | ((initialValue: U, input: T[]) => U) | ((input: T[]) => U) | typeof reduce {
    if (arguments.length === 0) {
        return reduce as any;
    }
    if (arguments.length === 1) {
        return (subInitialValue: U, subInput: T[]) => subInput.reduce(reducer!, subInitialValue);
    }
    if (arguments.length === 2) {
        return (subInput: T[]) => subInput.reduce(reducer!, initialValue!);
    }
    return input!.reduce(reducer!, initialValue!);
} (reduce as ReduceOverload);

/**
 * 2 arguments passed: returns sum of a and b.
 *
 * 1 argument passed: returns a function which expects
 * b and returns sum of a and b.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number | Function}
 */
export interface AddOverload {
    (a: number, b: number): number;
    (a: number): (b: number) => number;
    (): typeof add;
}

export function add(a?: number, b?: number): number | ((b: number) => number) | typeof add {
    if (arguments.length === 0) {
        return add as any;
    }
    if (arguments.length === 1) {
        return (subB: number) => a! + subB;
    }
    return a! + b!;
} (add as AddOverload);

/**
 * 2 arguments passed: subtracts b from a and
 * returns the result.
 *
 * 1 argument passed: returns a function which expects
 * b and subtracts b from a and returns the result.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number | Function}
 */
export interface SubtractOverload {
    (a: number, b: number): number;
    (a: number): (b: number) => number;
    (): typeof subtract;
}

export function subtract(a?: number, b?: number): number | ((b: number) => number) | typeof subtract {
    if (arguments.length === 0) {
        return subtract as any;
    }
    if (arguments.length === 1) {
        return (subB: number) => a! - subB;
    }
    return a! - b!;
} (subtract as SubtractOverload);

/**
 * >0 arguments passed: expects each argument to be
 * a function. Returns a function which accepts the
 * same arguments as the first function. Passes these
 * arguments to the first function, the result of
 * the first function passes to the second function,
 * the result of the second function to the third
 * function... and so on. Returns the result of the
 * last function execution.
 *
 * 0 arguments passed: returns itself.
 *
 * TODO TypeScript
 *   * Should properly handle at least 5 arguments.
 *   * Should also make sure argument of the next
 *     function matches the return type of the previous
 *     function.
 *
 * @param {Function[]} functions
 * @return {*}
 */
export interface PipeOverload {
    (...functions: Function[]): (...args: any[]) => any;
    (): typeof pipe;
}

export function pipe(...functions: Function[]): (...args: any[]) => any {
    if (functions.length === 0) {
        return pipe as any;
    }
    return function subFunction(...args: any[]) {
        let result = functions[0](...args);
        for (let i = 1; i < functions.length; i++) {
            result = functions[i](result);
        }
        return result;
    };
} (pipe as PipeOverload);

/**
 * 2 arguments passed: returns value of property
 * propName of the specified object.
 *
 * 1 argument passed: returns a function which expects
 * propName and returns value of property propName
 * of the specified object.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Object} obj
 * @param {String} propName
 * @return {* | Function}
 */
export interface PropOverload {
    <T, K extends keyof T>(obj: T, propName: K): T[K];
    <T>(obj: T): <K extends keyof T>(propName: K) => T[K];
    (): typeof prop;
}

export function prop<T, K extends keyof T>(
    obj?: T,
    propName?: K
): T[K] | ((propName: K) => T[K]) | typeof prop {
    if (arguments.length === 0) {
        return prop as any;
    }
    if (arguments.length === 1) {
        return (subPropName: K) => obj![subPropName];
    }
    return obj![propName!];
} (prop as PropOverload);