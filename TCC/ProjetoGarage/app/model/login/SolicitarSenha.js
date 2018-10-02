Ext.define('ProjetoGarage.model.login.SolicitarSenha', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Solicitacao',
        type: 'STRING'
    }, {
        name: 'Email',
        type: 'STRING'
    }, {
        name: 'Nome',
        type: 'STRING'
    }, {
        name: 'CodigoAlteracao',
        type: 'STRING'
    }]
});