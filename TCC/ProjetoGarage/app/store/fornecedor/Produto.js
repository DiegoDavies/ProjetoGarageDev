Ext.define('ProjetoGarage.store.fornecedor.Produto', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_FornecedorProduto_L',
        insert: 'S_FornecedorProduto_E',
        update: 'S_FornecedorProduto_E',
        destroy: 'S_FornecedorProduto_E'
    },
    model: 'ProjetoGarage.model.fornecedor.Produto'
})