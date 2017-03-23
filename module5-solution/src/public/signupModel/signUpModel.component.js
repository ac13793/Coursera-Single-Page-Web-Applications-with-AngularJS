(function () {
"use strict";

angular.module('public')
.controller('SignUpModelController', SignUpModelController)
.component('signUpModel', {
    templateUrl: 'src/public/signupModel/signUpModel.component.html',
  //bindings: {
  //  menuItem: '<'
  //},
    controller: SignUpModelController
});


SignUpModelController.$inject = ['MenuService'];
function SignUpModelController(MenuService) {
    var signup = this;
    signup.menuNumber = "";
    signup.isItemExist = false;
    signup.isErrorExist = false;
    signup.short_name = "";
    signup.dishName = "";
    signup.menuNumberExist = false;

    signup.checkDishExist = function () {
        MenuService.getMenuItems(signup.menuNumber)
                    .then(
                        function (result) {
                            if (!(result.category)) {
                                signup.isErrorExist = true;
                                signup.menuNumberExist = false;
                            } else {
                                signup.menuNumberExist = true;
                                signup.isErrorExist = false;
                            }
                        }
                    );
    };

    signup.submitSignUpForm = function () {
        MenuService.getMenuItems(signup.menuNumber)
                    .then(
                        function (result) {
                            if (result && result.category) {
                                signup.isItemExist = true;
                                signup.short_name = result.category.short_name;
                                signup.dishName = result.category.name;
                                MenuService.myinfo.favoriteDish = signup.menuNumber;
                                MenuService.myinfo.firstName = signup.firstName;
                                MenuService.myinfo.lastName = signup.lastName;
                                MenuService.myinfo.emailAddress = signup.emailAddress;
                                MenuService.myinfo.phoneNumber = signup.phoneNumber;
                                MenuService.myinfo.short_name = signup.short_name;
                                MenuService.myinfo.name = signup.dishName;
                                MenuService.myinfo.isInfoExist = true;
                            } else {
                                signup.isErrorExist = true;
                            }
                        }
                    );
    };
}

})();
