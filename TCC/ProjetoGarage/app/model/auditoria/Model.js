Ext.define('ProjetoGarage.model.auditoria.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'LogId',
        type: 'INT'
    }, {
        name: 'UsuarioId',
        type: 'INT'
    }, {
        name: 'UsuarioNome',
        type: 'STRING'
    }, {
        name: 'DataHora',
        type: 'DATE'
    }, {
        name: 'Descricao',
        type: 'STRING'
    }]
});