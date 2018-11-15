Ext.define('ProjetoGarage.view.funcionario.GridPagamento', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'funcionario-gridPagamento',
    requires: [
        'ProjetoGarage.view.funcionario.WindowPagamento'
    ],
    esconderAtualizar: false,
    esconderPesquisa: true,
    esconderRelatorio: true,
    esconderPaging: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.funcionario.Pagamento'),
            columns: [{
                text: 'Nome',
                flex: 1,
                minWidth: 150,
                style: 'text-align: center;',
                dataIndex: 'Nome'
            }, {
                text: 'Banco',
                flex: 1,
                minWidth: 150,
                style: 'text-align: center;',
                dataIndex: 'BancoNome'
            }, {
                text: 'Agencia',
                width: 150,
                style: 'text-align: center;',
                dataIndex: 'Agencia'
            }, {
                text: 'Conta',
                width: 150,
                style: 'text-align: center;',
                dataIndex: 'Conta'
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

        Ext.create('ProjetoGarage.view.funcionario.WindowPagamento', {
            title: 'Conta: ' + record.get('Nome'),
            tratamento: 'AOBANC',
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

        Ext.create('ProjetoGarage.view.funcionario.WindowPagamento', {
            title: 'Cadastro de Conta',
            tratamento: 'COBANC',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    }
});