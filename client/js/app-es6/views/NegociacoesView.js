import {View} from './View';
import {DateHelper} from '../helpers/DateHelper';
import {currentInstance} from '../controllers/NegociacaoController';

export class NegociacoesView extends View{

    constructor(elemeto){
        super(elemeto);

        elemeto.addEventListener('click',function(event){
            if(event.target.nodeName == 'TH')
                currentInstance().ordena(event.target.textContent.toLowerCase());
        });
    }

    template(model){
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
                ${model.negociacoes.map(n => 
                    `
                    <tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                    `
                ).join('')}
            <tbody>
                    <td colspan="3"></td>
                    <td>
                        ${model.volumeTotal}
                    </td>
            </tbody>
            
            <tfoot>
            </tfoot>
        </table>
        `
    }

}