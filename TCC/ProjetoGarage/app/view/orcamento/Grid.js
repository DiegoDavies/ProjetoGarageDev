Ext.define('ProjetoGarage.view.orcamento.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'orcamento-grid',
    requires: [
        'ProjetoGarage.view.orcamento.Panel'
    ],
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            nomeExcel: 'Orçamentos',
            store: Ext.create('ProjetoGarage.store.orcamento.Store'),
            columns: [{
                text: 'Status',
                width: 120,
                style: 'text-align: center;',
                dataIndex: 'StatusNome'
            }, {
                text: 'Número',
                flex: 1,
                minWidth: 100,
                style: 'text-align: center;',
                dataIndex: 'Numero'
            }, {
                text: 'Cliente',
                flex: 1,
                minWidth: 200,
                style: 'text-align: center;',
                dataIndex: 'ClienteNome'
            }, {
                xtype: 'datecolumn',
                text: 'Data do Orçamento',
                width: 150,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y',
                dataIndex: 'DataRealizacao'
            }, {
                xtype: 'datecolumn',
                text: 'Data Vencimento',
                width: 150,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y',
                dataIndex: 'DataVencimento'
            }, {
                text: 'Duração',
                style: 'text-align: center;',
                width: 150,
                dataIndex: 'Duracao'
            }, {
                xtype: 'numbercolumn',
                format: '0,000.00',
                align: 'right',
                style: 'text-align: center;',
                text: 'Valor Total',
                width: 120,
                dataIndex: 'ValorTotal',
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, field) {
                    return Ext.util.Format.number(me.store.sum('ValorTotal'), '0,000.00');
                }
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
                dataIndex: 'StatusNome',
                nomeExcel: 'Status'
            }, {
                dataIndex: 'Numero',
                nomeExcel: 'Número'
            }, {
                dataIndex: 'ClienteNome',
                nomeExcel: 'Cliente'
            }, {
                dataIndex: 'DataRealizacao',
                nomeExcel: 'Data do Orçamento',
                formatoExcel: 'Data'
            }, {
                dataIndex: 'DataVencimento',
                nomeExcel: 'Data Vencimento',
                formatoExcel: 'Data'
            }, {
                dataIndex: 'Duracao',
                nomeExcel: 'Duração'
            }, {
                dataIndex: 'ValorTotal',
                nomeExcel: 'Valor Total',
                formatoExcel: 'Moeda'
            }, {
                dataIndex: 'Observacao',
                nomeExcel: 'Observação'
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

        window.viewport.tabPanelPrincipal.add({
            xtype: 'orcamento-panel',
            title: 'Orçamento: ' + record.get('Numero'),
            closable: true,
            tabPrincipal: window.viewport.tabPanelPrincipal,
            itemId: 'Orcamento' + record.get('OrcamentoId'),
            tratamento: 'AEORÇA',
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
        window.viewport.tabPanelPrincipal.setActiveTab('Orcamento' + record.get('OrcamentoId'));
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        window.viewport.tabPanelPrincipal.add({
            xtype: 'orcamento-panel',
            title: 'Cadastro de Orçamento',
            closable: true,
            tabPrincipal: window.viewport.tabPanelPrincipal,
            itemId: 'CadastroOrcamento',
            tratamento: 'CEORÇA',
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
        window.viewport.tabPanelPrincipal.setActiveTab('CadastroOrcamento');
        return false;
    }
});