Ext.define('ProjetoGarage.view.estadoCivil.Tela', {
    extend: 'Ext.container.Container',
    requires: [
        'ProjetoGarage.view.estadoCivil.Grid'
    ],
    xtype: 'estadoCivil-tela',
    width: '100%',
    height: '100%',
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'estadoCivil-grid',
                tela: me
            }]
        });

        me.callParent(arguments);
    }
});