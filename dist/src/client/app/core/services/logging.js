"use strict";
class LoggingService {
    constructor($log, toastr) {
        this.$log = $log;
        this.toastr = toastr;
    }
    info(message) {
        this.$log.info(message);
        toastr.info(message);
    }
    warn(message) {
        this.$log.warn(message);
        toastr.warning(message);
    }
    error(message) {
        this.$log.error(message);
        toastr.error(message);
    }
    debug(message) {
        this.$log.info(message);
    }
}
LoggingService.$inject = ['$log'];
exports.LoggingService = LoggingService;
//# sourceMappingURL=logging.js.map