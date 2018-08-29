Ext.define('ProjetoGarage.store.usuario.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Usuario_L',
        insert: 'S_Usuario_E',
        update: 'S_Usuario_E',
        destroy: 'S_Usuario_E'
    },
    model: 'ProjetoGarage.model.usuario.Model'
});