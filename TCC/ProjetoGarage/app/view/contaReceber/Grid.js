Ext.define('ProjetoGarage.view.contaReceber.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'contaReceber-grid',
    requires: [
        'ProjetoGarage.view.contaReceber.Panel'
    ],
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            nomeExcel: 'Contas à Receber',
            store: Ext.create('ProjetoGarage.store.contaReceber.Store'),
            columns: [{
                text: 'Documento',
                flex: 1,
                minWidth: 200,
                style: 'text-align: center;',
                dataIndex: 'Documento'
            }, {
                text: 'Beneficiário',
                flex: 1,
                minWidth: 200,
                style: 'text-align: center;',
                dataIndex: 'BeneficiarioNome'
            }, {
                xtype: 'datecolumn',
                text: 'Data Vencimento',
                width: 150,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y',
                dataIndex: 'DataVencimento'
            }, {
                xtype: 'numbercolumn',
                format: '0,000.00',
                align: 'right',
                style: 'text-align: center;',
                text: 'Valor',
                width: 120,
                dataIndex: 'Valor',
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, field) {
                    return Ext.util.Format.number(me.store.sum('Valor'), '0,000.00');
                }
            }, {
                xtype: 'datecolumn',
                text: 'Data Recebimento',
                width: 150,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y',
                dataIndex: 'DataRecebimento'
            }, {
                xtype: 'numbercolumn',
                format: '0,000.00',
                align: 'right',
                style: 'text-align: center;',
                text: 'Valor Recebido',
                width: 120,
                dataIndex: 'ValorRecebido',
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, field) {
                    return Ext.util.Format.number(me.store.sum('ValorRecebido'), '0,000.00');
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
                dataIndex: 'Documento',
                nomeExcel: 'Documento'
            }, {
                dataIndex: 'BeneficiarioNome',
                nomeExcel: 'Beneficiário'
            }, {
                dataIndex: 'DataVencimento',
                nomeExcel: 'Data Vencimento',
                formatoExcel: 'Data'
            }, {
                dataIndex: 'Valor',
                nomeExcel: 'Valor',
                formatoExcel: 'Moeda'
            }, {
                dataIndex: 'DataRecebimento',
                nomeExcel: 'Data Recebimento',
                formatoExcel: 'Data'
            }, {
                dataIndex: 'ValorRecebido',
                nomeExcel: 'Valor Recebido',
                formatoExcel: 'Moeda'
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
            xtype: 'contaReceber-panel',
            title: 'Conta à Receber: ' + record.get('Documento'),
            closable: true,
            tabPrincipal: window.viewport.tabPanelPrincipal,
            itemId: 'contaReceber' + record.get('ContaReceberId'),
            tratamento: 'AECREC',
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
        window.viewport.tabPanelPrincipal.setActiveTab('contaReceber' + record.get('ContaReceberId'));
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        window.viewport.tabPanelPrincipal.add({
            xtype: 'contaReceber-panel',
            title: 'Cadastro de Conta à Receber',
            closable: true,
            tabPrincipal: window.viewport.tabPanelPrincipal,
            itemId: 'CadastroContaReceber',
            tratamento: 'CECREC',
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
        window.viewport.tabPanelPrincipal.setActiveTab('CadastroContaReceber');
        return false;
    }
});