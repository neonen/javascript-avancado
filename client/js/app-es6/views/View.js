export class View{

    constructor(elemento){
        this._elemento = elemento;
    }

    template(){
        throw new Error("O metodo template prescisa ser implementado");
    }

    update(model){
        this._elemento.innerHTML = this.template(model);
    }
}