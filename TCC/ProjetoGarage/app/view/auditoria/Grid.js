Ext.define('ProjetoGarage.view.auditoria.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'auditoria-grid',
    esconderRelatorio: true,
    esconderNew: true,
    esconderDelete: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.auditoria.Store'),
            columns: [{
                text: 'Usuário',
                width: 130,
                style: 'text-align: center;',
                dataIndex: 'UsuarioNome',
                sortable: false
            }, {
                xtype: 'datecolumn',
                text: 'Data Hora',
                width: 150,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y H:i:s',
                dataIndex: 'DataHora',
                sortable: false
            }, {
                text: 'Descrição',
                sortable: false,
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Descricao'
            }]
        });

        me.callParent(arguments);
        me.addEventHandler();
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            boxready: me.onBoxReady
        });
    },
    onBoxReady: function () {
        var me = this;

        me.store.load();
    }
});