Ext.define('ProjetoGarage.store.statusFornecedor.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_StatusFornecedor_L',
        insert: 'S_StatusFornecedor_E',
        update: 'S_StatusFornecedor_E',
        destroy: 'S_StatusFornecedor_E'
    },
    model: 'ProjetoGarage.model.statusFornecedor.Model'
});