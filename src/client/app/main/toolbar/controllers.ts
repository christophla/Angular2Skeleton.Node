﻿
import {IPrincipal} from '../../core/security/principal';
import {IProfileService} from '../../core/profile';

export class ToolbarController {

    public static $inject = [
        '$rootScope',
        '$state',
        '$mdSidenav',
        '$translate',
        '$mdToast',
        'osPrincipal'
    ];

    public bodyEl = angular.element('body');
    public userStatusOptions = [
        {
            'title': 'Online',
            'icon': 'icon-checkbox-marked-circle',
            'color': '#4CAF50'
        },
        {
            'title': 'Away',
            'icon': 'icon-clock',
            'color': '#FFC107'
        },
        {
            'title': 'Do not Disturb',
            'icon': 'icon-minus-circle',
            'color': '#F44336'
        },
        {
            'title': 'Invisible',
            'icon': 'icon-checkbox-blank-circle-outline',
            'color': '#BDBDBD'
        },
        {
            'title': 'Offline',
            'icon': 'icon-checkbox-blank-circle-outline',
            'color': '#616161'
        }
    ];
    public languages = {
        en: {
            'title': 'English',
            'translation': 'TOOLBAR.ENGLISH',
            'code': 'en',
            'flag': 'us'
        },
        es: {
            'title': 'Spanish',
            'translation': 'TOOLBAR.SPANISH',
            'code': 'es',
            'flag': 'es'
        },
        tr: {
            'title': 'Turkish',
            'translation': 'TOOLBAR.TURKISH',
            'code': 'tr',
            'flag': 'tr'
        }
    };

    public selectedLanguage: any;
    public username: string;
    public userStatus: any;


    constructor(
        private $rootScope,
        private $state,
        private $mdSidenav,
        private $translate,
        private $mdToast,
        private osPrincipal: IPrincipal
    ) {
        // Data
        this.$rootScope.global = {
            search: ''
        };


        // Select the first status as a default
        this.userStatus = this.userStatusOptions[0];

        // Get the selected language directly from angular-translate module setting
        this.selectedLanguage = this.languages[$translate.preferredLanguage()];

        // this.username = `${profile.givenName} ${profile.familyName}`;
        this.username = 'Christopher';
    }

    /**
     * Toggle sidenav
     *
     * @param sidenavId
     */
    public toggleSidenav(sidenavId) {
        this.$mdSidenav(sidenavId).toggle();
    }

    /**
     * Sets User Status
     * @param status
     */
    public setUserStatus(status) {
        this.userStatus = status;
    }

    /**
     * Logout Function
     */
    public logout() {
        this.osPrincipal.authenticate(null);
        this.$state.go('app.auth_logout');
    }

    /**
     * Change Language
     */
    public changeLanguage(lang) {
        this.selectedLanguage = lang;

        /**
         * Show temporary message if user selects a language other than English
         *
         * angular-translate module will try to load language specific json files
         * as soon as you change the language. And because we don't have them, there
         * will be a lot of errors in the page potentially breaking couple functions
         * of the template.
         *
         * To prevent that from happening, we added a simple "return;" statement at the
         * end of this if block. If you have all the translation files, remove this if
         * block and the translations should work without any problems.
         */
        if (lang.code !== 'en') {
            var message = 'Fuse supports translations through angular-translate module, but currently we do not have any translations other than English language. If you want to help us, send us a message through ThemeForest profile page.';

            this.$mdToast.show({
                hideDelay: 7000,
                parent: '#content',
                position: 'top right',
                template: '<md-toast id="language-message" layout="column" layout-align="center start"><div class="md-toast-content">' + message + '</div></md-toast>'
            });

            return;
        }

        // Change the language
        this.$translate.use(lang.code);
    }

    /**
     * Toggle horizontal mobile menu
     */
    public toggleHorizontalMobileMenu() {
        this.bodyEl.toggleClass('os-navigation-horizontal-mobile-menu-active');
    }
}



