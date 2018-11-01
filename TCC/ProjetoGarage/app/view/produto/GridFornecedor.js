Ext.define('ProjetoGarage.view.produto.GridFornecedor', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'produto-gridFornecedor',
    requires: [
        'ProjetoGarage.view.produto.WindowFornecedor'
    ],
    esconderAtualizar: false,
    esconderPaging: true,
    esconderRelatorio: true,
    esconderPesquisa: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.produto.Fornecedor'),
            columns: [{
                text: 'Fornecedor',
                flex: 1,
                minWidth: 200,
                style: 'text-align: center;',
                dataIndex: 'Fornecedor'
            }, {
                text: 'Nome',
                flex: 1,
                minWidth: 200,
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
            itemdblclick: me.onItemDblClick
        });

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        Ext.create('ProjetoGarage.view.produto.WindowFornecedor', {
            title: 'Fornecedor: ' + record.get('Fornecedor'),
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

        Ext.create('ProjetoGarage.view.produto.WindowFornecedor', {
            title: 'Vínculo de Fornecedor',
            extraData: {
                formType: 'Cadastrar',
                grid: me,
                texto: me.panel.txtNome.getValue()
            }
        }).show();
        return false;
    }
});