﻿Ext.define('ProjetoGarage.view.etnia.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'etnia-form',
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
                fieldLabel: 'Nome',
                xtype: 'textfield',
                name: 'Nome',
                itemId: 'txtNome',
                width: 300,
                labelAlign: 'top',
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode == 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }]
        });

        me.callParent(arguments);
    }
});