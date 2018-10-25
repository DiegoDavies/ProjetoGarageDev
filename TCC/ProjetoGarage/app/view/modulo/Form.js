Ext.define('ProjetoGarage.view.modulo.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'modulo-form',
    width: '100%',
    height: '100%',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Módulo *',
                name: 'Nome',
                itemId: 'txtModulo',
                width: 300,
                labelAlign: 'top',
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode === 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }]
        });

        me.callParent(arguments);
    }
});