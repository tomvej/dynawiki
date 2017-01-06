Block Styles
============

The editor is going to use the following block styles:
 * headings (starting from h1),
 * lists -- unordered, numbered and maybe even differently numbered (letters),
 * code block,
 * block quote,
 * unstyled (basic paragraph).
 
## Changing styles
Unstyled is the basic block type. Block type can be changed by:
 * using *Intentions*,
 * typing **control characters** at the start of the block (followed by space),
 * using `tab` and `shift+tab` shortcuts,
 * pressing `backspace` at the start of the block.
 
> Draft does not seem to support nested blocks, i.e. lists inside block quote.

> There is a problem with code block. Normally, code blocks are delineated
> at the beginning and at the end. However, that is more like the inline approach.

## Breaking Out
For some styles (headings) it makes no sense to span over consecutive blocks.
Thus, when you press `return` at the start or end of such block, the newly
created empty block will be _unstyled_. When splitting the block in the middle,
however both blocks retain their style.
 
## Lists
Blocks work very similar to how they work in most rich editors:
 1. typing `*_` at the start of a block changes it to unordered block.
 2. typing `#_` at the start of a block changes it to ordered block.
 3. typing `._` at the start of a block changes it to alphabetic ordered block.
 4. pressing `tab` increases block depth
    * unless it has no parent item of the same depth
 5. pressing `shift+tab` decreases block depth
    * unless it has depth of 0
    * when following blocks have greater depth, their depth must be collapsed
 6. pressing `backspace` at the start of a list item makes it unstyled
    * following items might have to be collapsed
 7. pressing `return` at the start of an empty list item makes it unstyled
 
The goal is for any block to have depth at most one greater than the previous.
 
> Draft js does not seem to allow list nesting, i.e. UL inside OL. I'll have to see about that.

## Headings
Headings are in a way similar to blocks. They have their **level** (H**1**, ...) which roughly
corresponds to list depth in such way that no heading should have level at most one greater
than the previous one. However, headings are most often surrounded by differently styled text.

 1. Typing `= ` at the start of a block changes it to headings of the same level as previous heading.
 2. Pressing `tab` increases heading level (up to h7)
    * unless previous heading has lower level
 3. Pressing `shift+tab` decreases heading level (up to h1)
    * when following headings have greater level, they must be collapsed
 4. Pressing `backspace` at the start of a heading changes it to unstyled

## Collapsing Headings and Lists
There is a basic rule about lists and headers -- it makes no sense for list item to be two levels
deeper than the previous one. Similarly, it makes no sense to follow a H1 by a H3 without H2 in between.

When decreasing depth/level of lists/headings, sometimes, the following list items/headings
must be collapsed, i.e. their level/depth must be decreased to keep this invariant.

> This, however, might mean big changes to editor state which the user might not want.
I can think of several ways of notifying him/her:
> * disallow it
> * do it and expect the user will notice (and optionally undo it)
> * make it more difficult by requiring the user to press `shift+tab` twice in quick succession
> 
> Each of the previous ways can be enhanced by a notification 

## Multiple-block Styles
Code block as it is implemented most of the time works very similar to inline styles
-- it is delineated at the start and at the end. This is due to it naturally spanning
over several consecutive blocks. Blockquote usually works in a similar way.

> I can also imagine several similar styles -- frames, blocks, etc.

TBD
