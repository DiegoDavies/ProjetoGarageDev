Ext.define('ProjetoGarage.store.contaReceber.Recebimento', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ContaReceberDetalhe_L',
        insert: 'S_ContaReceberDetalhe_E',
        update: 'S_ContaReceberDetalhe_E',
        destroy: 'S_ContaReceberDetalhe_E'
    },
    model: 'ProjetoGarage.model.contaReceber.Recebimento'
});