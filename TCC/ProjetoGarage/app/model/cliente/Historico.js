Ext.define('ProjetoGarage.model.cliente.Historico', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ClienteHistoricoId',
        type: 'INT'
    }, {
        name: 'ClienteId',
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