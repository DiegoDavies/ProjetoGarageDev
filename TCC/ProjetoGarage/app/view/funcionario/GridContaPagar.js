Ext.define('ProjetoGarage.view.funcionario.GridContaPagar', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'funcionario-gridContaPagar',
    requires: [
        'ProjetoGarage.view.funcionario.WindowContaPagar',
        'ProjetoGarage.view.contaPagar.Panel'
    ],
    esconderAtualizar: false,
    esconderRelatorio: true,
    esconderPesquisa: true,
    esconderPaging: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.funcionario.ContaPagar'),
            columns: [{
                text: 'Documento',
                flex: 1,
                minWidth: 200,
                style: 'text-align: center;',
                dataIndex: 'Documento'
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
                text: 'Data Pagamento',
                width: 150,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y',
                dataIndex: 'DataPagamento'
            }, {
                xtype: 'numbercolumn',
                format: '0,000.00',
                align: 'right',
                style: 'text-align: center;',
                text: 'Valor Pago',
                width: 120,
                dataIndex: 'ValorPago',
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, field) {
                    return Ext.util.Format.number(me.store.sum('ValorPago'), '0,000.00');
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

        window.viewport.tabPanelPrincipal.add({
            xtype: 'contaPagar-panel',
            title: 'Conta à Pagar: ' + record.get('Documento'),
            closable: true,
            tabPrincipal: window.viewport.tabPanelPrincipal,
            itemId: 'ContaPagar' + record.get('ContaPagarId'),
            tratamento: 'AECPAG',
            extraData: {
                formType: 'Alterar',
                grid: me,
                record: record,
                isFornFunc: true
            },
            listeners: {
                scope: me,
                beforeclose: function () {
                    this.getStore().load();
                }
            }
        });
        window.viewport.tabPanelPrincipal.setActiveTab('ContaPagar' + record.get('ContaPagarId'));
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        Ext.create('ProjetoGarage.view.funcionario.WindowContaPagar', {
            title: 'Cadastro de Conta à Pagar',
            tratamento: 'CECPAG',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    }
});