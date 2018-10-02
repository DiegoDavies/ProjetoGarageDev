Ext.define('ProjetoGarage.model.combos.Veiculo', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'VeiculoId',
        type: 'INT'
    }, {
        name: 'Nome',
        type: 'STRING'
    }, {
        name: 'Observacao',
        type: 'STRING'
    }]
});