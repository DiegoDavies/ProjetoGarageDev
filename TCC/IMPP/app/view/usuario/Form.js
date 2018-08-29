Ext.define('ProjetoGarage.view.usuario.Form', {
    extend: 'Ext.form.Panel',
    requires: [
        'ProjetoGarage.view.usuario.GridPerfil'
    ],
    xtype: 'usuario-form',
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
                width: 310,
                enableKeyEvents: true,
                labelAlign: 'top',
            },
            items: [{
                fieldLabel: 'Nome',
                xtype: 'textfield',
                name: 'Nome',
                itemId: 'txtNome',
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode == 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                fieldLabel: 'Login',
                xtype: 'textfield',
                name: 'Login',
                itemId: 'txtLogin',
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode == 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                fieldLabel: 'Email',
                xtype: 'textfield',
                name: 'Email',
                itemId: 'txtEmail',
                allowBlank: false,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode == 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'usuario-gridPerfil',
                hidden: true,
                width: 310,
                height: 250,
                window: me.window,
            }]
        });

        me.callParent(arguments);
    }
});