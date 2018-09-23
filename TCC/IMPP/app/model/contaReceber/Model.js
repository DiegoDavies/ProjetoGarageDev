﻿Ext.define('ProjetoGarage.model.contaReceber.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ContaReceberId',
        type: 'INT'
    }, {
        name: 'Documento',
        type: 'STRING'
    }, {
        name: 'BeneficiarioId',
        type: 'INT'
    }, {
        name: 'BeneficiarioNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'DataVencimento',
        type: 'DATE',
        serialize: function (v) {
            return Ext.Date.format(v, 'Y-m-d H:i:s');
        }
    }, {
        name: 'Valor',
        type: 'FLOAT'
    }, {
        name: 'DataPagamento',
        type: 'DATE',
        serialize: function (v) {
            return Ext.Date.format(v, 'Y-m-d H:i:s');
        }
    }, {
        name: 'ValorPago',
        type: 'FLOAT'
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