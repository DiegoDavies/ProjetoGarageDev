Ext.define('ProjetoGarage.view.cliente.FormContaReceber', {
    extend: 'Ext.form.Panel',
    xtype: 'cliente-formContaReceber',
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
                name: 'Documento',
                fieldLabel: 'Documento',
                itemId: 'txtDocumento',
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
                fieldLabel: 'Data Vencimento',
                itemId: 'dtDataVencimento',
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode === 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'numberfield',
                name: 'Valor',
                align: 'right',
                format: '0,000.00',
                fieldLabel: 'Valor',
                itemId: 'txtValor',
                fieldStyle: 'text-align:right',
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
                name: 'DataRecebimento',
                fieldLabel: 'Data Recebimento',
                itemId: 'dtDataPagamento',
                readOnly: true,
                emptyText: 'Preenchimento Automático'
            }, {
                xtype: 'numberfield',
                name: 'ValorPago',
                align: 'right',
                format: '0,000.00',
                fieldLabel: 'Valor Recebido',
                itemId: 'txtValorPago',
                readOnly: true,
                fieldStyle: 'text-align:right',
                emptyText: 'Preenchimento Automático'
            }, {
                xtype: 'htmleditor',
                name: 'Observacao',
                fieldLabel: 'Observação',
                itemId: 'txtObservacao',
                rows: 6
            }]
        });

        me.callParent(arguments);
    }
});