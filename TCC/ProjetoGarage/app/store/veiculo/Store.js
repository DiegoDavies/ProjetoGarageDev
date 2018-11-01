Ext.define('ProjetoGarage.store.veiculo.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Veiculo_L',
        insert: 'S_Veiculo_E',
        update: 'S_Veiculo_E',
        destroy: 'S_Veiculo_E'
    },
    model: 'ProjetoGarage.model.veiculo.Model'
})