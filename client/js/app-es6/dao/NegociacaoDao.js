class NegociacaoDao {
    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){
        return new Promise((result,reject) => {
            let request = this._connection.transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

                request.onsuccess = e => {
                    result();
                }

                request.onerror = (e) => {
                    console.log(e.target.error);
                    reject("Não foi possivel adicionar Negociação");
                }
        });
    }

    listaTodos(){
        return new Promise((result,reject) => {

            let cursor = this._connection
                .transaction(this._store,'readwrite')
                .objectStore(this._store)
                .openCursor();

                let negociacoes = [];

                cursor.onsuccess = e =>{
                    let atual = e.target.result;
                    
                    if(atual){
                        let dados = atual.value;
                        
                        negociacoes.push(new Negociacao(dados._data,dados._quantidade,dados._valor));
                        
                        atual.continue();
                    }else{
                        result(negociacoes);
                    }
                }
                cursor.onerror = e =>{
                    reject(e.target.erro.name);
                }
        })
    }

    apagaTodos(){
        return new Promise((result,reject) => {
            let request = this._connection.transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

                request.onsuccess = e => result('Negociações apagadas com sucesso');
                request.onerror = e => reject('Erro ao apagar as Negociações');
        })
    }
}