Ext.define('ProjetoGarage.store.telaPrincipal.Menu', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_Menu_L'
    },
    model: 'ProjetoGarage.model.telaPrincipal.Menu'
});