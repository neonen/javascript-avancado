var ConnectionFactory = (function(){
const stores = ['negociacaoes'];
const dbName = 'aluraframe';
const vesion = 4;

var connection = null;
var close = null;

return class ConnectionFactory {

    constructor() {
        throw new Error('Não é possivel criar Intancia');
    }
    static getConnection() {
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open(dbName, vesion);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStore(e.target.result);
            };
            openRequest.onsuccess = e => {
                if(!connection){ 
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function() {throw new Error('Você não pode fechar a conexão');};
                }
                resolve(connection);
            }
            openRequest.onerror = e => {
                console.log(e.target.error);

                reject(e.target.error.name);
            }
        });
    }

    static _createStore(conexao) {
        stores.forEach(store => {
            if (conexao.objectStoreNames.contains(store))
                conexao.deleteObjectStore(store);
            conexao.createObjectStore(store, { autoincrement: true });
        });
    }

    static closeConnection(){
        if(connection){
            close();
            connection = null;
        }
    }
}
})();