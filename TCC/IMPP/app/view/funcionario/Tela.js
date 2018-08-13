Ext.define('ProjetoGarage.view.funcionario.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.funcionario.Grid'
    ],
    xtype: 'funcionario-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'funcionario-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});