Ext.define('ProjetoGarage.view.statusFornecedor.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.statusFornecedor.Grid'
    ],
    xtype: 'statusFornecedor-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'statusFornecedor-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});