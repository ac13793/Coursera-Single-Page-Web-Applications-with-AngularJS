(function () {
    "use strict";

    angular.module('common')
    .service('MenuService', MenuService);


    MenuService.$inject = ['$http', 'ApiPath'];
    function MenuService($http, ApiPath) {
        var service = this;
        service.myinfo = {
            favoriteDish: "",
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            short_name: "",
            name: "",
            isInfoExist: false
        };

        service.getCategories = function () {
            return $http.get(ApiPath + '/categories.json').then(function (response) {
                return response.data;
            });
        };


        service.getMenuItems = function (category) {
            var config = {};
            if (category) {
                config.params = { 'category': category };
            }

            return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
                return response.data;
            });
        };

        service.getUserInfo = function () {
            return service.myinfo;
        };
    }

})();
