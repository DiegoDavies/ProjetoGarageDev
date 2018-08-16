Ext.define('ProjetoGarage.view.banco.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.banco.Grid'
    ],
    xtype: 'banco-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'banco-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});