Ext.define('ProjetoGarage.view.banco.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'banco-grid',
    requires: [
        'ProjetoGarage.view.banco.Window'
    ],
    esconderRelatorio: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.banco.Store'),
            columns: [{
                text: 'Código Banco',
                width: 130,
                align: 'center',
                style: 'text-align: center;',
                dataIndex: 'Codigo'
            }, {
                text: 'Nome',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Nome'
            }, {
                text: 'Inclusão',
                style: 'text-align: center;',
                columns: [{
                    text: 'Usuário',
                    sortable: true,
                    style: 'text-align: center;',
                    dataIndex: 'UsuarioNomeInclusao'
                }, {
                    xtype: 'datecolumn',
                    sortable: true,
                    text: 'Data Hora',
                    width: 150,
                    align: 'center',
                    style: 'text-align: center;',
                    format: 'd/m/Y H:i:s',
                    dataIndex: 'DataHoraInclusao'
                }]
            }, {
                text: 'Alteração',
                style: 'text-align: center;',
                columns: [{
                    text: 'Usuário',
                    sortable: true,
                    style: 'text-align: center;',
                    dataIndex: 'UsuarioNomeAlteracao'
                }, {
                    xtype: 'datecolumn',
                    sortable: true,
                    text: 'Data Hora',
                    width: 150,
                    align: 'center',
                    style: 'text-align: center;',
                    format: 'd/m/Y H:i:s',
                    dataIndex: 'DataHoraAlteracao'
                }]
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.btnNovo = me.down('#btnNovoGrid');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            itemdblclick: me.onItemDblClick,
            boxready: me.onBoxReady
        });

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });
    },
    onBoxReady: function () {
        var me = this;

        me.store.load();
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        Ext.create('ProjetoGarage.view.banco.Window', {
            title: 'Banco: ' + record.get('Nome'),
            tratamento: 'AGBANC',
            extraData: {
                formType: 'Alterar',
                grid: me,
                record: record
            }
        }).show();
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        Ext.create('ProjetoGarage.view.banco.Window', {
            title: 'Cadastro de Banco',
            tratamento: 'CGBANC',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    }
});