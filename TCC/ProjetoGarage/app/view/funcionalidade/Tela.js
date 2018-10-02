Ext.define('ProjetoGarage.view.funcionalidade.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.funcionalidade.Grid'
    ],
    xtype: 'funcionalidade-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'funcionalidade-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});