Ext.define('ProjetoGarage.store.combos.Modelo', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Modelo_L'
    },
    model: 'ProjetoGarage.model.combos.Modelo'
});