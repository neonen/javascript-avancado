'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NegociacoesView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _View2 = require('./View');

var _DateHelper = require('../helpers/DateHelper');

var _NegociacaoController = require('../controllers/NegociacaoController');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NegociacoesView = exports.NegociacoesView = function (_View) {
    _inherits(NegociacoesView, _View);

    function NegociacoesView(elemeto) {
        _classCallCheck(this, NegociacoesView);

        var _this = _possibleConstructorReturn(this, (NegociacoesView.__proto__ || Object.getPrototypeOf(NegociacoesView)).call(this, elemeto));

        elemeto.addEventListener('click', function (event) {
            if (event.target.nodeName == 'TH') (0, _NegociacaoController.currentInstance)().ordena(event.target.textContent.toLowerCase());
        });
        return _this;
    }

    _createClass(NegociacoesView, [{
        key: 'template',
        value: function template(model) {
            return '\n        <table class="table table-hover table-bordered">\n            <thead>\n                <tr>\n                    <th>DATA</th>\n                    <th>QUANTIDADE</th>\n                    <th>VALOR</th>\n                    <th>VOLUME</th>\n                </tr>\n            </thead>\n                ' + model.negociacoes.map(function (n) {
                return '\n                    <tr>\n                        <td>' + _DateHelper.DateHelper.dataParaTexto(n.data) + '</td>\n                        <td>' + n.quantidade + '</td>\n                        <td>' + n.valor + '</td>\n                        <td>' + n.volume + '</td>\n                    </tr>\n                    ';
            }).join('') + '\n            <tbody>\n                    <td colspan="3"></td>\n                    <td>\n                        ' + model.volumeTotal + '\n                    </td>\n            </tbody>\n            \n            <tfoot>\n            </tfoot>\n        </table>\n        ';
        }
    }]);

    return NegociacoesView;
}(_View2.View);
//# sourceMappingURL=NegociacoesView.js.map