class NegociacaoController{

    constructor(){
        let $ =  document.querySelector.bind(document);

        this._ordemAtual = '';

        this._inputData = $('#data');
        this._inputQuantidade =  $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes =  new Bind(new ListaNegociacoes(), new NegociacoesView($('#NegociacoesView')), 'adiciona','esvazia','ordena','inverterOrdem');
        
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#MensagemView')),'texto');

        ConnectionFactory
            .getConnection()
            .then(connecatio => {
                new NegociacaoDao(connecatio)
                    .listaTodos()
                    .then(negociacoes => {
                        negociacoes.forEach(negocicao => this._listaNegociacoes.adiciona(negocicao));
                    })
            }).catch(erro => {
                console.log(erro);
                this._mensagem = erro;
            });
    }

    adiciona(event){
        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(conexao => {
                let negociacao = this._criaNegociacao();
                new NegociacaoDao(conexao)
                    .adiciona(negociacao)
                        .then(() => {
                            this._listaNegociacoes.adiciona(this._criaNegociacao());
                            this._mensagem.texto = "Negociação adicionada com suscesso!";
                            this._limpaFormulario();
                        }).catch(erro => {this._mensagem.texto = erro;});
            })

        
    }

    apaga(){
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(messagem => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = messagem;
            });
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
        let service = new NegociacaoService();
        
        service.obterNegociacoes()
        .then(negociacoes => 
            negociacoes.filter(negocicao => 
            !this._listaNegociacoes.negociacoes.some(negociacaoExistentes =>
                JSON.stringify(negocicao) == JSON.stringify(negociacaoExistentes))))
        .then(negociacoes => {
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