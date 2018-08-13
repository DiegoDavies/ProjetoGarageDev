﻿Ext.define('ProjetoGarage.model.servico.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ServicoId',
        type: 'INT'
    }, {
        name: 'Numero',
        type: 'STRING'
    }, {
        name: 'ClienteId',
        type: 'INT'
    }, {
        name: 'ClienteNome',
        type: 'STRING'
    }, {
        name: 'DataRealizacao',
        type: 'DATE'
    }, {
        name: 'DataVencimento',
        type: 'DATE'
    }, {
        name: 'ValorTotal',
        type: 'FLOAT'
    }, {
        name: 'Duracao',
        type: 'FLOAT'
    }, {
        name: 'UsuarioIdInclusao',
        type: 'INT'
    }, {
        name: 'UsuarioNomeInclusao',
        type: 'STRING'
    }, {
        name: 'DataHoraInclusao',
        type: 'DATE'
    }, {
        name: 'UsuarioIdAlteracao',
        type: 'INT'
    }, {
        name: 'UsuarioNomeAlteracao',
        type: 'STRING'
    }, {
        name: 'DataHoraAlteracao',
        type: 'DATE'
    }]
});