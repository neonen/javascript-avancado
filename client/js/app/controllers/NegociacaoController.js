'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.currentInstance = currentInstance;

var _View = require('../views/View');

var _Bind = require('../helpers/Bind');

var _NegociacaoService = require('../services/NegociacaoService');

var _NegociacoesView = require('../views/NegociacoesView');

var _ListaNegociacoes = require('../models/ListaNegociacoes');

var _MensagemView = require('../views/MensagemView');

var _Mensagem = require('../models/Mensagem');

var _Negociacao = require('../models/Negociacao');

var _DateHelper = require('../helpers/DateHelper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);

        this._ordemAtual = '';

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new _Bind.Bind(new _ListaNegociacoes.ListaNegociacoes(), new _NegociacoesView.NegociacoesView($('#NegociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverterOrdem');

        this._mensagem = new _Bind.Bind(new _Mensagem.Mensagem(), new _MensagemView.MensagemView($('#MensagemView')), 'texto');

        this._service = new _NegociacaoService.NegociacaoService();

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negocicao) {
                    return _this._listaNegociacoes.adiciona(negocicao);
                });
            }).catch(function (erro) {
                return _this._mensagem = erro;
            });

            setTimeout(function () {
                return _this.importaNegociacoes();
            }, 3000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (messagem) {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = messagem;
                _this2._limpaFormulario();
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this3 = this;

            this._service.apaga().then(function (messagem) {
                _this3._listaNegociacoes.esvazia();
                _this3._mensagem.texto = messagem;
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {
            return new _Negociacao.Negociacao(_DateHelper.DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputValor.value = 0.0;
            this._inputQuantidade.value = 1;

            this._inputData.focus();
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this4 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                negociacoes.forEach(function (negocicao) {
                    return _this4._listaNegociacoes.adiciona(negocicao);
                });
                _this4._mensagem.texto = 'Negociações importada com suscesso';
            }).catch(function (erro) {
                return _this4._mensagem.texto = erro;
            });
        }
    }, {
        key: 'ordena',
        value: function ordena(coluna) {
            if (this._ordemAtual == coluna) {
                this._listaNegociacoes.inverterOrdem();
            } else {
                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
            }
            this._ordemAtual = coluna;
        }
    }]);

    return NegociacaoController;
}();

var negociacaoController = new NegociacaoController();

function currentInstance() {
    return negociacaoController;
}
//# sourceMappingURL=NegociacaoController.js.map