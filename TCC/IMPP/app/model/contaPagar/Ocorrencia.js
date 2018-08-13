Ext.define('ProjetoGarage.model.contaPagar.Ocorrencia', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ContaPagarOcorrenciaId',
        type: 'INT'
    }, {
        name: 'ContaPagarId',
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