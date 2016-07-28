"use strict";
/**
 * Form Wizard Directive
 */
var FormWizardDirective = (function () {
    function FormWizardDirective() {
        this.restrict = 'E';
        this.scope = true;
        this.controller = 'osFormWizardController as msWizard';
    }
    FormWizardDirective.prototype.compile = function (templateElement) {
        templateElement.addClass('os-form-wizard');
        return function () {
            // nothing
        };
    };
    ;
    return FormWizardDirective;
}());
exports.FormWizardDirective = FormWizardDirective;
/**
 * Form Wizard Directive
 */
var FormWizardFormDirective = (function () {
    function FormWizardFormDirective() {
        this.restrict = 'A';
        this.require = ['form', '^osFormWizard'];
        this.compile = function (templateElement) {
            templateElement.addClass('os-form-wizard-form');
            return function (scope, iElement, iAttrs, ctrls) {
                var formCtrl = ctrls[0], osFormWizardCtrl = ctrls[1];
                osFormWizardCtrl.registerForm(formCtrl);
            };
        };
    }
    return FormWizardFormDirective;
}());
exports.FormWizardFormDirective = FormWizardFormDirective;
/**
 * Form Wizard Controller
 */
var FormWizardController = (function () {
    function FormWizardController() {
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
    FormWizardController.prototype.registerForm = function (form) {
        this.forms.push(form);
    };
    /**
     * Go to previous step
     */
    FormWizardController.prototype.previousStep = function () {
        this.selectedIndex--;
    };
    /**
     * Go to next step
     */
    FormWizardController.prototype.nextStep = function () {
        this.selectedIndex++;
    };
    /**
     * Is first step?
     *
     * @returns {boolean}
     */
    FormWizardController.prototype.isFirstStep = function () {
        return this.selectedIndex === 0;
    };
    /**
     * Is last step?
     *
     * @returns {boolean}
     */
    FormWizardController.prototype.isLastStep = function () {
        return this.selectedIndex === this.forms.length - 1;
    };
    /**
     * Is current step invalid?
     *
     * @returns {boolean|*}
     */
    FormWizardController.prototype.currentStepInvalid = function () {
        return angular.isDefined(this.forms[this.selectedIndex]) && this.forms[this.selectedIndex].$invalid;
    };
    /**
     * Check if there is any incomplete forms
     *
     * @returns {boolean}
     */
    FormWizardController.prototype.formsIncomplete = function () {
        for (var x = 0; x < this.forms.length; x++) {
            if (this.forms[x].$invalid) {
                return true;
            }
        }
        return false;
    };
    /**
     * Reset form
     */
    FormWizardController.prototype.resetForm = function () {
        // Go back to first step
        this.selectedIndex = 0;
        // Make sure all the forms are back in the $pristine & $untouched status
        for (var x = 0; x < this.forms.length; x++) {
            this.forms[x].$setPristine();
            this.forms[x].$setUntouched();
        }
    };
    return FormWizardController;
}());
exports.FormWizardController = FormWizardController;
//# sourceMappingURL=directive.js.map