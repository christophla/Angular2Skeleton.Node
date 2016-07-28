"use strict";
function toTrustedFilter($sce) {
    return value => $sce.trustAsHtml(value);
}
exports.toTrustedFilter = toTrustedFilter;
function htmlToPlainTextFilter() {
    return text => String(text).replace(/<[^>]+>/gm, '');
}
exports.htmlToPlainTextFilter = htmlToPlainTextFilter;
function nospaceFilter() {
    return value => ((!value) ? '' : value.replace(/ /g, ''));
}
exports.nospaceFilter = nospaceFilter;
function humanizeDocFilter() {
    return doc => {
        if (!doc) {
            return undefined;
        }
        if (doc.type === 'directive') {
            return doc.name.replace(/([A-Z])/g, ($1) => {
                return `-${$1.toLowerCase()}`;
            });
        }
        return doc.label || doc.name;
    };
}
exports.humanizeDocFilter = humanizeDocFilter;
//# sourceMappingURL=basic.filter.js.map