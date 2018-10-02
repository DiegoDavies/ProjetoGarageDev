Ext.define('ProjetoGarage.store.combos.Sexo', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Sexo_L'
    },
    model: 'ProjetoGarage.model.combos.Sexo'
});