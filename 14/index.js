export function map(mapper, input) {
    if (arguments.length === 0) {
        return map;
    }
    if (arguments.length === 1) {
        return (subInput) => subInput.map(mapper);
    }
    return input.map(mapper);
}
map;
export function filter(filterer, input) {
    if (arguments.length === 0) {
        return filter;
    }
    if (arguments.length === 1) {
        return (subInput) => subInput.filter(filterer);
    }
    return input.filter(filterer);
}
filter;
export function reduce(reducer, initialValue, input) {
    if (arguments.length === 0) {
        return reduce;
    }
    if (arguments.length === 1) {
        return (subInitialValue, subInput) => subInput.reduce(reducer, subInitialValue);
    }
    if (arguments.length === 2) {
        return (subInput) => subInput.reduce(reducer, initialValue);
    }
    return input.reduce(reducer, initialValue);
}
reduce;
export function add(a, b) {
    if (arguments.length === 0) {
        return add;
    }
    if (arguments.length === 1) {
        return (subB) => a + subB;
    }
    return a + b;
}
add;
export function subtract(a, b) {
    if (arguments.length === 0) {
        return subtract;
    }
    if (arguments.length === 1) {
        return (subB) => a - subB;
    }
    return a - b;
}
subtract;
export function pipe(...functions) {
    if (functions.length === 0) {
        return pipe;
    }
    return function subFunction(...args) {
        let result = functions[0](...args);
        for (let i = 1; i < functions.length; i++) {
            result = functions[i](result);
        }
        return result;
    };
}
pipe;
export function prop(obj, propName) {
    if (arguments.length === 0) {
        return prop;
    }
    if (arguments.length === 1) {
        return (subPropName) => obj[subPropName];
    }
    return obj[propName];
}
prop;
