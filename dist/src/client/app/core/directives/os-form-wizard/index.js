"use strict";
require('angular');
var directive_1 = require('./directive');
var directive_2 = require('./directive');
var directive_3 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .controller('osFormWizardController', directive_1.FormWizardController)
    .directive('osFormWizard', function () { return new directive_2.FormWizardDirective(); })
    .directive('osFormWizardForm', function () { return new directive_3.FormWizardFormDirective(); });
//# sourceMappingURL=index.js.map