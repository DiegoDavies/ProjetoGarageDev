Ext.define('ProjetoGarage.view.orcamento.Form', {
    extend: 'Ext.form.Panel',
    requires: [
        'ProjetoGarage.view.orcamento.TabPanelFilho',
        'ProjetoGarage.view.orcamento.GridCustos'
    ],
    xtype: 'orcamento-form',
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
                    labelWidth: 80,
                    width: 350
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
                    store: Ext.create('ProjetoGarage.store.combos.Cliente')
                }, {
                    xtype: 'datefield',
                    altFormats: 'd/m/Y|dmy|dmY',
                    format: 'd/m/Y',
                    name: 'DataVencimento',
                    fieldLabel: 'Data Limite',
                    itemId: 'dtDataVencimento'
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
                    itemId: 'txtDuracao'
                }, {
                    xtype: 'htmleditor',
                    name: 'Observacao',
                    rows: 7,
                    itemId: 'txtObservacao',
                    fieldLabel: 'Observação'
                }, {
                    xtype: 'orcamento-gridCustos',
                    title: 'Custos',
                    flex: 1,
                    height: 300,
                    minHeight: 300,
                    statusId: me.statusId,
                    border: 1,
                    margin: '0 5 0 0'
                }]
            }, {
                xtype: 'orcamento-tabPanel',
                flex: 1,
                margin: '0 0 0 0',
                panel: me.panel
            }, {
                xtype: 'tcc-mascaraTab',
                itemId: 'orcamentoMasc',
                flex: 1,
                margin: '0 0 0 0',
                width: '100%',
                height: '100%'
            }]
        });

        me.callParent(arguments);
    }
});