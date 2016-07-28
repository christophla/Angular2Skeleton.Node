"use strict";
function toTrustedFilter($sce) {
    return function (value) { return $sce.trustAsHtml(value); };
}
exports.toTrustedFilter = toTrustedFilter;
function htmlToPlainTextFilter() {
    return function (text) { return String(text).replace(/<[^>]+>/gm, ''); };
}
exports.htmlToPlainTextFilter = htmlToPlainTextFilter;
function nospaceFilter() {
    return function (value) { return ((!value) ? '' : value.replace(/ /g, '')); };
}
exports.nospaceFilter = nospaceFilter;
function humanizeDocFilter() {
    return function (doc) {
        if (!doc) {
            return undefined;
        }
        if (doc.type === 'directive') {
            return doc.name.replace(/([A-Z])/g, function ($1) {
                return "-" + $1.toLowerCase();
            });
        }
        return doc.label || doc.name;
    };
}
exports.humanizeDocFilter = humanizeDocFilter;
//# sourceMappingURL=basic.js.map