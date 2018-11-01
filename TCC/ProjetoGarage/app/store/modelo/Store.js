Ext.define('ProjetoGarage.store.modelo.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Modelo_L',
        insert: 'S_Modelo_E',
        update: 'S_Modelo_E',
        destroy: 'S_Modelo_E'
    },
    model: 'ProjetoGarage.model.modelo.Model'
});