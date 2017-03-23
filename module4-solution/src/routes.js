(function () {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
        .state('home', {
            url: '/',
            templateUrl: 'src/templates/home.template.html'
        })

        // Premade list page
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/templates/main-categories.template.html',
            controller: 'Categories as mainList',
            resolve: {
                items: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('itemDetail', {
            url: '/categories/{shortName}/item',
            templateUrl: 'src/templates/main-items.template.html',
            controller: 'ItemDetailController as item',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.shortName);
                }]
            }
        });
    }

})();