/// <reference path="../core.module.ts" />
// TODO: Use toasrtProvider (cpt)
var Core;
(function (Core) {
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
    /**
     * Module registration
     */
    angular
        .module('os.core')
        .service('osLoggingService', LoggingService);
})(Core || (Core = {}));
//# sourceMappingURL=logging.service.js.map