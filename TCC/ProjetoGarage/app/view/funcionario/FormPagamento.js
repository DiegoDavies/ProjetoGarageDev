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
                labelWidth: 70
            },
            items: [{
                xtype: 'textfield',
                name: 'Nome',
                fieldLabel: 'Nome',
                itemId: 'txtNome',
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode == 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'tcc-combo',
                name: 'BancoId',
                fieldLabel: 'Banco',
                itemId: 'cboBanco',
                displayField: 'Nome',
                valueField: 'BancoId',
                store: Ext.create('ProjetoGarage.store.combos.Banco')
            }, {
                xtype: 'textfield',
                name: 'Agencia',
                //validator: function (v) {
                //    return /^-?[0-9]*(\.[0-9]{1,2})?$/.test(v) ? true : 'Only positive/negative float (x.yy)/int formats allowed!';
                //},
                fieldLabel: 'Agência',
                itemId: 'txtAgencia',
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
                name: 'Conta',
                //validator: function (v) {
                //    return /^-?[0-9]*(\.[0-9]{1,2})?$/.test(v) ? true : 'Only positive/negative float (x.yy)/int formats allowed!';
                //},
                fieldLabel: 'Conta',
                itemId: 'txtConta',
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