import {Trie, Stream, reverse} from '../util';
import {substitutions} from './constants';

const adjusted = Object.entries(substitutions)
    .map(([string, charCode]) => [reverse(string), String.fromCharCode(charCode)])
    .reduce(Stream.toObject, {});

export default Trie(adjusted);
