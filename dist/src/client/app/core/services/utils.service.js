/// <reference path="../core.module.ts" />
var Core;
(function (Core) {
    /**
    * Application utilities implementation
    */
    class Utils {
        /**
         * Constructor
         * @param $window The window service
         */
        constructor($window) {
            this.$window = $window;
            this.browserInfo = null;
            this.mobileDetect = new MobileDetect($window.navigator.userAgent);
        }
        /**
         * Check if item exists in a list
         *
         * @param item
         * @param list
         * @returns {boolean}
         */
        exists(item, list) {
            return list.indexOf(item) > -1;
        }
        /**
         * Returns browser information
         * from user agent data
         *
         * Found at http://www.quirksmode.org/js/detect.html
         * but modified and updated to fit for our needs
         */
        detectBrowser() {
            // If we already tested, do not test again
            if (this.browserInfo) {
                return this.browserInfo;
            }
            var browserData = [
                {
                    string: this.$window.navigator.userAgent,
                    subString: 'Edge',
                    versionSearch: 'Edge',
                    identity: 'Edge'
                },
                {
                    string: this.$window.navigator.userAgent,
                    subString: 'Chrome',
                    identity: 'Chrome'
                },
                {
                    string: this.$window.navigator.userAgent,
                    subString: 'OmniWeb',
                    versionSearch: 'OmniWeb/',
                    identity: 'OmniWeb'
                },
                {
                    string: this.$window.navigator.vendor,
                    subString: 'Apple',
                    versionSearch: 'Version',
                    identity: 'Safari'
                },
                //{
                //    prop: this.$window.opera,
                //    identity: 'Opera'
                //},
                {
                    string: this.$window.navigator.vendor,
                    subString: 'iCab',
                    identity: 'iCab'
                },
                {
                    string: this.$window.navigator.vendor,
                    subString: 'KDE',
                    identity: 'Konqueror'
                },
                {
                    string: this.$window.navigator.userAgent,
                    subString: 'Firefox',
                    identity: 'Firefox'
                },
                {
                    string: this.$window.navigator.vendor,
                    subString: 'Camino',
                    identity: 'Camino'
                },
                {
                    string: this.$window.navigator.userAgent,
                    subString: 'Netscape',
                    identity: 'Netscape'
                },
                {
                    string: this.$window.navigator.userAgent,
                    subString: 'MSIE',
                    identity: 'Explorer',
                    versionSearch: 'MSIE'
                },
                {
                    string: this.$window.navigator.userAgent,
                    subString: 'Trident/7',
                    identity: 'Explorer',
                    versionSearch: 'rv'
                },
                {
                    string: this.$window.navigator.userAgent,
                    subString: 'Gecko',
                    identity: 'Mozilla',
                    versionSearch: 'rv'
                },
                {
                    string: this.$window.navigator.userAgent,
                    subString: 'Mozilla',
                    identity: 'Netscape',
                    versionSearch: 'Mozilla'
                }
            ];
            var osData = [
                {
                    string: this.$window.navigator.platform,
                    subString: 'Win',
                    identity: 'Windows'
                },
                {
                    string: this.$window.navigator.platform,
                    subString: 'Mac',
                    identity: 'Mac'
                },
                {
                    string: this.$window.navigator.platform,
                    subString: 'Linux',
                    identity: 'Linux'
                },
                {
                    string: this.$window.navigator.platform,
                    subString: 'iPhone',
                    identity: 'iPhone'
                },
                {
                    string: this.$window.navigator.platform,
                    subString: 'iPod',
                    identity: 'iPod'
                },
                {
                    string: this.$window.navigator.platform,
                    subString: 'iPad',
                    identity: 'iPad'
                },
                {
                    string: this.$window.navigator.platform,
                    subString: 'Android',
                    identity: 'Android'
                }
            ];
            var versionSearchString = '';
            function searchString(data) {
                for (var i = 0; i < data.length; i++) {
                    var dataString = data[i].string;
                    var dataProp = data[i].prop;
                    versionSearchString = data[i].versionSearch || data[i].identity;
                    if (dataString) {
                        if (dataString.indexOf(data[i].subString) !== -1) {
                            return data[i].identity;
                        }
                    }
                    else if (dataProp) {
                        return data[i].identity;
                    }
                }
                return undefined;
            }
            function searchVersion(dataString) {
                var index = dataString.indexOf(versionSearchString);
                if (index === -1) {
                    return undefined;
                }
                return parseInt(dataString.substring(index + versionSearchString.length + 1));
            }
            var browser = searchString(browserData) || 'unknown-browser';
            var version = searchVersion(this.$window.navigator.userAgent) || searchVersion(this.$window.navigator.appVersion) || 'unknown-version';
            var os = searchString(osData) || 'unknown-os';
            // Prepare and store the object
            browser = browser.toLowerCase();
            version = browser + '-' + version;
            os = os.toLowerCase();
            this.browserInfo = {
                browser: browser,
                version: version,
                os: os
            };
            return this.browserInfo;
        }
        /**
         * Generates a globally unique id
         *
         * @returns {*}
         */
        guidGenerator() {
            var S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            return (S4() + S4() + S4() + S4() + S4() + S4());
        }
        /**
         * Return if current device is a
         * mobile device or not
         */
        isMobile() {
            return this.mobileDetect.mobile();
        }
        /**
         * Toggle in array (push or splice)
         *
         * @param item
         * @param array
         */
        toggleInArray(item, array) {
            if (array.indexOf(item) === -1) {
                array.push(item);
            }
            else {
                array.splice(array.indexOf(item), 1);
            }
        }
    }
    Utils.$inject = ['$window'];
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .service('osUtils', Utils);
})(Core || (Core = {}));
//# sourceMappingURL=utils.service.js.map