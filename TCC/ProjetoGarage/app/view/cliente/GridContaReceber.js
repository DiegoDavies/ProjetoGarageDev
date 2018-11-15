Ext.define('ProjetoGarage.view.cliente.GridContaReceber', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'cliente-gridContaReceber',
    requires: [
        'ProjetoGarage.view.cliente.WindowContaReceber'
    ],
    esconderAtualizar: false,
    esconderRelatorio: true,
    esconderPesquisa: true,
    esconderPaging: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.cliente.ContaReceber'),
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
            xtype: 'contaReceber-panel',
            title: 'Conta à Receber: ' + record.get('Documento'),
            closable: true,
            tabPrincipal: window.viewport.tabPanelPrincipal,
            itemId: 'contaReceber' + record.get('ContaReceberId'),
            tratamento: 'AECREC',
            extraData: {
                formType: 'Alterar',
                grid: me,
                record: record,
                isCliente: true
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

        Ext.create('ProjetoGarage.view.cliente.WindowContaReceber', {
            title: 'Cadastro de Conta à Receber',
            tratamento: 'CECREC',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    }
});