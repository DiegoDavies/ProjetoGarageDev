Ext.define('ProjetoGarage.model.login.ConfirmarSenha', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'CodigoAlteracao',
        type: 'STRING'
    }, {
        name: 'SenhaNova',
        type: 'STRING',
        serialize: function (v) {
            return v.hashCode();
        }
    }, {
        name: 'SenhaRepetida',
        type: 'STRING',
        serialize: function (v) {
            return v.hashCode();
        }
    }]
});