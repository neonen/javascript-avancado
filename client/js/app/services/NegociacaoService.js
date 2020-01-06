class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesSemana(){

        return new Promise((resolve,reject) => {
           
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.valor,objeto.quantidade)))
                }).catch( erro => {
                    console.log(erro);
                    reject('Não foi possivel resceber as negociações da semana.')
                });
        
        });
    }
    obterNegociacoesSemanaRetrasada(){

        return new Promise((resolve,reject) => {
            
            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.valor,objeto.quantidade)))
                }).catch( erro => {
                    console.log(erro);
                    reject('Não foi possivel resceber as negociações da semana retrasada.')
                });
        });
        
    }

    obterNegociacoesSemanaAnterior(){

        return new Promise((resolve,reject) => {
            
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.valor,objeto.quantidade)))
                }).catch( erro => {
                    console.log(erro);
                    reject('Não foi possivel resceber as negociações da semana anterior.')
                });
        });
        
    }

    obterNegociacoes(){
        return Promise.all([
            this.obterNegociacoesSemana(),
            this.obterNegociacoesSemanaAnterior(),
            this.obterNegociacoesSemanaRetrasada()]
        );
    }
}