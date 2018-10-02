Ext.define('ProjetoGarage.store.combos.Banco', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Banco_L'
    },
    model: 'ProjetoGarage.model.combos.Banco'
});