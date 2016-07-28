import 'angular';

import {ToolbarController} from './controllers';
import {config} from './config';

/**
 * Module
 */
angular
    .module('app.toolbar')
    .controller('ToolbarController', ToolbarController)
    .config(config);
