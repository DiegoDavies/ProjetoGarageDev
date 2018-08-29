Ext.define('ProjetoGarage.view.funcionalidade.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'funcionalidade-form',
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
                xtype: 'tcc-combo',
                name: 'ModuloId',
                fieldLabel: 'Módulo',
                itemId: 'cboModulo',
                labelAlign: 'top',
                width: 300,
                displayField: 'Nome',
                valueField: 'ModuloId',
                store: Ext.create('ProjetoGarage.store.combos.Modulo'),
                allowBlank: false
            }, {
                xtype: 'textfield',
                fieldLabel: 'Menu',
                name: 'Menu',
                itemId: 'txtMenu',
                width: 300,
                labelAlign: 'top',
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode == 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'textfield',
                fieldLabel: 'Titulo',
                name: 'Titulo',
                itemId: 'txtTitulo',
                width: 300,
                labelAlign: 'top',
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode == 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'textfield',
                fieldLabel: 'ClassName',
                name: 'ClassName',
                itemId: 'txtClassName',
                width: 300,
                labelAlign: 'top',
                allowBlank: false,
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