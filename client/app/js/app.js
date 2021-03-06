'use strict';
/**
 * @ngdoc overview
 * @name loopbackApp
 * @description
 * # loopbackApp
 *
 * Main module of the application.
 */
angular.module('loopbackApp', [
    'angular-loading-bar',
    'angular.filter',
    'angularBootstrapNavTree',
    'angularFileUpload',
    'btford.markdown',
    'oitozero.ngSweetAlert',
    'config',
    'formly',
    'lbServices',
    'monospaced.elastic',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.codemirror',
    'ui.gravatar',
    'ui.grid',
    'ui.router',
    'toasty',
    'autofields',
    'gettext',
    'com.module.core',
    'com.module.about',
    'com.module.events',
    'com.module.files',
    'com.module.notes',
    'com.module.pages',
    'com.module.posts',
    'com.module.products',
    'com.module.sandbox',
    'com.module.settings',
    'com.module.users',
    'permission'
  ])
  .run(function($rootScope, $cookies, gettextCatalog, Permission, Role, User, RoleMapping) {

    $rootScope.locales = {

      'en': {
        lang: 'en',
        country: 'US',
        name: gettextCatalog.getString('English')
      },
      'pt-BR': {
        lang: 'pt_BR',
        country: 'BR',
        name: gettextCatalog.getString('Portuguese Brazil')
      },
      'nl': {
        lang: 'nl',
        country: 'NL',
        name: gettextCatalog.getString('Dutch')
      },
      'de': {
        lang: 'de',
        country: 'DE',
        name: gettextCatalog.getString('German')
      },
      'fr': {
        lang: 'fr',
        country: 'FR',
        name: gettextCatalog.getString('Français')
      }
    }

    var lang = $cookies.lang || navigator.language || navigator.userLanguage;

    $rootScope.locale = $rootScope.locales[lang];

    Permission.defineRole('admin', function(stateParams){
      return User.getCurrent(function(user) {
        console.log(user);
        Role.findOne({
          filter:{
            where: {
              name: 'admin'
            },
            include: 'principals'
        }}, function(role, err){
          return role.principals.forEach(function(principal){
            console.log('principal: ', principal.principalId);
            console.log('user: ', user.id);
            return parseInt(principal.principalId, 10) === parseInt(user.id, 10);
          });
        });
      }, function(err) {
        console.log(err);
      });
    });

    if ($rootScope.locale === undefined) {
      $rootScope.locale = $rootScope.locales[lang];
      if ($rootScope.locale === undefined) {
        $rootScope.locale = $rootScope.locales['en'];
      }
    }

    gettextCatalog.setCurrentLanguage($rootScope.locale.lang);

  });
