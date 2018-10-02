Ext.define('ProjetoGarage.view.duracao.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.duracao.Grid'
    ],
    xtype: 'duracao-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'duracao-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});