Ext.define('ProjetoGarage.store.funcionalidade.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 50,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Funcionalidade_L',
        insert: 'S_Funcionalidade_E',
        update: 'S_Funcionalidade_E',
        destroy: 'S_Funcionalidade_E'
    },
    model: 'ProjetoGarage.model.funcionalidade.Model'
});