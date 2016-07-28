/// <reference path="../core.module.ts" />
var Core;
(function (Core) {
    function filterByTags() {
        return (items, tags) => {
            if (items.length === 0 || tags.length === 0) {
                return items;
            }
            var filtered = [];
            items.forEach(item => {
                var match = tags.every(tag => {
                    var tagExists = false;
                    item.tags.forEach(itemTag => {
                        if (itemTag.name === tag.name) {
                            tagExists = true;
                            return;
                        }
                    });
                    return tagExists;
                });
                if (match) {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    }
    function filterSingleByTags() {
        return (itemTags, tags) => {
            if (itemTags.length === 0 || tags.length === 0) {
                return undefined;
            }
            if (itemTags.length < tags.length) {
                return [];
            }
            var filtered = [];
            var match = tags.every(tag => {
                var tagExists = false;
                itemTags.forEach(itemTag => {
                    if (itemTag.name === tag.name) {
                        tagExists = true;
                        return;
                    }
                });
                return tagExists;
            });
            if (match) {
                filtered.push(itemTags);
            }
            return filtered;
        };
    }
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .filter('filterByTags', filterByTags)
        .filter('filterSingleByTags', filterSingleByTags);
})(Core || (Core = {}));
//# sourceMappingURL=tag.filter.js.map