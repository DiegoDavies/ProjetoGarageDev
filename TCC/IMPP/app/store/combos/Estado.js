Ext.define('ProjetoGarage.store.combos.Estado', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Estado_L'
    },
    model: 'ProjetoGarage.model.combos.Estado'
});