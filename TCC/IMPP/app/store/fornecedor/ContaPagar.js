Ext.define('ProjetoGarage.store.fornecedor.ContaPagar', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_FornecedorContaPagar_L',
        insert: 'S_FornecedorContaPagar_E',
        update: 'S_FornecedorContaPagar_E',
        destroy: 'S_FornecedorContaPagar_E'
    },
    model: 'ProjetoGarage.model.fornecedor.ContaPagar'
})