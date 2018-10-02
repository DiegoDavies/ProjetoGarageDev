Ext.define('ProjetoGarage.store.contaPagar.Pagamento', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ContaPagarPagamento_L',
        insert: 'S_ContaPagarPagamento_E',
        update: 'S_ContaPagarPagamento_E',
        destroy: 'S_ContaPagarPagamento_E'
    },
    model: 'ProjetoGarage.model.contaPagar.Pagamento'
});