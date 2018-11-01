Ext.define('ProjetoGarage.view.marcaProduto.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.marcaProduto.Grid'
    ],
    xtype: 'marcaProduto-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'marcaProduto-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});