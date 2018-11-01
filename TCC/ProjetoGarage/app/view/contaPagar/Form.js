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
                    xtype: 'radiogroup',
                    itemId: 'rdbBeneficiarios',
                    fieldLabel: 'Beneficiário',
                    columns: 2,
                    items: [{
                        boxLabel: 'Funcionários',
                        name: 'Benef',
                        inputValue: 'Funcionario',
                        checked: true
                    }, {
                        boxLabel: 'Fornecedores',
                        name: 'Benef',
                        inputValue: 'Fornecedor'
                    }]
                }, {
                    xtype: 'tcc-combo',
                    name: 'FuncionarioId',
                    fieldLabel: 'Funcionario',
                    itemId: 'cboFuncionario',
                    displayField: 'Nome',
                    valueField: 'FuncionarioId',
                    store: Ext.create('ProjetoGarage.store.combos.Funcionario')
                }, {
                    xtype: 'tcc-combo',
                    name: 'FornecedorId',
                    fieldLabel: 'Fornecedor',
                    itemId: 'cboFornecedor',
                    displayField: 'Nome',
                    valueField: 'FornecedorId',
                    store: Ext.create('ProjetoGarage.store.combos.Fornecedor')
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
                    name: 'DataPagamento',
                    fieldLabel: 'Data Pagamento',
                    itemId: 'dtDataPagamento',
                    readOnly: true,
                    emptyText: 'Preenchimento Automático'
                }, {
                    xtype: 'numberfield',
                    name: 'ValorPago',
                    align: 'right',
                    format: '0,000.00',
                    fieldLabel: 'Valor Pago',
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
            }, {
                xtype: 'contaPagar-tabPanel',
                flex: 1,
                margin: '0 0 0 0',
                panel: me.panel
            }, {
                xtype: 'tcc-mascaraTab',
                itemId: 'contaPagarMasc',
                flex: 1,
                margin: '0 0 0 0',
                width: '100%',
                height: '100%'
            }]
        });

        me.callParent(arguments);
    }
});