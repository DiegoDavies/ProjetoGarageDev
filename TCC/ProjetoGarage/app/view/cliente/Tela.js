Ext.define('ProjetoGarage.view.cliente.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.cliente.Grid'
    ],
    xtype: 'cliente-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'cliente-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});