Ext.define('ProjetoGarage.view.perfil.Form', {
    extend: 'Ext.form.Panel',
    requires: [
        'ProjetoGarage.view.perfil.GridFuncionalidade'
    ],
    xtype: 'perfil-form',
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
                fieldLabel: 'Nome *',
                name: 'Nome',
                itemId: 'txtNome',
                width: 500,
                allowBlank: false,
                labelAlign: 'top',
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode === 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'perfil-gridFuncionalidade',
                hidden: true,
                width: 500,
                height: 300,
                window: me.window
            }]
        });

        me.callParent(arguments);
    }
});