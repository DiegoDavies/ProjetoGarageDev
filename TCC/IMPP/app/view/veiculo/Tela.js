Ext.define('ProjetoGarage.view.veiculo.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.veiculo.Grid'
    ],
    xtype: 'veiculo-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'veiculo-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});