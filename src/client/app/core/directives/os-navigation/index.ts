import 'angular';

import {NavigationController} from './controller';
import {NavigationDirective} from './vertical';
import {NavigationHorizontalDirective} from './horizontal';
import {NavigationHorizontalItemDirective} from './horizontal';
import {NavigationHorizontalNodeController} from './horizontal';
import {NavigationHorizontalNodeDirective} from './horizontal';
import {NavigationItemDirective} from './vertical';
import {NavigationNodeController} from './vertical';
import {NavigationNodeDirective} from './vertical';
import {NavigationServiceProvider} from './service';

/**
 * Module Registration
 */
angular
    .module('os.core')
    .provider('osNavigationService', NavigationServiceProvider)
    .controller('MsNavigationHorizontalNodeController', NavigationHorizontalNodeController)
    .controller('OsNavigationController', NavigationController)
    .directive('osNavigationHorizontal', NavigationHorizontalDirective.factory())
    .directive('osNavigationHorizontalItem', NavigationHorizontalItemDirective.factory())
    .directive('osNavigationHorizontalNode', () => new NavigationHorizontalNodeDirective())
    .directive('osNavigation', NavigationDirective.factory())
    .directive('osNavigationNode', () => new NavigationNodeDirective())
    .directive('osNavigationItem', () => new NavigationItemDirective())
    .controller('MsNavigationNodeController', NavigationNodeController);
