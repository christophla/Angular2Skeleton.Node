import 'angular';

import {FormWizardController} from './directive';
import {FormWizardDirective} from './directive';
import {FormWizardFormDirective} from './directive';

/**
 * Module Registration
 */
angular
    .module('os.core')
    .controller('osFormWizardController', FormWizardController)
    .directive('osFormWizard', () => new FormWizardDirective())
    .directive('osFormWizardForm', () => new FormWizardFormDirective());
