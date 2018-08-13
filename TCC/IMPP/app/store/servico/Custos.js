Ext.define('ProjetoGarage.store.servico.Custos', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ServicoCustos_L',
        insert: 'S_ServicoCustos_E',
        update: 'S_ServicoCustos_E',
        destroy: 'S_ServicoCustos_E'
    },
    model: 'ProjetoGarage.model.servico.Custos'
});