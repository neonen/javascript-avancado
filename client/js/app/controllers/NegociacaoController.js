class NegociacaoController{

    constructor(){
        let $ =  document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade =  $('#quantidade');
        this._inputValor = $('#valor');
        let self = this;
        
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

            get(target,prop, receiver){
                if(['adiciona','esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)){
                    return function(){
                        console.log(`interceptando ${prop}`);
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);
                    }
                }

                return Reflect.get(target,prop,receiver);
            }
        });
        this._negociacoesView = new NegociacoesView($('#NegociacoesView'));

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#MensagemView'));
        this._mensagemView.update(this._mensagem);
        this._negociacoesView.update(this._listaNegociacoes);
        
        
    }

    adiciona(event){
        event.preventDefault();
        

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação adicionada com suscesso!";
        
        this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com suscesso";
        this._mensagemView.update(this._mensagem);

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
}