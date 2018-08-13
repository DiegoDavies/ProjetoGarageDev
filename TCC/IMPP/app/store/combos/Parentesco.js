Ext.define('ProjetoGarage.store.combos.Parentesco', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Parentesco_L'
    },
    model: 'ProjetoGarage.model.combos.Parentesco'
});