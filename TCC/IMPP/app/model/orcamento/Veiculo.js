//TODO ALTERAR
Ext.define('ProjetoGarage.model.orcamento.Veiculo', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'OrcamentoVeiculoId',
        type: 'INT'
    }, {
        name: 'Placa',
        type: 'STRING'
    }, {
        name: 'Modelo',
        type: 'STRING'
    }, {
        name: 'Descricao',
        type: 'STRING'
    }, {
        name: 'Ano',
        type: 'INT'
    }]
});