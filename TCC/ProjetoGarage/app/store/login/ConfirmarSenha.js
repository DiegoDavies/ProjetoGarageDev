Ext.define('ProjetoGarage.store.login.ConfirmarSenha', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        insert: 'S_ConfirmarSenha_E'
    },
    model: 'ProjetoGarage.model.login.ConfirmarSenha'
});