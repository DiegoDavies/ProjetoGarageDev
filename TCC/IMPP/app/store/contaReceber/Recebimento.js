Ext.define('ProjetoGarage.store.contaReceber.Recebimento', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ContaReceberPagamento_L',
        insert: 'S_ContaReceberPagamento_E',
        update: 'S_ContaReceberPagamento_E',
        destroy: 'S_ContaReceberPagamento_E'
    },
    model: 'ProjetoGarage.model.contaReceber.Recebimento'
});