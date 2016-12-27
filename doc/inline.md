Inline Styles
=============

There are three inline styles:
 * **Bold**,
 * *Italic*,
 * `code`

We won't definitely use underlined or strike-through

## Control characters
Besides actually styling the text, editor will distinguish them
by enclosing them by **control characters**:
 * \* for bold (\***Bold**\*)
 * _  for italics (\_*Italic*\_)
 * \` for code (\`\``code`\`)

> It would be nice for control characters to have different style,
> e.g. be gray or something like that.

## Changing styles
There are several ways of applying styles to text:
 * Actually writing the _control character_. Ideally,
    this should work in such a way that the user writes
    the first control character, editor should start using
    the appropriate style
 * Keyboard shortcuts (such as CTRL+B for bold).
    * Non-collapsed selection -- selection is enclosed by control characters.
    * Collapsed selection -- prints control character.
 * Using *Intentions* -- this works similar to keyboard shortcuts.
    
> Ideally, there should be no buttons.

## Labelled list items
Quite often, I use definition lists, e.g.:
> * **Code:** short fragment of code

When a semi-colon (:) is used near a start of a list item,
before the first comma or period (or other punctuation mark),
the text preceding the semi-colon will be bold.

> There is a `<dl>` tag for definition lists, I am, however,
> quite certain it would be difficult to write in Draft.

## Implementation notes
Mostly, I recommend using inline styles. The other approach is using
decorators. Decorators are nice because you can use format the whole
range using React component. However, they cannot be nested or overlapped.
Sometimes it might make sense to use decorators. 
