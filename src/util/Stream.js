export default {
    /**
     * Reducer function for creating object from entry array (obtained by Object.entries())
     * @example
     * Object.entries({a: 2, b: 3}).map(([key, value]) => [key, value + 1]).reduce(Stream.toObject, {}); // {a: 3, b: 4}
     * */
    toObject: (result, [key, value]) => Object.assign({[key]: value}, result),
};
