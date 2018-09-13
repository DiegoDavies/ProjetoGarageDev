Ext.define('ProjetoGarage.model.veiculo.Historico', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'VeiculoHistoricoId',
        type: 'INT'
    }, {
        name: 'VeiculoId',
        type: 'INT'
    }, {
        name: 'Ocorrencia',
        type: 'STRING'
    }, {
        name: 'UsuarioId',
        type: 'INT'
    }, {
        name: 'UsuarioNome',
        type: 'STRING'
    }, {
        name: 'DataOcorrencia',
        type: 'DATE'
    }]
});