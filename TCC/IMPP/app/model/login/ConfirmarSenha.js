Ext.define('ProjetoGarage.model.login.ConfirmarSenha', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'CodigoAlteracao',
        type: 'STRING'
    }, {
        name: 'SenhaNova',
        type: 'STRING'
    }, {
        name: 'SenhaRepetida',
        type: 'STRING'
    }]
});