Ext.define('ProjetoGarage.store.combos.MarcaProduto', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_MarcaProduto_L'
    },
    model: 'ProjetoGarage.model.combos.MarcaProduto'
});