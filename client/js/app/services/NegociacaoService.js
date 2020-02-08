'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NegociacaoService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HttpService = require('./HttpService');

var _NegociacaoDao = require('../dao/NegociacaoDao');

var _Negociacao = require('../models/Negociacao');

var _ConnectionFactory = require('./ConnectionFactory');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = exports.NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new _HttpService.HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoesSemana',
        value: function obterNegociacoesSemana() {
            var _this = this;

            return new Promise(function (resolve, reject) {

                _this._http.get('negociacoes/semana').then(function (negociacoes) {

                    resolve(negociacoes.map(function (objeto) {
                        return new _Negociacao.Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possivel resceber as negociações da semana.');
                });
            });
        }
    }, {
        key: 'obterNegociacoesSemanaRetrasada',
        value: function obterNegociacoesSemanaRetrasada() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                _this2._http.get('negociacoes/retrasada').then(function (negociacoes) {

                    resolve(negociacoes.map(function (objeto) {
                        return new _Negociacao.Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possivel resceber as negociações da semana retrasada.');
                });
            });
        }
    }, {
        key: 'obterNegociacoesSemanaAnterior',
        value: function obterNegociacoesSemanaAnterior() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                _this3._http.get('negociacoes/anterior').then(function (negociacoes) {

                    resolve(negociacoes.map(function (objeto) {
                        return new _Negociacao.Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possivel resceber as negociações da semana anterior.');
                });
            });
        }
    }, {
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            return Promise.all([this.obterNegociacoesSemana(), this.obterNegociacoesSemanaAnterior(), this.obterNegociacoesSemanaRetrasada()]).then(function (negociacoes) {
                return negociacoes.reduce(function (arrayAchatado, array) {
                    return arrayAchatado.concat(array);
                }, []);
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {
            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (conexao) {
                return new _NegociacaoDao.NegociacaoDao(conexao);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return "Negociação adicionada com suscesso!";
            }).catch(function (erro) {
                throw new Error("Não foi possível adicionar a negociação");
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (conexao) {
                return new _NegociacaoDao.NegociacaoDao(conexao);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                return "Erro ao listar as Negociações";
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).then(function () {
                return "Negociações apagadas";
            }).catch(function (erro) {
                console.log(erro);
                return "Erro ao apagar as Negociações";
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negocicao) {
                    return !listaAtual.some(function (negociacaoExistentes) {
                        return JSON.stringify(negocicao) == JSON.stringify(negociacaoExistentes);
                    });
                });
            }).catch(function (erro) {
                throw new Error("Não foi possível importa a negociação");
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map