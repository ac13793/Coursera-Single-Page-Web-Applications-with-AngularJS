(function () {
    'use strict';
    angular.module("NarrowItDownApp", [])
        .controller("NarrowItDownController", NarrowItDownController)
        .service("MenuSearchService", MenuSearchService)
        .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com/menu_items.json")
        .directive('foundItems', foundItems);

    function foundItems() {
        var ddo = {
            templateUrl: './foundItem.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: foundItemDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    function foundItemDirectiveController() {
        var list = this;
        console.log(list);
        list.itemsInList = function () {
            if (list.found.length) {
                return false;
            } else {
                return true;
            }
        };
    }

    NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
    function NarrowItDownController($scope, MenuSearchService) {
        var list = this;
        list.searchTerm = "";
        list.narrowItDown = function (searchTerm) {
            MenuSearchService.getMatchedMenuItems(searchTerm).
                then(function (result) {
                    list.found = result;
                },
                function (result) {
                    console.log(result);
                });
        };

        list.removeItem = function (index) {
            list.found.splice(index, 1);
        }
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