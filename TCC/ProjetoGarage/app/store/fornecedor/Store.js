Ext.define('ProjetoGarage.store.fornecedor.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Fornecedor_L',
        insert: 'S_Fornecedor_E',
        update: 'S_Fornecedor_E',
        destroy: 'S_Fornecedor_E'
    },
    model: 'ProjetoGarage.model.fornecedor.Model'
})