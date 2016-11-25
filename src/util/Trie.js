import {Record, Map} from 'immutable';

const E = Symbol('$');

class Trie extends Record({data: Map(), length: 0}) {
    find(key) {
        return this.data.getIn(key.split('').concat(E));
    }
    findPrefixes(key) {
        const prefixes = (root, result, prefix, suffix) => {
            if (!root) {
                return result;
            }

            if (root.get(E)) {
                result.push({key: prefix, value: root.get(E)});
            }

            if (suffix) {
                const char = suffix.slice(0, 1);
                return prefixes(root.get(char), result, prefix + char, suffix.slice(1));
            } else {
                return result;
            }
        };
        return prefixes(this.data, [], '', key);
    }
    hasPrefix(prefix) {
        return this.data.hasIn(prefix.split(''));
    }
}

const convertData = (data) => Object.keys(data).reduce((result, key) => result.setIn(key.split('').concat(E), data[key]), Map());

const max = (data) => Object.keys(data).map((key) => key.length).reduce((result, length) => Math.max(result, length), 0);

export default (data) => new Trie({data: convertData(data), length: max(data)});
