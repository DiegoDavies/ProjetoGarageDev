Ext.define('ProjetoGarage.model.contaReceber.Ocorrencia', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ContaReceberHistoricoId',
        type: 'INT'
    }, {
        name: 'ContaReceberId',
        type: 'INT'
    }, {
        name: 'DataOcorrencia',
        type: 'DATE'
    }, {
        name: 'Ocorrencia',
        type: 'STRING'
    }, {
        name: 'UsuarioId',
        type: 'INT'
    }, {
        name: 'UsuarioNome',
        type: 'STRING'
    }]
});