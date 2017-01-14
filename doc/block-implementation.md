Block Style Implementation
==========================

There are several editor component handlers which will be use to change block style.

## handleBeforeInput
_Only when going from block start and consisting of control characters._
1. Delete control characters.
2. Collapse _lists_ or _headings_.
3. Set new block type.
> Selection should be at block start.

## onTab
_Only headings or lists._
* `tab` -- increase depth:
    1. Check that previous item has same depth.
    2. Increase depth.
* `shift+tab` -- decrease depth:
    1. Collapse next items.
    2. Decrease depth.
> Selection should stay.

## handleReturn
_Block is empty:_
1. Collapse _lists_ or _headings_.
2. Convert to _unstyled_.
> Selection should stay at start of block

_Block is **heading** and selection is at start of block:_
1. Create empty _unstyled_ block (**breakout**).
> Selection should be at start of the new block.

Split block otherwise (default behaviour).

## handleKeyCommand -- backspace
1. Check whether at start of block.
2. Collapse _lists_ or _headings_.
3. Change style to _unstyled_.
> Selection should stay.

## handleChange
Could be used to regenerate extra block map or do something similar.
Doesn't have to be used to change anything.
