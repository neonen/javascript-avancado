class NegociacaoController{

    constructor(){
        let $ =  document.querySelector.bind(document);

        this._ordemAtual = '';

        this._inputData = $('#data');
        this._inputQuantidade =  $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes =  new Bind(new ListaNegociacoes(), new NegociacoesView($('#NegociacoesView')), 'adiciona','esvazia','ordena','inverterOrdem');
        
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#MensagemView')),'texto');

        this._service = new NegociacaoService();

        this._init();
    }

    _init(){
        this._service
            .lista()
            .then(negociacoes => 
                negociacoes.forEach(negocicao => this._listaNegociacoes.adiciona(negocicao)))
            .catch(erro => this._mensagem = erro)

            setTimeout(() => this.importaNegociacoes(), 3000);
    }

    adiciona(event){
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(messagem =>{ 
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = messagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);      
    }

    apaga(){
        this._service
            .apaga()
            .then(messagem => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = messagem;
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputValor.value = 0.0;
        this._inputQuantidade.value = 1;

        this._inputData.focus();

    }

    importaNegociacoes(){
        
        this._service
        .importa(this._listaNegociacoes.negociacoes)
        .then(negociacoes => {
            negociacoes
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