Ext.define('ProjetoGarage.model.contaReceber.Ocorrencia', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ContaReceberOcorrenciaId',
        type: 'INT'
    }, {
        name: 'ContaReceberId',
        type: 'INT'
    }, {
        name: 'Observacao',
        type: 'STRING'
    }, {
        name: 'DataHora',
        type: 'DATE'
    }, {
        name: 'UsuarioId',
        type: 'INT'
    }, {
        name: 'UsuarioNome',
        type: 'STRING'
    }]
});