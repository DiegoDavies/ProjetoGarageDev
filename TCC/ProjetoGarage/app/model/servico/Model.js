Ext.define('ProjetoGarage.model.servico.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ServicoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Numero',
        type: 'STRING'
    }, {
        name: 'ClienteId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
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
        name: 'Duracao',
        type: 'FLOAT'
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