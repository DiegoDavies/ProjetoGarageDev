Ext.define('ProjetoGarage.view.contaReceber.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.contaReceber.Grid'
    ],
    xtype: 'contaReceber-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'contaReceber-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});