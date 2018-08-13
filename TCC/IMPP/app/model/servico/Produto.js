﻿Ext.define('ProjetoGarage.model.servico.Produto', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ServicoProdutoId',
        type: 'INT'
    }, {
        name: 'Descricao',
        type: 'STRING'
    }, {
        name: 'UnidadeMedidaId',
        type: 'INT'
    }, {
        name: 'UnidadeMedidaNome',
        type: 'STRING'
    }, {
        name: 'Quantidade',
        type: 'FLOAT'
    }, {
        name: 'ValorUnitario',
        type: 'FLOAT'
    }, {
        name: 'ValorTotal',
        type: 'FLOAT'
    }, {
        name: 'Delete',
        type: 'BOOL'
    }]
});