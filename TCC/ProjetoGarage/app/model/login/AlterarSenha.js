Ext.define('ProjetoGarage.model.login.AlterarSenha', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'SenhaAtual',
        type: 'STRING'
    }, {
        name: 'SenhaNova',
        type: 'STRING'
    }, {
        name: 'SenhaRepetida',
        type: 'STRING'
    }]
});