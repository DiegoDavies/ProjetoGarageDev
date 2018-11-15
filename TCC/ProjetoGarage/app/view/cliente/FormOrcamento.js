Ext.define('ProjetoGarage.view.cliente.FormOrcamento', {
    extend: 'Ext.form.Panel',
    xtype: 'cliente-formOrcamento',
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
                name: 'Numero',
                fieldLabel: 'Número',
                itemId: 'txtNumero',
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode === 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'datefield',
                altFormats: 'd/m/Y|dmy|dmY',
                format: 'd/m/Y',
                name: 'DataVencimento',
                fieldLabel: 'Data Limite',
                itemId: 'dtDataVencimento',
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode === 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'tcc-combo',
                name: 'DuracaoId',
                fieldLabel: 'Duração',
                itemId: 'cboDuracao',
                displayField: 'Nome',
                valueField: 'DuracaoId',
                store: Ext.create('ProjetoGarage.store.combos.Duracao')
            }, {
                xtype: 'numberfield',
                name: 'DuracaoValor',
                align: 'right',
                format: '0,000',
                margin: '0 0 10 0',
                fieldLabel: 'Duração',
                itemId: 'txtDuracao',
                fieldStyle: 'text-align:right',
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode === 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'htmleditor',
                name: 'Observacao',
                rows: 7,
                itemId: 'txtObservacao',
                fieldLabel: 'Observação'
            }]
        });

        me.callParent(arguments);
    }
});