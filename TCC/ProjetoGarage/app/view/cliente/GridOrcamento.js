Ext.define('ProjetoGarage.view.cliente.GridOrcamento', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'cliente-gridOrcamento',
    requires: [
        //'ProjetoGarage.view.cliente.WindowOrcamento'
    ],
    esconderAtualizar: false,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.cliente.Orcamento'),
            columns: [{
                text: 'Código',
                width: 100,
                align: 'center',
                style: 'text-align: center;',
                dataIndex: 'ClienteOrcamentoId',
                hidden: true,
                hideable: false
            }, {
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

        me.toolbar = me.down('#pagingToolbarGrid');
        me.btnNovo = me.down('#btnNovoGrid');
        me.btnDelete = me.down('#btnDeleteGrid');
        me.btnRelatorio = me.down('#btnRelatorioGrid');
        me.txtQuery = me.down('#queryField');
        me.btnPesquisar = me.down('#btnPesquisarGrid');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            boxready: me.onBoxReady,
            itemdblclick: me.onItemDblClick
        });

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });
    },
    onBoxReady: function () {
        var me = this;

        me.toolbar.hide();
        me.btnRelatorio.hide();
        me.txtQuery.hide();
        me.btnPesquisar.hide();
        me.store.load();
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        Ext.create('ProjetoGarage.view.cliente.WindowOrcamento', {
            title: 'Serviço: ' + record.get('Nome'),
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

        Ext.create('ProjetoGarage.view.cliente.WindowOrcamento', {
            title: 'Cadastro de Serviço',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    }
});