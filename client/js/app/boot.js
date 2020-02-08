'use strict';

var _NegociacaoController = require('./controllers/NegociacaoController');

var negociacaoController = (0, _NegociacaoController.currentInstance)();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('#apagar').onclick = negociacaoController.apaga.bind(negociacaoController);
document.querySelector('#importa').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
//# sourceMappingURL=boot.js.map