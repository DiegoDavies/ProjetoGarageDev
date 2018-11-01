Ext.define('ProjetoGarage.view.produto.Form', {
    extend: 'Ext.form.Panel',
    requires: [
        'ProjetoGarage.view.produto.TabPanelFilho'
    ],
    xtype: 'produto-form',
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
                    labelWidth: 120,
                    width: 390
                },
                items: [{
                    xtype: 'textfield',
                    name: 'Nome',
                    fieldLabel: 'Nome *',
                    itemId: 'txtNome',
                    allowBlank: false
                }, {
                    xtype: 'tcc-combo',
                    name: 'ModeloProdutoId',
                    fieldLabel: 'Modelo',
                    itemId: 'cboModeloProduto',
                    displayField: 'Nome',
                    valueField: 'ModeloProdutoId',
                    store: Ext.create('ProjetoGarage.store.combos.ModeloProduto')
                }, {
                    xtype: 'tcc-combo',
                    name: 'MarcaProdutoId',
                    fieldLabel: 'Marca',
                    itemId: 'cboMarcaProduto',
                    displayField: 'Nome',
                    valueField: 'MarcaProdutoId',
                    store: Ext.create('ProjetoGarage.store.combos.MarcaProduto')
                }, {
                    xtype: 'tcc-combo',
                    name: 'GrupoCompraId',
                    fieldLabel: 'Grupo de Compra',
                    itemId: 'cboGrupoCompra',
                    displayField: 'Nome',
                    valueField: 'GrupoCompraId',
                    store: Ext.create('ProjetoGarage.store.combos.GrupoCompra')
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
                    name: 'ValorCompra',
                    align: 'right',
                    format: '0,000.00',
                    fieldLabel: 'Valor Compra',
                    itemId: 'txtValorCompra',
                    fieldStyle: 'text-align: right'
                }, {
                    xtype: 'htmleditor',
                    name: 'Especificacao',
                    fieldLabel: 'Especificação Técnica',
                    itemId: 'txtEspecificacao',
                    rows: 3
                }, {
                    xtype: 'htmleditor',
                    name: 'Observacao',
                    fieldLabel: 'Observação',
                    itemId: 'txtObservacao',
                    rows: 3
                }]
            }, {
                xtype: 'produto-tabPanel',
                flex: 1,
                hidden: true,
                margin: '0 0 0 0',
                panel: me.panel
            }, {
                xtype: 'tcc-mascaraTab',
                itemId: 'produtoMasc',
                flex: 1,
                margin: '0 0 0 0',
                width: '100%',
                height: '100%'
            }]
        });

        me.callParent(arguments);
    }
});