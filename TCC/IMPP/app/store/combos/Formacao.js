Ext.define('ProjetoGarage.store.combos.Formacao', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Formacao_L'
    },
    model: 'ProjetoGarage.model.combos.Formacao'
});