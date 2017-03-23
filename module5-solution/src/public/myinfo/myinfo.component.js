(function () {
"use strict";

angular.module('public')
.controller('MyInfoModelController', MyInfoModelController)
.controller('MenuInfoController', MenuInfoController)
.component('myInfoModel', {
    templateUrl: 'src/public/myinfo/myinfo.component.html',
    bindings: {
        userinfo: '<'
    },
    controller: MenuInfoController
});


MyInfoModelController.$inject = ['MenuService', 'myinfo'];
function MyInfoModelController(MenuService, myinfo) {
    var info = this;
    info.userinfo = myinfo;    
}

MenuInfoController.$inject = ['MenuService'];
function MenuInfoController(MenuService) {
    var info = this;
    if (info.userInfo && info.userInfo.isInfoExist) {
        info.userInfoExist = true;
    } else {
        info.notSignedUp = true;
    }
}

})();
