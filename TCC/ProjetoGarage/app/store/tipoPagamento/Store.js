Ext.define('ProjetoGarage.store.tipoPagamento.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_TipoPagamento_L',
        insert: 'S_TipoPagamento_E',
        update: 'S_TipoPagamento_E',
        destroy: 'S_TipoPagamento_E'
    },
    model: 'ProjetoGarage.model.tipoPagamento.Model'
});