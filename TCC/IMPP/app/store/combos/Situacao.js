Ext.define('ProjetoGarage.store.combos.Situacao', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Situacao_L'
    },
    model: 'ProjetoGarage.model.combos.Situacao'
});