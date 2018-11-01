Ext.define('ProjetoGarage.store.combos.GrupoCompra', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_GrupoCompra_L'
    },
    model: 'ProjetoGarage.model.combos.GrupoCompra'
});