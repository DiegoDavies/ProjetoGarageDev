Ext.define('ProjetoGarage.store.modeloProduto.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ModeloProduto_L',
        insert: 'S_ModeloProduto_E',
        update: 'S_ModeloProduto_E',
        destroy: 'S_ModeloProduto_E'
    },
    model: 'ProjetoGarage.model.modeloProduto.Model'
});