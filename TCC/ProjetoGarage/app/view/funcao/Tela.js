Ext.define('ProjetoGarage.view.funcao.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.funcao.Grid'
    ],
    xtype: 'funcao-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'funcao-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});