"use strict";
var LoggingService = (function () {
    function LoggingService($log, toastr) {
        this.$log = $log;
        this.toastr = toastr;
    }
    LoggingService.prototype.info = function (message) {
        this.$log.info(message);
        toastr.info(message);
    };
    LoggingService.prototype.warn = function (message) {
        this.$log.warn(message);
        toastr.warning(message);
    };
    LoggingService.prototype.error = function (message) {
        this.$log.error(message);
        toastr.error(message);
    };
    LoggingService.prototype.debug = function (message) {
        this.$log.info(message);
    };
    LoggingService.$inject = ['$log'];
    return LoggingService;
}());
exports.LoggingService = LoggingService;
//# sourceMappingURL=logging.js.map