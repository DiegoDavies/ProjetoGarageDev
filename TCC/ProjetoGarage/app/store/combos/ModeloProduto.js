Ext.define('ProjetoGarage.store.combos.ModeloProduto', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_ModeloProduto_L'
    },
    model: 'ProjetoGarage.model.combos.ModeloProduto'
});