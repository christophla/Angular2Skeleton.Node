"use strict";
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
exports.FormWizardDirective = FormWizardDirective;
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
exports.FormWizardFormDirective = FormWizardFormDirective;
/**
 * Form Wizard Controller
 */
class FormWizardController {
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
exports.FormWizardController = FormWizardController;
//# sourceMappingURL=directive.js.map