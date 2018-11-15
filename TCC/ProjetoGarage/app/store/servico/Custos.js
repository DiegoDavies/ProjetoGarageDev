Ext.define('ProjetoGarage.store.servico.Custos', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ServicoCusto_L',
        insert: 'S_ServicoCusto_E',
        update: 'S_ServicoCusto_E',
        destroy: 'S_ServicoCusto_E'
    },
    model: 'ProjetoGarage.model.servico.Custos'
});