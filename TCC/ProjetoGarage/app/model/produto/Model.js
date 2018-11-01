Ext.define('ProjetoGarage.model.produto.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ProdutoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'Nome',
        type: 'STRING'
    }, {
        name: 'ModeloProdutoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'ModeloProdutoNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'MarcaProdutoId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'MarcaProdutoNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'UnidadeMedidaId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'UnidadeMedidaNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'GrupoCompraId',
        type: 'INT',
        convert: function (v) {
            return v !== 0 ? v : '';
        }
    }, {
        name: 'GrupoCompraNome',
        type: 'STRING',
        persist: false
    }, {
        name: 'ValorCompra',
        type: 'FLOAT'
    }, {
        name: 'Especificacao',
        type: 'STRING'
    }, {
        name: 'Observacao',
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