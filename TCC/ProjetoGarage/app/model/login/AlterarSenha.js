Ext.define('ProjetoGarage.model.login.AlterarSenha', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'SenhaAtual',
        type: 'STRING',
        serialize: function (v) {
            return v.hashCode();
        }
    }, {
        name: 'SenhaNova',
        type: 'STRING',
        serialize: function (v) {
            return v.hashCode();
        }
    }, {
        name: 'SenhaRepetida',
        type: 'STRING',
        serialize: function(v) {
            return v.hashCode();
        }
    }]
});