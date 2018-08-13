﻿Ext.define('ProjetoGarage.model.contaReceber.Recebimento', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ContaReceberRecebimentoId',
        type: 'INT'
    }, {
        name: 'ContaReceberId',
        type: 'INT'
    }, {
        name: 'Documento',
        type: 'STRING'
    }, {
        name: 'TipoPagamentoId',
        type: 'INT'
    }, {
        name: 'TipoPagamentoNome',
        type: 'STRING'
    }, {
        name: 'DataPagamento',
        type: 'DATE'
    }, {
        name: 'ValorPago',
        type: 'FLOAT'
    }, {
        name: 'UsuarioId',
        type: 'INT'
    }, {
        name: 'UsuarioNome',
        type: 'STRING'
    }, {
        name: 'DataHora',
        type: 'DATE'
    }, {
        name: 'Estornado',
        type: 'BOOL'
    }]
});