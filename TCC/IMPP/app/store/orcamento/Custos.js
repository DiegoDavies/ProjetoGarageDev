Ext.define('ProjetoGarage.store.orcamento.Custos', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_OrcamentoCustos_L',
        insert: 'S_OrcamentoCustos_E',
        update: 'S_OrcamentoCustos_E',
        destroy: 'S_OrcamentoCustos_E'
    },
    model: 'ProjetoGarage.model.orcamento.Custos'
});