Ext.define('ProjetoGarage.store.servico.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Servico_L',
        insert: 'S_Servico_E',
        update: 'S_Servico_E',
        destroy: 'S_Servico_E'
    },
    model: 'ProjetoGarage.model.servico.Model'
});