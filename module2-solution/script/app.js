(function () {
    'use strict';
    angular.module("ShoppingListCheckOff", [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
    function ToBuyController($scope, ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getToBuyItems();
        toBuy.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
    function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
        var bought = this;
        bought.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuy = [
            {
                name: "Cookies",
                quatity: "10"
            },
            {
                name: "Chips",
                quatity: "5"
            },
            {
                name: "Pepto Bismol",
                quatity: "10"
            },
            {
                name: "Water bottles",
                quatity: "10"
            },
            {
                name: "Cup cake",
                quatity: "10"
            }
        ];
        var bought = [];

        service.getToBuyItems = function () {
            return toBuy;
        };

        service.getBoughtItems = function () {
            return bought;
        };

        service.buyItem = function (itemIndex) {
            bought.push(toBuy[itemIndex]);
            toBuy.splice(itemIndex, 1);
        };
    }

})();