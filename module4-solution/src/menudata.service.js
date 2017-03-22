(function () {
    'use strict';

    angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant("GetCategoryUrl", "https://davids-restaurant.herokuapp.com");


    MenuDataService.$inject = ['$http', 'GetCategoryUrl']
    function MenuDataService($http, GetCategoryUrl) {
        var service = this;

        service.getAllCategories = function () {
            return $http({
                method: "GET",
                url: (GetCategoryUrl + '/categories.json'),
            }).then(function (result) {
                return result.data;
            });
        };
        
        service.getItemsForCategory = function (categoryShortName) {
            return $http({
                method: "GET",				
				url : (GetCategoryUrl + '/menu_items.json'),
                params: {category: categoryShortName}
            }).then(function (result) {
                return result.data.menu_items;
            });
        };
    }

})();
