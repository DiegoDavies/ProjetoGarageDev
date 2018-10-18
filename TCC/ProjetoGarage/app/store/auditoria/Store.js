Ext.define('ProjetoGarage.store.auditoria.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Auditoria_L',
        insert: 'S_Auditoria_E',
        update: 'S_Auditoria_E',
        destroy: 'S_Auditoria_E'
    },
    model: 'ProjetoGarage.model.auditoria.Model'
});