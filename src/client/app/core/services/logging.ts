
/**
 * Logging service
 */
export interface ILoggingService {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
}


export class LoggingService implements ILoggingService {

    public static $inject = ['$log'];

    constructor(
        private $log: ng.ILogService,
        private toastr: Toastr
    ) {
    }

    public info(message: string): void {
        this.$log.info(message);
        toastr.info(message);
    }

    public warn(message: string): void {
        this.$log.warn(message);
        toastr.warning(message);
    }

    public error(message: string): void {
        this.$log.error(message);
        toastr.error(message);
    }

    public debug(message: string): void {
        this.$log.info(message);
    }
}
