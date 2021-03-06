﻿Ext.define('ProjetoGarage.model.orcamento.Veiculo', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'OrcamentoVeiculoId',
        type: 'INT'
    }, {
        name: 'VeiculoId',
        type: 'INT'
    }, {
        name: 'Placa',
        type: 'STRING'
    }, {
        name: 'MarcaModelo',
        type: 'STRING'
    }, {
        name: 'Ano',
        type: 'INT'
    }, {
        name: 'Observacao',
        type: 'STRING'
    }, {
        name: 'Problema',
        type: 'STRING'
    }, {
        name: 'UsuarioIdInclusao',
        type: 'INT',
        persist: false
    }, {
        name: 'UsuarioNomeInclusao',
        type: 'STRING',
        persist: false
    }, {
        name: 'DataHoraInclusao',
        type: 'DATE',
        persist: false
    }, {
        name: 'UsuarioIdAlteracao',
        type: 'INT',
        persist: false
    }, {
        name: 'UsuarioNomeAlteracao',
        type: 'STRING',
        persist: false
    }, {
        name: 'DataHoraAlteracao',
        type: 'DATE',
        persist: false
    }]
});