/// <reference path="../../core.module.ts" />
var Core;
(function (Core) {
    /**
     * Form Wizard Directive
     */
    class FormWizardDirective {
        constructor() {
            this.restrict = 'E';
            this.scope = true;
            this.controller = 'osFormWizardController as msWizard';
        }
        compile(templateElement) {
            templateElement.addClass('os-form-wizard');
            return () => {
                // nothing
            };
        }
        ;
    }
    /**
     * Form Wizard Directive
     */
    class FormWizardFormDirective {
        constructor() {
            this.restrict = 'A';
            this.require = ['form', '^osFormWizard'];
            this.compile = (templateElement) => {
                templateElement.addClass('os-form-wizard-form');
                return (scope, iElement, iAttrs, ctrls) => {
                    var formCtrl = ctrls[0], osFormWizardCtrl = ctrls[1];
                    osFormWizardCtrl.registerForm(formCtrl);
                };
            };
        }
    }
    /**
     * Form Wizard Controller
     */
    class MsFormWizardController {
        constructor() {
            // Data
            this.forms = [];
            this.selectedIndex = 0;
        }
        // Methods
        /**
         * Register form
         *
         * @param form
         */
        registerForm(form) {
            this.forms.push(form);
        }
        /**
         * Go to previous step
         */
        previousStep() {
            this.selectedIndex--;
        }
        /**
         * Go to next step
         */
        nextStep() {
            this.selectedIndex++;
        }
        /**
         * Is first step?
         *
         * @returns {boolean}
         */
        isFirstStep() {
            return this.selectedIndex === 0;
        }
        /**
         * Is last step?
         *
         * @returns {boolean}
         */
        isLastStep() {
            return this.selectedIndex === this.forms.length - 1;
        }
        /**
         * Is current step invalid?
         *
         * @returns {boolean|*}
         */
        currentStepInvalid() {
            return angular.isDefined(this.forms[this.selectedIndex]) && this.forms[this.selectedIndex].$invalid;
        }
        /**
         * Check if there is any incomplete forms
         *
         * @returns {boolean}
         */
        formsIncomplete() {
            for (var x = 0; x < this.forms.length; x++) {
                if (this.forms[x].$invalid) {
                    return true;
                }
            }
            return false;
        }
        /**
         * Reset form
         */
        resetForm() {
            // Go back to first step
            this.selectedIndex = 0;
            // Make sure all the forms are back in the $pristine & $untouched status
            for (var x = 0; x < this.forms.length; x++) {
                this.forms[x].$setPristine();
                this.forms[x].$setUntouched();
            }
        }
    }
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .controller('osFormWizardController', MsFormWizardController)
        .directive('osFormWizard', () => new FormWizardDirective())
        .directive('osFormWizardForm', () => new FormWizardFormDirective());
})(Core || (Core = {}));
//# sourceMappingURL=ms-form-wizard.directive.js.map