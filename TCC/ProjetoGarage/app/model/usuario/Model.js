Ext.define('ProjetoGarage.model.usuario.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'UsuarioId',
        type: 'INT'
    }, {
        name: 'Nome',
        type: 'STRING'
    }, {
        name: 'Login',
        type: 'STRING'
    }, {
        name: 'Email',
        type: 'STRING'
    }, {
        name: 'Senha',
        type: 'STRING'
    }]
});