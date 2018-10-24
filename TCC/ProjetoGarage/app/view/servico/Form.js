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
                width: 370,
                border: 5,
                height: '100%',
                layout: 'vbox',
                autoScroll: true,
                defaults: {
                    labelWidth: 110,
                    width: 350,
                    readOnly: true
                },
                items: [{
                    xtype: 'textfield',
                    name: 'Numero',
                    fieldLabel: 'Número',
                    itemId: 'txtNumero'
                }, {
                    xtype: 'textfield',
                    name: 'ClienteNome',
                    fieldLabel: 'Cliente',
                    itemId: 'txtCliente'
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
                    itemId: 'dtDataInicio'
                }, {
                    xtype: 'datefield',
                    altFormats: 'd/m/Y|dmy|dmY',
                    format: 'd/m/Y',
                    name: 'DataFinalizacao',
                    fieldLabel: 'Data Finalização',
                    itemId: 'dtDataFinalizacao'
                }, {
                    xtype: 'numberfield',
                    name: 'Duracao',
                    align: 'right',
                    format: '0,000',
                    fieldLabel: 'Duração (Dias)',
                    itemId: 'txtDuracao',
                    fieldStyle: 'text-align:right'
                }, {
                    xtype: 'numberfield',
                    name: 'ValorTotal',
                    align: 'right',
                    format: '0,000.00',
                    fieldLabel: 'Valor Total (R$)',
                    itemId: 'txtValorTotal',
                    fieldStyle: 'text-align:right'
                }, {
                    xtype: 'servico-gridCustos',
                    title: 'Custos',
                    flex: 1,
                    minHeight: 250,
                    border: 10,
                    margin: '0 5 5 0'
                }]
            }, {
                xtype: 'servico-tabPanel',
                flex: 1,
                margin: '0 0 0 0',
                panel: me.panel
            }]
        });

        me.callParent(arguments);
    }
});