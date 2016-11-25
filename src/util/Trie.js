import {Record, Map} from 'immutable';

const E = Symbol('$');

class Trie extends Record({data: Map(), length: 0}) {
    find(key) {
        return this.data.getIn(key.split('').concat(E));
    }
    findPrefix(key) {
        let root = this.data;
        const iterator = key.split('')[Symbol.iterator]();

        let {done, value} = iterator.next();
        while (!done && root.get(value)) {
            root = root.get(value);
            ({done, value} = iterator.next());
        }
        return root.get(E);
    }
}

const convertData = (data) => Object.keys(data).reduce((result, key) => result.setIn(key.split('').concat(E), data[key]), Map());

const max = (data) => Object.keys(data).map((key) => key.length).reduce((result, length) => Math.max(result, length), 0);

export default (data) => new Trie({data: convertData(data), length: max(data)});
