"use strict";
/**
 * Navigation service implementation
 */
class NavigationService {
    constructor(provider, navigation, $log) {
        this.provider = provider;
        this.navigation = navigation;
        this.$log = $log;
        this.activeItem = null;
        this.folded = null;
        this.foldedOpen = null;
        this.navigationScope = null;
    }
    /**
     * Deletes an item
     * @param path
     */
    deleteItem(path) {
        return this.provider.deleteItem(path);
    }
    /**
     * Saves an item
     * @param path
     * @param item
     */
    saveItem(path, item) {
        this.provider.saveItem(path, item);
    }
    /**
     * Sorts by the parent
     * @param parent
     */
    sort(parent) {
        this.provider.sort(parent);
    }
    /**
    * Set active item
    *
    * @param node
    * @param scope
    */
    setActiveItem(node, scope) {
        this.activeItem = {
            node: node,
            scope: scope
        };
    }
    /**
     * Return active item
     */
    getActiveItem() {
        return this.activeItem;
    }
    /**
     * Return navigation object
     *
     * @param root
     * @returns {Array}
     */
    getNavigationObject(root) {
        if (root) {
            for (var i = 0; i < this.navigation.length; i++) {
                if (this.navigation[i]._id === root) {
                    return [this.navigation[i]];
                }
            }
        }
        return this.navigation;
    }
    /**
     * Store navigation's scope for later use
     *
     * @param scope
     */
    setNavigationScope(scope) {
        this.navigationScope = scope;
    }
    /**
     * Set folded status
     *
     * @param status
     */
    setFolded(status) {
        this.folded = status;
    }
    /**
     * Return folded status
     *
     * @returns {*}
     */
    getFolded() {
        return this.folded;
    }
    /**
     * Set folded open status
     *
     * @param status
     */
    setFoldedOpen(status) {
        this.foldedOpen = status;
    }
    /**
     * Return folded open status
     *
     * @returns {*}
     */
    getFoldedOpen() {
        return this.foldedOpen;
    }
    /**
     * Toggle fold on stored navigation's scope
     */
    toggleFolded() {
        this.navigationScope.toggleFolded();
    }
}
exports.NavigationService = NavigationService;
/**
 * Navigation service provider implementation
 */
class NavigationServiceProvider {
    constructor() {
        this.navigation = [];
        this.$log = angular.injector(['ng']).get('$log');
    }
    /**
    * Create or update the navigation item
    *
    * @param path
    * @param item
    */
    saveItem(path, item) {
        if (!angular.isString(path)) {
            this.$log.error('path must be a string (eg. `REPORT.project`)');
            return;
        }
        var parts = path.split('.');
        // Generate the object id from the parts
        var id = parts[parts.length - 1];
        // Get the parent item from the parts
        var parent = this.findOrCreateParent(parts);
        // Decide if we are going to update or create
        var updateItem = undefined;
        for (var i = 0; i < parent.length; i++) {
            if (parent[i]._id === id) {
                updateItem = parent[i];
                break;
            }
        }
        // Update
        if (updateItem) {
            angular.extend(updateItem, item);
            // Add proper ui-sref
            updateItem.uisref = this.getUiSref(updateItem);
        }
        else {
            // Create an empty children array in the item
            item.children = [];
            // Add the default weight if not provided or if it's not a number
            if (angular.isUndefined(item.weight) || !angular.isNumber(item.weight)) {
                item.weight = 1;
            }
            // Add the item id
            item._id = id;
            // Add the item path
            item._path = path;
            // Add proper ui-sref
            item.uisref = this.getUiSref(item);
            // Push the item into the array
            parent.push(item);
        }
    }
    /**
     * Delete navigation item
     *
     * @param path
     */
    deleteItem(path) {
        if (!angular.isString(path)) {
            this.$log.error('path must be a string (eg. `REPORT.project`)');
            return undefined;
        }
        // Locate the item by using given path
        var item = this.navigation, parts = path.split('.');
        for (var p = 0; p < parts.length; p++) {
            var id = parts[p];
            for (var i = 0; i < item.length; i++) {
                if (item[i]._id === id) {
                    // If we have a matching path,
                    // we have found our object:
                    // remove it.
                    if (item[i]._path === path) {
                        item.splice(i, 1);
                        return true;
                    }
                    // Otherwise grab the children of
                    // the current item and continue
                    item = item[i].children;
                    break;
                }
            }
        }
        return false;
    }
    /**
     * Service
     */
    $get($log) {
        return new NavigationService(this, this.navigation, $log);
    }
    /**
     * Sort the navigation items by their weights
     *
     * @param parent
     */
    sort(parent) {
        // If parent not provided, sort the root items
        if (!parent) {
            parent = this.navigation;
            parent.sort(this.byWeight);
        }
        // Sort the children
        for (var i = 0; i < parent.length; i++) {
            var children = parent[i].children;
            if (children.length > 1) {
                children.sort(this.byWeight);
            }
            if (children.length > 0) {
                this.sort(children);
            }
        }
    }
    /**
     * Find or create parent
     *
     * @param parts
     * @returns {Array|Boolean}
     * @private
     */
    findOrCreateParent(parts) {
        // Store the main navigation
        var parent = this.navigation;
        // If it's going to be a root item
        // return the navigation itself
        if (parts.length === 1) {
            return parent;
        }
        // Remove the last element from the parts as
        // we don't need that to figure out the parent
        parts.pop();
        // Find and return the parent
        for (var i = 0; i < parts.length; i++) {
            var id = parts[i], createParent = true;
            for (var p = 0; p < parent.length; p++) {
                if (parent[p]._id === id) {
                    parent = parent[p].children;
                    createParent = false;
                    break;
                }
            }
            // If there is no parent found, create one, push
            // it into the current parent and assign it as a
            // new parent
            if (createParent) {
                var item = {
                    _id: id,
                    _path: parts.join('.'),
                    children: [],
                    title: id,
                    weight: 1
                };
                parent.push(item);
                parent = item.children;
            }
        }
        return parent;
    }
    /**
     * Sort by weight
     *
     * @param x
     * @param y
     * @returns {number}
     * @private
     */
    byWeight(x, y) {
        return parseInt(x.weight, 10) - parseInt(y.weight, 10);
    }
    /**
     * Setup the ui-sref using state & state parameters
     *
     * @param item
     * @returns {string}
     * @private
     */
    getUiSref(item) {
        var uisref = '';
        if (angular.isDefined(item.state)) {
            uisref = item.state;
            if (angular.isDefined(item.stateParams) && angular.isObject(item.stateParams)) {
                // uisref = uisref + '(' + angular.toString(item.stateParams) + ')'; //TODO: Fix state params stringify (cpt)
                uisref = uisref + '(' + item.stateParams.toString() + ')';
            }
        }
        return uisref;
    }
}
exports.NavigationServiceProvider = NavigationServiceProvider;
//# sourceMappingURL=service.js.map