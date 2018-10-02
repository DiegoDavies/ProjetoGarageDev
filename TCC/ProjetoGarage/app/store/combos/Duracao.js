Ext.define('ProjetoGarage.store.combos.Duracao', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_Duracao_L'
    },
    model: 'ProjetoGarage.model.combos.Duracao'
});