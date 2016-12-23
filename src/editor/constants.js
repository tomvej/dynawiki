export const NAME = 'editor';

export const styles = {
    BOLD: 'BOLD',
    CODE: 'CODE',
    ITALIC: 'ITALIC',
};

export const styleChars = {
    '*': styles.BOLD,
    _: styles.ITALIC,
    '`': styles.CODE,
};

export const styleRegex = /\*|_|`/;

export const substitutions = {
    '--': 8212,
    '...': 8230,
    '->': 8594,
    '<-': 8592,
    '=>': 8658,
    '<=': 8656,
    '~': 160, // non-breakable space
};
