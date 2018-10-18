Ext.define('ProjetoGarage.view.fornecedor.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'fornecedor-grid',
    requires: [
        'ProjetoGarage.view.fornecedor.Panel'
    ],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            nomeExcel: 'Fornecedores',
            store: Ext.create('ProjetoGarage.store.fornecedor.Store'),
            columns: [{
                text: 'Código',
                width: 100,
                align: 'center',
                style: 'text-align: center;',
                dataIndex: 'FornecedorId',
                hidden: true,
                hideable: false
            }, {
                text: 'Razão Social',
                flex: 1,
                minWidth: 300,
                style: 'text-align: center;',
                dataIndex: 'RazaoSocial'
            }, {
                text: 'CNPJ',
                width: 150,
                style: 'text-align: center;',
                dataIndex: 'Cnpj'
            }, {
                text: 'Status',
                width: 120,
                style: 'text-align: center;',
                dataIndex: 'StatusNome'
            }, {
                text: 'Email',
                width: 180,
                style: 'text-align: center;',
                dataIndex: 'Email'
            }, {
                text: 'Telefone',
                width: 130,
                style: 'text-align: center;',
                dataIndex: 'Telefone'
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
            }],
            columnsExcel: [{
                dataIndex: 'RazaoSocial',
                nomeExcel: 'Razão Social'
            }, {
                dataIndex: 'Cnpj',
                nomeExcel: 'CNPJ'
            }, {
                dataIndex: 'StatusNome',
                nomeExcel: 'Status'
            }, {
                dataIndex: 'Email',
                nomeExcel: 'Email'
            }, {
                dataIndex: 'Telefone',
                nomeExcel: 'Telefone'
            }, {
                dataIndex: 'UsuarioNomeInclusao',
                nomeExcel: 'Usuário Inclusão'
            }, {
                dataIndex: 'DataHoraInclusao',
                nomeExcel: 'Data Hora Inclusão',
                formatoExcel: 'Data'
            }, {
                dataIndex: 'UsuarioNomeAlteracao',
                nomeExcel: 'Usuário Alteração'
            }, {
                dataIndex: 'DataHoraAlteracao',
                nomeExcel: 'Data Hora Alteração',
                formatoExcel: 'Data'
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

        me.tela.tabPrincipal.add({
            xtype: 'fornecedor-panel',
            title: 'Fornecedor: ' + (record.get('Fantasia') !== '' ? record.get('Fantasia') : record.get('RazaoSocial')),
            closable: true,
            tabPrincipal: me.tela.tabPrincipal,
            itemId: 'Fornecedor' + record.get('FornecedorId'),
            extraData: {
                formType: 'Alterar',
                grid: me,
                record: record
            },
            listeners: {
                scope: me,
                beforeclose: function () {
                    this.getStore().load();
                }
            }
        });
        me.tela.tabPrincipal.setActiveTab('Fornecedor' + record.get('FornecedorId'));
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        me.tela.tabPrincipal.add({
            xtype: 'fornecedor-panel',
            title: 'Cadastro de Fornecedor',
            closable: true,
            tabPrincipal: me.tela.tabPrincipal,
            itemId: 'CadastroFornecedor',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            },
            listeners: {
                scope: me,
                beforeclose: function () {
                    this.getStore().load();
                }
            }
        });
        me.tela.tabPrincipal.setActiveTab('CadastroFornecedor');
        return false;
    }
});