Ext.define('ProjetoGarage.view.contaPagar.Form', {
    extend: 'Ext.form.Panel',
    requires: [
        'ProjetoGarage.view.contaPagar.TabPanelFilho'
    ],
    xtype: 'contaPagar-form',
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
                    labelWidth: 110,
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
                    fieldLabel: 'Funcionario',
                    itemId: 'cboFuncionario',
                    displayField: 'Nome',
                    valueField: 'FuncionarioId',
                    store: Ext.create('ProjetoGarage.store.combos.Cliente')
                }, {
                    xtype: 'tcc-combo',
                    name: 'BeneficiarioId',
                    fieldLabel: 'Fornecedor',
                    itemId: 'cboForneceodr',
                    displayField: 'Nome',
                    valueField: 'FornecedorId',
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
                    itemId: 'txtValor'
                }, {
                    xtype: 'datefield',
                    altFormats: 'd/m/Y|dmy|dmY',
                    format: 'd/m/Y',
                    name: 'DataPagamento',
                    fieldLabel: 'Data Pagamento',
                    itemId: 'dtDataPagamento',
                    readOnly: true
                }, {
                    xtype: 'numberfield',
                    name: 'ValorPago',
                    align: 'right',
                    format: '0,000.00',
                    fieldLabel: 'Valor Pago',
                    itemId: 'txtValorPago',
                    readOnly: true
                }]
            }, {
                xtype: 'contaPagar-tabPanel',
                flex: 1,
                margin: '0 0 0 0',
                panel: me.panel
            }]
        });

        me.callParent(arguments);
    }
});