
/**
 * Form Wizard Directive
 */
export class FormWizardDirective implements ng.IDirective {

    public restrict = 'E';
    public scope = true;
    public controller = 'osFormWizardController as msWizard';

    public compile(templateElement: ng.IAugmentedJQuery) {
        templateElement.addClass('os-form-wizard');
        return () => {
            // nothing
        };
    };
}


/**
 * Form Wizard Directive
 */
export class FormWizardFormDirective implements ng.IDirective {

    public restrict = 'A';
    public require = ['form', '^osFormWizard'];

    public compile = (templateElement: ng.IAugmentedJQuery) => {

        templateElement.addClass('os-form-wizard-form');

        return (scope, iElement, iAttrs, ctrls) => {
            var formCtrl = ctrls[0],
                osFormWizardCtrl = ctrls[1];

            osFormWizardCtrl.registerForm(formCtrl);
        };
    };
}


/**
 * Form Wizard Controller
 */
export class FormWizardController {

    // Data
    public forms = [];
    public selectedIndex = 0;

    // Methods

    /**
     * Register form
     *
     * @param form
     */
    public registerForm(form: any) {
        this.forms.push(form);
    }

    /**
     * Go to previous step
     */
    public previousStep() {
        this.selectedIndex--;
    }

    /**
     * Go to next step
     */
    public nextStep() {
        this.selectedIndex++;
    }

    /**
     * Is first step?
     *
     * @returns {boolean}
     */
    public isFirstStep() {
        return this.selectedIndex === 0;
    }

    /**
     * Is last step?
     *
     * @returns {boolean}
     */
    public isLastStep() {
        return this.selectedIndex === this.forms.length - 1;
    }

    /**
     * Is current step invalid?
     *
     * @returns {boolean|*}
     */
    public currentStepInvalid() {
        return angular.isDefined(this.forms[this.selectedIndex]) && this.forms[this.selectedIndex].$invalid;
    }

    /**
     * Check if there is any incomplete forms
     *
     * @returns {boolean}
     */
    public formsIncomplete() {
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
    public resetForm() {
        // Go back to first step
        this.selectedIndex = 0;

        // Make sure all the forms are back in the $pristine & $untouched status
        for (var x = 0; x < this.forms.length; x++) {
            this.forms[x].$setPristine();
            this.forms[x].$setUntouched();
        }
    }
}
