Ext.define('ProjetoGarage.store.cliente.ContaReceber', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ClienteContaReceber_L'
    },
    model: 'ProjetoGarage.model.cliente.ContaReceber'
})