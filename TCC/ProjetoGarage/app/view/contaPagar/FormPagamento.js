Ext.define('ProjetoGarage.view.contaPagar.FormPagamento', {
    extend: 'Ext.form.Panel',
    xtype: 'contaPagar-formPagamento',
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
                labelWidth: 130
            },
            items: [{
                xtype: 'textfield',
                name: 'Documento',
                fieldLabel: 'Documento',
                itemId: 'txtDocumento'
            }, {
                xtype: 'tcc-combo',
                name: 'TipoPagamentoId',
                fieldLabel: 'Tipo de Pagamento *',
                itemId: 'cboTipoPagamento',
                displayField: 'Nome',
                valueField: 'TipoPagamentoId',
                store: Ext.create('ProjetoGarage.store.combos.TipoPagamento'),
                allowBlank: false
            }, {
                xtype: 'datefield',
                altFormats: 'd/m/Y|dmy|dmY',
                format: 'd/m/Y',
                name: 'DataPagamento',
                fieldLabel: 'Data *',
                itemId: 'dtData',
                allowBlank: false
            }, {
                xtype: 'numberfield',
                name: 'ValorPago',
                fieldLabel: 'Valor *',
                itemId: 'txtValor',
                fieldStyle: 'text-align:right;',
                minValue: 0,
                allowBlank: false
            }]
        });

        me.callParent(arguments);
    }
});