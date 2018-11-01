Ext.define('ProjetoGarage.store.produto.Fornecedor', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ProdutoFornecedor_L',
        insert: 'S_ProdutoFornecedor_E',
        update: 'S_ProdutoFornecedor_E',
        destroy: 'S_ProdutoFornecedor_E'
    },
    model: 'ProjetoGarage.model.produto.Fornecedor'
})