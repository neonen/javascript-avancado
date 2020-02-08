import {currentInstance} from './controllers/NegociacaoController';

var negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('#apagar').onclick = negociacaoController.apaga.bind(negociacaoController);
document.querySelector('#importa').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);

