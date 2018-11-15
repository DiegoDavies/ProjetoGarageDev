Ext.define('ProjetoGarage.view.servico.FormProduto', {
    extend: 'Ext.form.Panel',
    xtype: 'servico-formProduto',
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
                width: 440,
                labelWidth: 130
            },
            items: [{
                xtype: 'tcc-combo',
                name: 'ProdutoId',
                fieldLabel: 'Produto',
                itemId: 'cboProduto',
                displayField: 'Nome',
                valueField: 'ProdutoId',
                store: Ext.create('ProjetoGarage.store.combos.Produto'),
                allowBlank: false
            }, {
                xtype: 'tcc-combo',
                name: 'UnidadeMedidaId',
                fieldLabel: 'Unidade de Medida',
                itemId: 'cboUnidadeMedida',
                displayField: 'Nome',
                valueField: 'UnidadeMedidaId',
                store: Ext.create('ProjetoGarage.store.combos.UnidadeMedida')
            }, {
                xtype: 'numberfield',
                name: 'Quantidade',
                align: 'right',
                format: '0,000.00',
                fieldLabel: 'Quantidade',
                itemId: 'txtQuantidade',
                fieldStyle: 'text-align:right',
                allowBlank: false,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode === 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'numberfield',
                name: 'ValorUnitario',
                align: 'right',
                format: '0,000.00',
                fieldLabel: 'Valor Unitário',
                itemId: 'txtValorUnitario',
                fieldStyle: 'text-align:right',
                allowBlank: false,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode === 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'numberfield',
                name: 'ValorTotal',
                align: 'right',
                format: '0,000.00',
                fieldLabel: 'Valor Total',
                itemId: 'txtValorTotal',
                fieldStyle: 'text-align:right',
                readOnly: true,
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
                fieldLabel: 'Observação',
                itemId: 'txtObservacao',
                rows: 6
            }]
        });

        me.callParent(arguments);
    }
});
