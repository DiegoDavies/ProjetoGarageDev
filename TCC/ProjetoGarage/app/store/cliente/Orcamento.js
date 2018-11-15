Ext.define('ProjetoGarage.store.cliente.Orcamento', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ClienteOrcamento_L',
        insert: 'S_ClienteOrcamento_E',
        update: 'S_ClienteOrcamento_E',
        destroy: 'S_ClienteOrcamento_E'
    },
    model: 'ProjetoGarage.model.cliente.Orcamento'
})