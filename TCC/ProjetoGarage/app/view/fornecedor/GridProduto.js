Ext.define('ProjetoGarage.view.fornecedor.GridProduto', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'fornecedor-gridProduto',
    requires: [
        'ProjetoGarage.view.fornecedor.WindowProduto'
    ],
    esconderAtualizar: false,
    esconderPaging: true,
    esconderRelatorio: true,
    esconderPesquisa: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.fornecedor.Produto'),
            columns: [{
                text: 'Produto',
                flex: 1,
                minWidth: 200,
                style: 'text-align: center;',
                dataIndex: 'Produto'
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
            itemdblclick: me.onItemDblClick
        });

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        Ext.create('ProjetoGarage.view.fornecedor.WindowProduto', {
            title: 'Produto: ' + record.get('Produto'),
            tratamento: 'AOPROD',
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

        Ext.create('ProjetoGarage.view.fornecedor.WindowProduto', {
            title: 'Vínculo de Produto',
            tratamento: 'COPROD',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    }
});