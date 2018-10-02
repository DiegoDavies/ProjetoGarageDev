Ext.define('ProjetoGarage.store.combos.Cidade', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Cidade_L'
    },
    model: 'ProjetoGarage.model.combos.Cidade'
});