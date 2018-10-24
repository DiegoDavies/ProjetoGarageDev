Ext.define('ProjetoGarage.store.combos.Fornecedor', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Fornecedor_L'
    },
    model: 'ProjetoGarage.model.combos.Fornecedor'
});