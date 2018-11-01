Ext.define('ProjetoGarage.store.modulo.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Modulo_L',
        insert: 'S_Modulo_E',
        update: 'S_Modulo_E',
        destroy: 'S_Modulo_E'
    },
    model: 'ProjetoGarage.model.modulo.Model'
});