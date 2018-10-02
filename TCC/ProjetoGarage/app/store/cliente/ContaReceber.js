Ext.define('ProjetoGarage.store.cliente.ContaReceber', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ClienteContaReceber_L',
        insert: 'S_ClienteContaReceber_E',
        update: 'S_ClienteContaReceber_E',
        destroy: 'S_ClienteContaReceber_E'
    },
    model: 'ProjetoGarage.model.cliente.ContaReceber'
})