Ext.define('ProjetoGarage.model.servico.Historico', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ServicoHistoricoId',
        type: 'INT'
    }, {
        name: 'ServicoId',
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