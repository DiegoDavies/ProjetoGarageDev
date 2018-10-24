Ext.define('ProjetoGarage.store.combos.TipoPagamento', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 99999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Combo_TipoPagamento_L'
    },
    model: 'ProjetoGarage.model.combos.TipoPagamento'
});