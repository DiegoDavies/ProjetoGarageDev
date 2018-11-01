Ext.define('ProjetoGarage.store.parentesco.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Parentesco_L',
        insert: 'S_Parentesco_E',
        update: 'S_Parentesco_E',
        destroy: 'S_Parentesco_E'
    },
    model: 'ProjetoGarage.model.parentesco.Model'
});