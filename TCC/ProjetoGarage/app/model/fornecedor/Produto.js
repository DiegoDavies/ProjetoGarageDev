Ext.define('ProjetoGarage.model.fornecedor.Produto', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ProdutoFornecedorId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'ProdutoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'FornecedorId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Fornecedor',
        type: 'STRING',
        persist: false
    }, {
        name: 'Produto',
        type: 'STRING'
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