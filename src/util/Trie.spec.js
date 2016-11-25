import {expect} from 'chai';

import Trie from './Trie';

describe('Trie', () => {
    const empty = Trie({});
    describe('length', () => {
        it('is 0 for empty Trie', () => {
            empty.should.have.lengthOf(0);
        });
        it('is maximum key length', () => {
            Trie({
                qua: 2,
                qwrge: 4,
                rq: 1,
                t: 2,
            }).should.have.lengthOf(5);
        });
    });
    const trie = Trie({key: 15});
    const doubleTrie = Trie({
        keypad: 25,
        keystone: 13,
    });
    const prefixTrie = Trie({
        key: 15,
        keystone: 20,
    });
    describe('find', () => {
        it('returns undefined for empty trie', () => {
            expect(empty.find('key')).to.be.undefined();
        });
        it('returns value for existing key', () => {
            trie.find('key').should.equal(15);
        });
        it('returns value for both existing keys', () => {
            doubleTrie.find('keypad').should.equal(25);
            doubleTrie.find('keystone').should.equal(13);
        });
        it('returns undefined for non-existing key', () => {
            expect(trie.find('baf')).to.be.undefined();
        });
        it('returns undefined for existing key prefix', () => {
            expect(trie.find('ke')).to.be.undefined();
        });
        it('returns undefined for existing key plus characters', () => {
            expect(trie.find('keys')).to.be.undefined();
        });
        it('returns key value when there is a key and its prefix', () => {
            prefixTrie.find('keystone').should.equal(20);
        });
    });
    describe('findPrefix', () => {
        it('returns undefined for empty trie', () => {
            expect(empty.findPrefix('key')).to.be.undefined();
        });
        it('returns value for existing key', () => {
            trie.findPrefix('key').should.equal(15);
        });
        it('returns value for both existing keys', () => {
            doubleTrie.findPrefix('keypad').should.equal(25);
            doubleTrie.findPrefix('keystone').should.equal(13);
        });
        it('returns undefined for non-existing key', () => {
            expect(trie.findPrefix('baf')).to.be.undefined();
        });
        it('returns undefined for existing key prefix', () => {
            expect(trie.findPrefix('ke')).to.be.undefined();
        });
        it('returns value for existing key plus characters', () => {
            trie.findPrefix('keys').should.equal(15);
        });
        it('returns key value when there is a key and its prefix', () => {
            prefixTrie.findPrefix('keystone').should.equal(20);
        });
    });
});
