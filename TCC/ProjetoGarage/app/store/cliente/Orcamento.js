Ext.define('ProjetoGarage.store.cliente.Orcamento', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ClienteOrcamento_L'
    },
    model: 'ProjetoGarage.model.cliente.Orcamento'
})