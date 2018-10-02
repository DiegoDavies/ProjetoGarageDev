Ext.define('ProjetoGarage.store.combos.Marca', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Marca_L'
    },
    model: 'ProjetoGarage.model.combos.Marca'
});