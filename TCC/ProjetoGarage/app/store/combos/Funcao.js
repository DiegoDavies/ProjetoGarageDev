Ext.define('ProjetoGarage.store.combos.Funcao', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Funcao_L'
    },
    model: 'ProjetoGarage.model.combos.Funcao'
});