Ext.define('ProjetoGarage.view.situacao.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.situacao.Grid'
    ],
    xtype: 'situacao-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'situacao-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});