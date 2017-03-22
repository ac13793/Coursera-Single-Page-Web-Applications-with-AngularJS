(function () {
    'use strict';

    angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant("GetCategoryUrl", "https://davids-restaurant.herokuapp.com/menu_items.json");


    MenuDataService.$inject = ['$http', 'GetCategoryUrl']
    function MenuDataService($http, GetCategoryUrl) {
        var service = this;

        service.getAllCategories = function () {
            return $http({
                method: "GET",
                url: GetCategoryUrl,
            }).then(function (result) {
                return result.data.menu_items;
            });
        };
        
        service.getItemsForCategory = function (categoryShortName) {
            return $http({
                method: "GET",
                url: (GetCategoryUrl + "?category=" + categoryShortName),
            }).then(function (result) {
                return result.data.menu_items;
            });
        };
    }



    MenuSearchService.$inject = ["$http", "ApiBasePath"];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: ApiBasePath,
            }).then(function (result) {
                // process result and only keep items that match
                var foundItems = [];
                var items = result.data.menu_items;
                for (var i = 0; i < items.length; i++) {
                    if (0 < items[i].description.indexOf(searchTerm)) {
                        foundItems.push(items[i]);
                    }
                }

                // return processed items
                return foundItems;
            });
        }
    }

})();
