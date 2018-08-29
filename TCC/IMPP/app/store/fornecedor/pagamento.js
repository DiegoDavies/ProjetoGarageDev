Ext.define('ProjetoGarage.store.fornecedor.Pagamento', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 9999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_FornecedorPagamento_L',
        insert: 'S_FornecedorPagamento_E',
        update: 'S_FornecedorPagamento_E',
        destroy: 'S_FornecedorPagamento_E'
    },
    model: 'ProjetoGarage.model.fornecedor.Pagamento'
})