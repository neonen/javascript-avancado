import {HttpService} from './HttpService';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';
import {ConnectionFactory} from './ConnectionFactory';

export class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesSemana(){

        return new Promise((resolve,reject) => {
           
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    
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
        ).then(negociacoes => negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array) , []));
    }

    cadastra(negociacao){
        return ConnectionFactory
        .getConnection()
        .then(conexao => new NegociacaoDao(conexao))
        .then(dao => dao.adiciona(negociacao))
        .then(() =>  "Negociação adicionada com suscesso!")
        .catch(erro => {
            throw new Error("Não foi possível adicionar a negociação")
        });
    }

    lista(){
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                return "Erro ao listar as Negociações";
            });
    }

    apaga(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => "Negociações apagadas")
            .catch(erro => {
                console.log(erro);
                return "Erro ao apagar as Negociações";
            });
    }

    importa(listaAtual){
        return this.obterNegociacoes()
                .then(negociacoes => 
                    negociacoes.filter(negocicao => 
                    !listaAtual.some(negociacaoExistentes =>
                        JSON.stringify(negocicao) == JSON.stringify(negociacaoExistentes))))
                .catch(erro => {
                    throw new Error("Não foi possível importa a negociação");
                });
    }
}