Ext.define('ProjetoGarage.store.fornecedor.ContaPagar', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_FornecedorContaPagar_L'
    },
    model: 'ProjetoGarage.model.fornecedor.ContaPagar'
})