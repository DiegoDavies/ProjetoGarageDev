Ext.define('ProjetoGarage.store.combos.Modulo', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Modulo_L'
    },
    model: 'ProjetoGarage.model.combos.Modulo'
});