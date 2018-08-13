Ext.define('ProjetoGarage.store.orcamento.Veiculo', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_OrcamentoVeiculo_L',
        insert: 'S_OrcamentoVeiculo_E',
        update: 'S_OrcamentoVeiculo_E',
        destroy: 'S_OrcamentoVeiculo_E'
    },
    model: 'ProjetoGarage.model.orcamento.Veiculo'
});