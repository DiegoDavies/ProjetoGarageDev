Ext.define('ProjetoGarage.store.marca.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Marca_L',
        insert: 'S_Marca_E',
        update: 'S_Marca_E',
        destroy: 'S_Marca_E'
    },
    model: 'ProjetoGarage.model.marca.Model'
});