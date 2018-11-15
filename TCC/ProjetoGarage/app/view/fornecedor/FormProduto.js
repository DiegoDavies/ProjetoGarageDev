Ext.define('ProjetoGarage.view.fornecedor.FormProduto', {
    extend: 'Ext.form.Panel',
    xtype: 'fornecedor-formProduto',
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
                width: 360,
                labelWidth: 70
            },
            items: [{
                xtype: 'tcc-combo',
                name: 'ProdutoId',
                fieldLabel: 'Produto *',
                itemId: 'cboProduto',
                displayField: 'Nome',
                valueField: 'ProdutoId',
                store: Ext.create('ProjetoGarage.store.combos.Produto'),
                allowBlank: false
            }]
        });

        me.callParent(arguments);
    }
});