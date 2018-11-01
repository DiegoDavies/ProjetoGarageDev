Ext.define('ProjetoGarage.view.produto.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.produto.Grid'
    ],
    xtype: 'produto-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'produto-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});