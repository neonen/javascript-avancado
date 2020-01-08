class NegociacoesView extends View{

    constructor(elemeto){
        super(elemeto);
    }

    template(model){
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="negociacao.ordena('data')">DATA</th>
                    <th onclick="negociacao.ordena('quantidade')">QUANTIDADE</th>
                    <th onclick="negociacao.ordena('valor')">VALOR</th>
                    <th onclick="negociacao.ordena('volume')">VOLUME</th>
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