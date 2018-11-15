Ext.define('ProjetoGarage.model.orcamento.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'OrcamentoId',
        type: 'INT'
    }, {
        name: 'Numero',
        type: 'STRING'
    }, {
        name: 'ClienteId',
        type: 'INT'
    }, {
        name: 'ClienteNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'DataRealizacao',
        type: 'DATE',
        serialize: function (v) {
            return Ext.Date.format(v, 'Y-m-d H:i:s');
        }
    }, {
        name: 'DataVencimento',
        type: 'DATE',
        serialize: function (v) {
            return Ext.Date.format(v, 'Y-m-d H:i:s');
        }
    }, {
        name: 'ValorTotal',
        type: 'FLOAT'
    }, {
        name: 'DuracaoId',
        type: 'INT'
    }, {
        name: 'DuracaoNome',
        type: 'STRING'
    }, {
        name: 'DuracaoValor',
        type: 'FLOAT'
    }, {
        name: 'Duracao',
        type: 'STRING',
        persist: false
    }, {
        name: 'StatusId',
        type: 'INT'
    }, {
        name: 'StatusNome',
        type: 'STRING'
    }, {
        name: 'Observacao',
        type: 'STRING'
    }, {
        name: 'Aprovar',
        type: 'BOOL'
    }, {
        name: 'Reprovar',
        type: 'BOOL'
    }, {
        name: 'AtualizaValor',
        type: 'BOOL'
    }, {
        name: 'UsuarioIdInclusao',
        type: 'INT',
        persist: false
    }, {
        name: 'UsuarioNomeInclusao',
        type: 'STRING',
        persist: false
    }, {
        name: 'DataHoraInclusao',
        type: 'DATE',
        persist: false
    }, {
        name: 'UsuarioIdAlteracao',
        type: 'INT',
        persist: false
    }, {
        name: 'UsuarioNomeAlteracao',
        type: 'STRING',
        persist: false
    }, {
        name: 'DataHoraAlteracao',
        type: 'DATE',
        persist: false
    }]
});