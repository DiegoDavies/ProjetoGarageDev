Ext.define('ProjetoGarage.view.etnia.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.etnia.Grid'
    ],
    xtype: 'etnia-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'etnia-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});