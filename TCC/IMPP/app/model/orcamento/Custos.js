Ext.define('ProjetoGarage.model.orcamento.Custos', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'OrcamentoCustoId',
        type: 'INT'
    }, {
        name: 'Descricao',
        type: 'STRING'
    }, {
        name: 'Valor',
        type: 'FLOAT'
    }, {
        name: 'Desconto',
        type: 'BOOL'
    }, {
        name: 'Delete',
        type: 'BOOL'
    }]
});