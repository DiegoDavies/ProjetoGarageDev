Ext.define('ProjetoGarage.model.orcamento.Historico', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'OrcamentoHistoricoId',
        type: 'INT'
    }, {
        name: 'OrcamentoId',
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