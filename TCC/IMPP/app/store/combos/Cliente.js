Ext.define('ProjetoGarage.store.combos.Cliente', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Cliente_L'
    },
    model: 'ProjetoGarage.model.combos.Cliente'
});