(function () {
    'use strict';

    angular.module('MenuApp')
    .controller('Categories', Categories);


    Categories.$inject = ['items'];
    function Categories(items) {
        var mainList = this;
        mainList.items = items;
    }

})();
