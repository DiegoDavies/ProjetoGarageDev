Ext.define('ProjetoGarage.view.funcionario.FormPagamento', {
    extend: 'Ext.form.Panel',
    xtype: 'funcionario-formPagamento',
    width: '100%',
    height: '100%',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                width: 390,
                labelWidth: 110
            },
            items: [{
                xtype: 'textfield',
                name: 'Nome',
                fieldLabel: 'Conta',
                itemId: 'txtNome'
            }]
        });

        me.callParent(arguments);
    }
});