Ext.define('ProjetoGarage.model.servico.Ocorrencia', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ServicoOcorrenciaId',
        type: 'INT'
    }, {
        name: 'DataHora',
        type: 'DATE'
    }, {
        name: 'UsuarioId',
        type: 'INT'
    }, {
        name: 'UsuarioNome',
        type: 'STRING'
    }, {
        name: 'Observacao',
        type: 'STRING'
    }]
});