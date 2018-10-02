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
        type: 'DATE',
        serialize: function (v) {
            return Ext.Date.format(v, 'Y-m-d H:i:s');
        },
        persist: false
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