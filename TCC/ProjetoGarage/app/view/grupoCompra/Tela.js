Ext.define('ProjetoGarage.view.grupoCompra.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.grupoCompra.Grid'
    ],
    xtype: 'grupoCompra-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'grupoCompra-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});