Ext.define('ProjetoGarage.model.contaPagar.Pagamento', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ContaPagarPagamentoId',
        type: 'INT'
    }, {
        name: 'ContaPagarId',
        type: 'INT'
    }, {
        name: 'Documento',
        type: 'STRING'
    }, {
        name: 'TipoPagamentoId',
        type: 'INT'
    }, {
        name: 'TipoPagamentoNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'DataPagamento',
        type: 'DATE',
        serialize: function (v) {
            return Ext.Date.format(v, 'Y-m-d H:i:s');
        }
    }, {
        name: 'ValorPago',
        type: 'FLOAT'
    }, {
        name: 'UsuarioId',
        type: 'INT',
        persist: false
    }, {
        name: 'UsuarioNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'DataHora',
        type: 'DATE',
        serialize: function (v) {
            return Ext.Date.format(v, 'Y-m-d H:i:s');
        },
        persist: false
    }, {
        name: 'Estornado',
        type: 'BOOL'
    }]
});