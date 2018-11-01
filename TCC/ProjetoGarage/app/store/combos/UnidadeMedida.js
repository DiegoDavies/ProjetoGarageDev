Ext.define('ProjetoGarage.store.combos.UnidadeMedida', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_UnidadeMedida_L'
    },
    model: 'ProjetoGarage.model.combos.UnidadeMedida'
});