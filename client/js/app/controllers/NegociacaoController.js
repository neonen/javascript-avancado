class NegociacaoController{

    constructor(){
        let $ =  document.querySelector.bind(document);

        this._ordemAtual = '';

        this._inputData = $('#data');
        this._inputQuantidade =  $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes =  new Bind(new ListaNegociacoes(), new NegociacoesView($('#NegociacoesView')), 'adiciona','esvazia','ordena','inverterOrdem');
        
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#MensagemView')),'texto');
    }

    adiciona(event){
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação adicionada com suscesso!";

        this._limpaFormulario();
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com suscesso";

    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputValor.value = 0.0;
        this._inputQuantidade.value = 1;

        this._inputData.focus();

    }

    importaNegociacoes(){
        let service = new NegociacaoService();
        
        Promise.all([
            service.obterNegociacoesSemana(),
            service.obterNegociacoesSemanaAnterior(),
            service.obterNegociacoesSemanaRetrasada()]
        ).then(negociacoes => {
            console.log(negociacoes);
            negociacoes
            .reduce((arrayAchatado, array) => arrayAchatado.concat(array) , [])
            .forEach(negocicao => this._listaNegociacoes.adiciona(negocicao));
            this._mensagem.texto = 'Negociações importada com suscesso';
        }).catch(erro => this._mensagem.texto = erro);
        
    }

    ordena(coluna){
        if(this._ordemAtual == coluna){
            this._listaNegociacoes.inverterOrdem()
        }else{
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}