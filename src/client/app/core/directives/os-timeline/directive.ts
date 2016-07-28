﻿

export function OsTimelineController() {
    var vm = this;

    // Data
    vm.scrollEl = undefined;

    // Methods
    vm.setScrollEl = setScrollEl;
    vm.getScrollEl = getScrollEl;

    //////////

    /**
     * Set scroll element
     *
     * @param scrollEl
     */
    function setScrollEl(scrollEl: any) {
        vm.scrollEl = scrollEl;
    }

    /**
     * Get scroll element
     *
     * @returns {undefined|*}
     */
    function getScrollEl() {
        return vm.scrollEl;
    }
}

export function osTimelineDirective() {
    return {
        scope: {
            loadMore: '&?osTimelineLoadMore'
        },
        controller: 'OsTimelineController',
        compile(tElement) {
            tElement.addClass('ms-timeline');

            return (scope, iElement, iAttrs, MsTimelineCtrl) => {
                // Create an element for triggering the load more action and append it
                var loadMoreEl = angular.element('<div class="ms-timeline-loader md-accent-bg md-whiteframe-4dp"><span class="spinner animate-rotate"></span></div>');
                iElement.append(loadMoreEl);

                // Grab the scrollable element and store it in the controller for general use
                var scrollEl = angular.element('#content');
                MsTimelineCtrl.setScrollEl(scrollEl);

                // Threshold
                var threshold = 144;

                // Register onScroll event for the first time
                registerOnScroll();

                /**
                 * onScroll Event
                 */
                function onScroll() {
                    if (scrollEl.scrollTop() + scrollEl.height() + threshold > loadMoreEl.position().top) {
                        // Show the loader
                        loadMoreEl.addClass('show');

                        // Unregister scroll event to prevent triggering the function over and over again
                        unregisterOnScroll();

                        // Trigger load more event
                        scope.loadMore().then(
                            // Success
                            () => {
                                // Hide the loader
                                loadMoreEl.removeClass('show');

                                // Register the onScroll event again
                                registerOnScroll();
                            },

                            // Error
                            () => {
                                // Remove the loader completely
                                loadMoreEl.remove();
                            }
                        );
                    }
                }

                /**
                 * onScroll event registerer
                 */
                function registerOnScroll() {
                    scrollEl.on('scroll', onScroll);
                }

                /**
                 * onScroll event unregisterer
                 */
                function unregisterOnScroll() {
                    scrollEl.off('scroll', onScroll);
                }

                // Cleanup
                scope.$on('$destroy', () => {
                    unregisterOnScroll();
                });
            };
        }
    };
}

/** @ngInject */
export function osTimelineItemDirective($timeout: any, $q: any) {
    return {
        scope: true,
        require: '^osTimeline',
        compile(tElement) {
            tElement.addClass('ms-timeline-item').addClass('hidden');

            return (scope, iElement, iAttrs, MsTimelineCtrl) => {
                var threshold = 72,
                    itemLoaded = false,
                    itemInViewport = false,
                    scrollEl = MsTimelineCtrl.getScrollEl();

                //////////

                init();

                /**
                 * Initialize
                 */
                function init() {
                    // Check if the timeline item has os-card
                    if (iElement.find('os-card')) {
                        // If the os-card template loaded...
                        scope.$on('osCard::cardTemplateLoaded', (event, args) => {
                            var cardEl = angular.element(args[0]);

                            // Test the card to see if there is any image on it
                            testForImage(cardEl).then(() => {
                                $timeout(() => {
                                    itemLoaded = true;
                                });
                            });
                        });
                    } else {
                        // Test the element to see if there is any image on it
                        testForImage(iElement).then(() => {
                            $timeout(() => {
                                itemLoaded = true;
                            });
                        });
                    }

                    // Check if the loaded element also in the viewport
                    scrollEl.on('scroll', testForVisibility);

                    // Test for visibility for the first time without waiting for the scroll event
                    testForVisibility();
                }

                // Item ready watcher
                var itemReadyWatcher = scope.$watch(
                    () => (itemLoaded && itemInViewport),
                    (current, old) => {
                        if (angular.equals(current, old)) {
                            return;
                        }

                        if (current) {
                            iElement.removeClass('hidden').addClass('animate');

                            // Unbind itemReadyWatcher
                            itemReadyWatcher();
                        }
                    }, true);

                /**
                 * Test the given element for image
                 *
                 * @param element
                 * @returns promise
                 */
                function testForImage(element: any) {
                    var deferred = $q.defer(),
                        imgEl = element.find('img');

                    if (imgEl.length > 0) {
                        imgEl.on('load', () => {
                            deferred.resolve('Image is loaded');
                        });
                    } else {
                        deferred.resolve('No images');
                    }

                    return deferred.promise;
                }

                /**
                 * Test the element for visibility
                 */
                function testForVisibility() {
                    if (scrollEl.scrollTop() + scrollEl.height() > iElement.position().top + threshold) {
                        $timeout(() => {
                            itemInViewport = true;
                        });

                        // Unbind the scroll event
                        scrollEl.off('scroll', testForVisibility);
                    }
                }
            };
        }
    };
}

