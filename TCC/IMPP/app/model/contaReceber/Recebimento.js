Ext.define('ProjetoGarage.model.contaReceber.Recebimento', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ContaReceberRecebimentoId',
        type: 'INT'
    }, {
        name: 'ContaReceberId',
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
        type: 'INT'
    }, {
        name: 'UsuarioNome',
        type: 'STRING'
    }, {
        name: 'DataHora',
        type: 'DATE',
        serialize: function (v) {
            return Ext.Date.format(v, 'Y-m-d H:i:s');
        }
    }, {
        name: 'Estornado',
        type: 'BOOL'
    }]
});