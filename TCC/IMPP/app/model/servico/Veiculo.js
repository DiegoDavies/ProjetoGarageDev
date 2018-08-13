Ext.define('ProjetoGarage.model.servico.Veiculo', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ServicoVeiculoId',
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