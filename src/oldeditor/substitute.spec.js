import {reverse} from '../util';
import {substitutions} from './constants';

describe('character substitutions', () => {
    it('contain no two strings where one is a suffix of the other', () => {
        const reverseSorted = Object.keys(substitutions).map(reverse).sort();
        for (let i = 1; i < reverseSorted.length; i += 1) {
            reverseSorted[i].startsWith(reverseSorted[i - 1]).should.be.false(`${reverse(reverseSorted[i - 1])} is a suffix of ${reverse(reverseSorted[i])}`);
        }
    });
});
