Ext.define('ProjetoGarage.store.grupoCompra.Store', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_GrupoCompra_L',
        insert: 'S_GrupoCompra_E',
        update: 'S_GrupoCompra_E',
        destroy: 'S_GrupoCompra_E'
    },
    model: 'ProjetoGarage.model.grupoCompra.Model'
});