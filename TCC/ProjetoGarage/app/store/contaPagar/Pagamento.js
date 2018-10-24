Ext.define('ProjetoGarage.store.contaPagar.Pagamento', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ContaPagarDetalhe_L',
        insert: 'S_ContaPagarDetalhe_E',
        update: 'S_ContaPagarDetalhe_E',
        destroy: 'S_ContaPagarDetalhe_E'
    },
    model: 'ProjetoGarage.model.contaPagar.Pagamento'
});