Ext.define('ProjetoGarage.store.combos.Produto', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Produto_L'
    },
    model: 'ProjetoGarage.model.combos.Produto'
});