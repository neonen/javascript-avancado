export class HttpService{
    _handlerErros(res){
        if(!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url){
        return fetch(url)
                .then(res => this._handlerErros(res))
                .then(res => res.json());

        // return new Promise((resolve,reject) => {

        //     let xhr = new XMLHttpRequest();

        //     xhr.open('GET', url);
        //     xhr.onreadystatechange = () => {
        //         if(xhr.readyState == 4){
        //             if(xhr.status == 200){
                        
        //                 resolve(JSON.parse(xhr.responseText));
                        
        //             }else{
        //                 console.log(xhr.responseText);
        //                 reject(xhr.responseText);
        //             }
        //         }
        //     }

        //     xhr.send(); 
        // });
    }

    post(url,dado){

        return fetch(url,{
                    headers: {'Content-Type': 'application/json'},
                    method: 'post',
                    body: JSON.stringify(dado)
                })
                .then(res => this._handlerErros(res));

        // return new Promise((resolve,reject) => {
        //     let xhr = new XMLHttpRequest();
        //     xhr.open("POST", url, true);
        //     xhr.setRequestHeader("Content-Type","application/json");

        //     xhr.onreadystatechange = () => {
        //         if(xhr.readyState == 4){
        //             if(xhr.status == 200){
        //                 resolve(JSON.parse(xhr.responseText));
        //             }else{
        //                 reject(xhr.responseText);
        //             }
        //         }
        //     };
        //     xhr.send(JSON.stringify(dado));
        // });
    }
}