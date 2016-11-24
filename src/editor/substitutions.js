const substitutions = {
    '--': String.fromCharCode(8211),
    '...': String.fromCharCode(8230),
    '->': String.fromCharCode(8594),
    '<-': String.fromCharCode(8592),
    '=>': String.fromCharCode(8658),
    '<=': String.fromCharCode(8656),
    '~': String.fromCharCode(160),
};

export const limit = Object.keys(substitutions).map((sub) => sub.length).reduce((top, number) => Math.max(top, number));

export default substitutions;
