Ext.define('ProjetoGarage.view.modeloProduto.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.modeloProduto.Grid'
    ],
    xtype: 'modeloProduto-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'modeloProduto-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});