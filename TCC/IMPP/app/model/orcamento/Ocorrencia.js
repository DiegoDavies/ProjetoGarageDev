Ext.define('ProjetoGarage.model.orcamento.Ocorrencia', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'OrcamentoOcorrenciaId',
        type: 'INT'
    }, {
        name: 'DataHora',
        type: 'DATE'
    }, {
        name: 'Observacao',
        type: 'STRING'
    }, {
        name: 'UsuarioNome',
        type: 'STRING'
    }, {
        name: 'Observacao',
        type: 'STRING'
    }]
});