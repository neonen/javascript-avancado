'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stores = ['negociacaoes'];
var dbName = 'aluraframe';
var vesion = 4;

var connection = null;
var close = null;

var ConnectionFactory = exports.ConnectionFactory = function () {
    function ConnectionFactory() {
        _classCallCheck(this, ConnectionFactory);

        throw new Error('Não é possivel criar Intancia');
    }

    _createClass(ConnectionFactory, null, [{
        key: 'getConnection',
        value: function getConnection() {
            return new Promise(function (resolve, reject) {
                var openRequest = window.indexedDB.open(dbName, vesion);

                openRequest.onupgradeneeded = function (e) {
                    ConnectionFactory._createStore(e.target.result);
                };
                openRequest.onsuccess = function (e) {
                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function () {
                            throw new Error('Você não pode fechar a conexão');
                        };
                    }
                    resolve(connection);
                };
                openRequest.onerror = function (e) {
                    console.log(e.target.error);

                    reject(e.target.error.name);
                };
            });
        }
    }, {
        key: '_createStore',
        value: function _createStore(conexao) {
            stores.forEach(function (store) {
                if (conexao.objectStoreNames.contains(store)) conexao.deleteObjectStore(store);
                conexao.createObjectStore(store, { autoincrement: true });
            });
        }
    }, {
        key: 'closeConnection',
        value: function closeConnection() {
            if (connection) {
                close();
                connection = null;
            }
        }
    }]);

    return ConnectionFactory;
}();
//# sourceMappingURL=ConnectionFactory.js.map