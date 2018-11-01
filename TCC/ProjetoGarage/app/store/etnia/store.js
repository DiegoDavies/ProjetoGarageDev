Ext.define('ProjetoGarage.store.etnia.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Etnia_L',
        insert: 'S_Etnia_E',
        update: 'S_Etnia_E',
        destroy: 'S_Etnia_E'
    },
    model: 'ProjetoGarage.model.etnia.Model'
});