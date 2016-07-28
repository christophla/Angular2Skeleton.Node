import 'angular';

import {IndexController} from './controllers';
import {RouteConfig} from './routes';
import {RunBlock} from './run';

angular.module('app.application', [])
    .controller('IndexController', IndexController)
    .config(RouteConfig)
    .run(RunBlock);
