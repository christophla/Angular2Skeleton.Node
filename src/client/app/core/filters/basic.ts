
export function toTrustedFilter($sce: ng.ISCEService) {
    return value => $sce.trustAsHtml(value);
}

export function htmlToPlainTextFilter() {
    return text => String(text).replace(/<[^>]+>/gm, '');
}

export function nospaceFilter() {
    return value => ((!value) ? '' : value.replace(/ /g, ''));
}

export function humanizeDocFilter() {
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
