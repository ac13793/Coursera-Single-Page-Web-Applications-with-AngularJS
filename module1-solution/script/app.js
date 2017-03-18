(function () {
    'use strict';
    angular.module("LunchCheck", [])
        .controller("LunchCheckController", LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.dishItems = "";
        $scope.lunchMessage = "";

        $scope.checkDishItems = function () {
            var items = $scope.dishItems.split(',');
			var oElement = angular.element(document.querySelector("#lunchMessage"));
            var isItem = false;
            for (var i = items.length - 1; i >= 0; i--) {
                if (!items[i].trim()) {
                    items.splice(i, 1);
                } else {
                    isItem = true;
                }
            }
            if (!$scope.dishItems || !isItem) {
                $scope.lunchMessage = "Please enter data first";
				oElement.addClass("text-danger").removeClass("text-success");
            }
            if ($scope.dishItems && 3 >= items.length && isItem) {
                $scope.lunchMessage = "Enjoy!";
				oElement.addClass("text-success").removeClass("text-danger");
            }
            if ($scope.dishItems && 3 < items.length && isItem) {
                $scope.lunchMessage = "Too much!";
				oElement.addClass("text-success").removeClass("text-danger");
            }
        }
    }

})();