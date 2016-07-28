"use strict";
require('angular');
const directive_1 = require('./directive');
const directive_2 = require('./directive');
const directive_3 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .controller('osFormWizardController', directive_1.FormWizardController)
    .directive('osFormWizard', () => new directive_2.FormWizardDirective())
    .directive('osFormWizardForm', () => new directive_3.FormWizardFormDirective());
//# sourceMappingURL=index.js.map