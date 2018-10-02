Ext.define('ProjetoGarage.store.orcamento.Custos', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_OrcamentoCusto_L',
        insert: 'S_OrcamentoCusto_E',
        update: 'S_OrcamentoCusto_E',
        destroy: 'S_OrcamentoCusto_E'
    },
    model: 'ProjetoGarage.model.orcamento.Custos'
});