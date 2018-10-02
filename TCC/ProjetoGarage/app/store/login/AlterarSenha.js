Ext.define('ProjetoGarage.store.login.AlterarSenha', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 25,
    database: 'ProjetoGarage',
    procedures: {
        insert: 'S_AlterarSenha_E'
    },
    model: 'ProjetoGarage.model.login.AlterarSenha'
});