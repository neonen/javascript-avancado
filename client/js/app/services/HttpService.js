'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = exports.HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: '_handlerErros',
        value: function _handlerErros(res) {
            if (!res.ok) throw new Error(res.statusText);
            return res;
        }
    }, {
        key: 'get',
        value: function get(url) {
            var _this = this;

            return fetch(url).then(function (res) {
                return _this._handlerErros(res);
            }).then(function (res) {
                return res.json();
            });

            // return new Promise((resolve,reject) => {

            //     let xhr = new XMLHttpRequest();

            //     xhr.open('GET', url);
            //     xhr.onreadystatechange = () => {
            //         if(xhr.readyState == 4){
            //             if(xhr.status == 200){

            //                 resolve(JSON.parse(xhr.responseText));

            //             }else{
            //                 console.log(xhr.responseText);
            //                 reject(xhr.responseText);
            //             }
            //         }
            //     }

            //     xhr.send(); 
            // });
        }
    }, {
        key: 'post',
        value: function post(url, dado) {
            var _this2 = this;

            return fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                body: JSON.stringify(dado)
            }).then(function (res) {
                return _this2._handlerErros(res);
            });

            // return new Promise((resolve,reject) => {
            //     let xhr = new XMLHttpRequest();
            //     xhr.open("POST", url, true);
            //     xhr.setRequestHeader("Content-Type","application/json");

            //     xhr.onreadystatechange = () => {
            //         if(xhr.readyState == 4){
            //             if(xhr.status == 200){
            //                 resolve(JSON.parse(xhr.responseText));
            //             }else{
            //                 reject(xhr.responseText);
            //             }
            //         }
            //     };
            //     xhr.send(JSON.stringify(dado));
            // });
        }
    }]);

    return HttpService;
}();
//# sourceMappingURL=HttpService.js.map