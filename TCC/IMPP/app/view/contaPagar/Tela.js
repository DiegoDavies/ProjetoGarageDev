Ext.define('ProjetoGarage.view.contaPagar.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.contaPagar.Grid'
    ],
    xtype: 'contaPagar-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'contaPagar-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});