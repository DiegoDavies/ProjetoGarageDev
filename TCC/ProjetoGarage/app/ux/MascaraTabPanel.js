Ext.define('ProjetoGarage.ux.MascaraTabPanel', {
    extend: 'Ext.container.Container',
    xtype: 'tcc-mascaraTab',
    width: '100%',
    height: '100%',
    initComponent: function () {

        Ext.apply(this, {
        });

        this.callParent(arguments);
        this.addEventHandler();
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            boxready: me.onBoxReadyMasc
        });
    },
    onBoxReadyMasc: function () {
        var me = this;

        me.update(
        '<div>' +
            '<div style="position: absolute; top: 50%; left: 50%; -moz-transform: translateX(-50%) translateY(-50%); -webkit-transform: translateX(-50%) translateY(-50%); transform: translateX(-50%) translateY(-50%);">' +
                '<img src=/resources/images/information.png width:"126" height:"126">' +
            '</div>' +
            '<div style="padding-left: 20px; padding-right: 20px; text-align: center;">' +
                '</br></br>' +
                '<span style="font-size:25px;text">Para acesso aos demais cadastros, preencha as informações ao lado e clique no botão Salvar</span>' +
            '</div>' +
        '</div>');
    }
});