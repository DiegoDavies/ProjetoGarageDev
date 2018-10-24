Ext.define('ProjetoGarage.model.contaPagar.Ocorrencia', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ContaPagarHistoricoId',
        type: 'INT'
    }, {
        name: 'ContaPagarId',
        type: 'INT'
    }, {
        name: 'DataOcorrencia',
        type: 'DATE'
    }, {
        name: 'Ocorrencia',
        type: 'STRING'
    }, {
        name: 'UsuarioId',
        type: 'INT',
        persist: false
    }, {
        name: 'UsuarioNome',
        type: 'STRING',
        persist: false
    }]
});