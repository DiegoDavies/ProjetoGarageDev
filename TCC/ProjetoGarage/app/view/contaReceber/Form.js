Ext.define('ProjetoGarage.view.contaReceber.Form', {
    extend: 'Ext.form.Panel',
    requires: [
        'ProjetoGarage.view.contaReceber.TabPanelFilho'
    ],
    xtype: 'contaReceber-form',
    width: '100%',
    height: '100%',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'container',
                padding: 10,
                width: 370,
                border: 5,
                height: '100%',
                layout: 'vbox',
                autoScroll: true,
                defaults: {
                    labelWidth: 120,
                    width: 350
                },
                items: [{
                    xtype: 'textfield',
                    name: 'Documento',
                    fieldLabel: 'Documento',
                    itemId: 'txtDocumento'
                }, {
                    xtype: 'tcc-combo',
                    name: 'BeneficiarioId',
                    fieldLabel: 'Cliente',
                    itemId: 'cboCliente',
                    displayField: 'Nome',
                    valueField: 'ClienteId',
                    store: Ext.create('ProjetoGarage.store.combos.Cliente')
                }, {
                    xtype: 'datefield',
                    altFormats: 'd/m/Y|dmy|dmY',
                    format: 'd/m/Y',
                    name: 'DataVencimento',
                    fieldLabel: 'Data Vencimento',
                    itemId: 'dtDataVencimento'
                }, {
                    xtype: 'numberfield',
                    name: 'Valor',
                    align: 'right',
                    format: '0,000.00',
                    fieldLabel: 'Valor',
                    itemId: 'txtValor',
                    fieldStyle: 'text-align:right'
                }, {
                    xtype: 'datefield',
                    altFormats: 'd/m/Y|dmy|dmY',
                    format: 'd/m/Y',
                    name: 'DataRecebimento',
                    fieldLabel: 'Data Recebimento',
                    itemId: 'dtDataPagamento',
                    readOnly: true
                }, {
                    xtype: 'numberfield',
                    name: 'ValorPago',
                    align: 'right',
                    format: '0,000.00',
                    fieldLabel: 'Valor Recebido',
                    itemId: 'txtValorPago',
                    readOnly: true,
                    fieldStyle: 'text-align:right'
                }, {
                    xtype: 'htmleditor',
                    name: 'Observacao',
                    fieldLabel: 'Observação',
                    itemId: 'txtObservacao',
                    rows: 6
                }]
            }, {
                xtype: 'contaReceber-tabPanel',
                flex: 1,
                margin: '0 0 0 0',
                panel: me.panel
            }, {
                xtype: 'tcc-mascaraTab',
                itemId: 'contaReceberMasc',
                flex: 1,
                margin: '0 0 0 0',
                width: '100%',
                height: '100%'
            }]
        });

        me.callParent(arguments);
    }
});