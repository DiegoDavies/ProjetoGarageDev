﻿Ext.define('ProjetoGarage.view.produto.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'produto-grid',
    requires: [
        'ProjetoGarage.view.produto.Panel'
    ],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            nomeExcel: 'Produtos',
            store: Ext.create('ProjetoGarage.store.produto.Store'),
            columns: [{
                text: 'Nome',
                flex: 1,
                minWidth: 250,
                style: 'text-align: center;',
                dataIndex: 'Nome'
            }, {
                text: 'Modelo',
                width: 120,
                style: 'text-align: center;',
                dataIndex: 'ModeloProdutoNome'
            }, {
                text: 'Marca',
                width: 150,
                style: 'text-align: center;',
                dataIndex: 'MarcaProdutoNome'
            }, {
                text: 'Grupo Compra',
                width: 150,
                style: 'text-align: center;',
                dataIndex: 'GrupoCompraNome'
            }, {
                text: 'Unidade Medida',
                width: 150,
                style: 'text-align: center;',
                dataIndex: 'UnidadeMedidaNome'
            }, {
                xtype: 'numbercolumn',
                format: '0,000.00',
                align: 'right',
                style: 'text-align: center;',
                text: 'Valor Compra',
                width: 120,
                dataIndex: 'ValorCompra'
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

        me.tela.tabPrincipal.add({
            xtype: 'produto-panel',
            title: 'Produto: ' + record.get('Nome'),
            closable: true,
            tabPrincipal: me.tela.tabPrincipal,
            itemId: 'Produto' + record.get('produtoId'),
            tratamento: 'AEPROD',
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
        me.tela.tabPrincipal.setActiveTab('Produto' + record.get('produtoId'));
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        me.tela.tabPrincipal.add({
            xtype: 'produto-panel',
            title: 'Cadastro de Produto',
            closable: true,
            tabPrincipal: me.tela.tabPrincipal,
            itemId: 'CadastroProduto',
            tratamento: 'CEPROD',
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
        me.tela.tabPrincipal.setActiveTab('CadastroProduto');
        return false;
    }
});