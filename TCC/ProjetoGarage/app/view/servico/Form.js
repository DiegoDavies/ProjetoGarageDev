Ext.define('ProjetoGarage.view.servico.Form', {
    extend: 'Ext.form.Panel',
    requires: [
        'ProjetoGarage.view.servico.TabPanelFilho',
        'ProjetoGarage.view.servico.GridCustos'
    ],
    xtype: 'servico-form',
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
                width: 410,
                border: 5,
                height: '100%',
                layout: 'vbox',
                autoScroll: true,
                defaults: {
                    labelWidth: 110,
                    width: 380
                },
                items: [{
                    xtype: 'textfield',
                    name: 'Numero',
                    fieldLabel: 'Número',
                    itemId: 'txtNumero'
                }, {
                    xtype: 'tcc-combo',
                    name: 'ClienteId',
                    fieldLabel: 'Cliente',
                    itemId: 'cboCliente',
                    displayField: 'Nome',
                    valueField: 'ClienteId',
                    store: Ext.create('ProjetoGarage.store.combos.Cliente'),
                    allowBlank: false
                }, {
                    xtype: 'datefield',
                    altFormats: 'd/m/Y|dmy|dmY',
                    format: 'd/m/Y',
                    name: 'DataAprovacao',
                    fieldLabel: 'Data Aprovação',
                    itemId: 'dtDataAprovacao'
                }, {
                    xtype: 'datefield',
                    altFormats: 'd/m/Y|dmy|dmY',
                    format: 'd/m/Y',
                    name: 'DataInicio',
                    fieldLabel: 'Data Início',
                    itemId: 'dtDataInicio',
                    emptyText: 'Preenchimento Automático',
                    readOnly: true
                }, {
                    xtype: 'datefield',
                    altFormats: 'd/m/Y|dmy|dmY',
                    format: 'd/m/Y',
                    name: 'DataFim',
                    fieldLabel: 'Data Finalização',
                    itemId: 'dtDataFinalizacao',
                    emptyText: 'Preenchimento Automático',
                    readOnly: true
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
                    fieldStyle: 'text-align:right'
                }, {
                    xtype: 'numberfield',
                    name: 'ValorTotal',
                    align: 'right',
                    format: '0,000.00',
                    fieldLabel: 'Valor Total (R$)',
                    itemId: 'txtValorTotal',
                    fieldStyle: 'text-align:right',
                    emptyText: 'Preenchimento Automático',
                    readOnly: true
                }, {
                    xtype: 'htmleditor',
                    name: 'Observacao',
                    rows: 7,
                    itemId: 'txtObservacao',
                    fieldLabel: 'Observação'
                }, {
                    xtype: 'servico-gridCustos',
                    title: 'Custos',
                    flex: 1,
                    height: 300,
                    minHeight: 300,
                    statusId: me.statusId,
                    panel: me.panel,
                    border: 1,
                    margin: '0 5 0 0'
                }]
            }, {
                xtype: 'servico-tabPanel',
                flex: 1,
                margin: '0 0 0 0',
                statusId: me.statusId,
                panel: me.panel
            }, {
                xtype: 'tcc-mascaraTab',
                itemId: 'servicoMasc',
                flex: 1,
                margin: '0 0 0 0',
                width: '100%',
                height: '100%'
            }]
        });

        me.callParent(arguments);
    }
});