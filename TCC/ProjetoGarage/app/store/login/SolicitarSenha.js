Ext.define('ProjetoGarage.store.login.SolicitarSenha', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 40,
    database: 'ProjetoGarage',
    procedures: {
        insert: 'S_SolicitarSenha_E'
    },
    model: 'ProjetoGarage.model.login.SolicitarSenha'
});