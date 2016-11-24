const substitutions = {
    '--': '&mdash;',
    '...': '&hellip;',
    '->': '&rarr;',
    '<-': '&larr;',
    '=>': '&rArr;',
    '<=': '&lArr;',
    '~': '&nbsp;',
};

export const limit = Object.keys(substitutions).map((sub) => sub.length).reduce((top, number) => Math.max(top, number));

export default substitutions;
