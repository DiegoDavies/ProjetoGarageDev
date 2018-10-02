Ext.define('ProjetoGarage.store.combos.StatusFornecedor', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_StatusFornecedor_L'
    },
    model: 'ProjetoGarage.model.combos.StatusFornecedor'
});