Ext.define('ProjetoGarage.view.fornecedor.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.fornecedor.Grid'
    ],
    xtype: 'fornecedor-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'fornecedor-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});