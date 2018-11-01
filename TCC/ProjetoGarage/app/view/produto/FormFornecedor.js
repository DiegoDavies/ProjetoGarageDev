Ext.define('ProjetoGarage.view.produto.FormFornecedor', {
    extend: 'Ext.form.Panel',
    xtype: 'produto-formFornecedor',
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
                xtype: 'tcc-combo',
                name: 'FornecedorId',
                fieldLabel: 'Fornecedor *',
                itemId: 'cboFornecedor',
                displayField: 'Nome',
                valueField: 'FornecedorId',
                store: Ext.create('ProjetoGarage.store.combos.Fornecedor'),
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'Nome',
                fieldLabel: 'Nome *',
                itemId: 'txtNome',
                allowBlank: false
            }]
        });

        me.callParent(arguments);
    }
});