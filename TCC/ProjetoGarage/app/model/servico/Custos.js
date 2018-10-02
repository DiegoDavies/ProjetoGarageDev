Ext.define('ProjetoGarage.model.servico.Custos', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ServicoCustoId',
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
    }]
});