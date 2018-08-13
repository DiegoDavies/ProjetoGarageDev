Ext.define('ProjetoGarage.store.combos.Etnia', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Etnia_L'
    },
    model: 'ProjetoGarage.model.combos.Etnia'
});