Ext.define('ProjetoGarage.view.servico.GridProduto', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'servico-gridProduto',
    requires: [
        'ProjetoGarage.view.servico.WindowProduto'
    ],
    esconderAtualizar: false,
    esconderRelatorio: true,
    esconderPaging: true,
    esconderPesquisa: true,
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.servico.Produto'),
            columns: [{
                text: 'Descrição',
                flex: 1,
                minWidth: 200,
                style: 'text-align: center;',
                dataIndex: 'Descricao'
            }, {
                text: 'Unidade de Medida',
                width: 160,
                style: 'text-align: center;',
                dataIndex: 'UnidadeMedidaNome'
            }, {
                xtype: 'numbercolumn',
                format: '0,000.00',
                align: 'right',
                style: 'text-align: center;',
                text: 'Quantidade',
                width: 110,
                dataIndex: 'Quantidade',
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, field) {
                    return '<b>' + Ext.util.Format.number(me.store.sum('Quantidade'), '0,000.00') + '</b>';
                }
            }, {
                xtype: 'numbercolumn',
                format: '0,000.00',
                align: 'right',
                style: 'text-align: center;',
                text: 'Valor Unitario',
                width: 130,
                dataIndex: 'ValorUnitario',
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, field) {
                    return '<b>' + Ext.util.Format.number(me.store.sum('ValorUnitario'), '0,000.00') + '</b>';
                }
            }, {
                xtype: 'numbercolumn',
                format: '0,000.00',
                align: 'right',
                style: 'text-align: center;',
                text: 'Valor Total',
                width: 130,
                dataIndex: 'ValorTotal',
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, field) {
                    return '<b>' + Ext.util.Format.number(me.store.sum('ValorTotal'), '0,000.00') + '</b>';
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
        me.btnDelete = me.down('#btnDeleteGrid');
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

        me.store.on({
            scope: me,
            load: me.onLoadStoreProduto
        });
    },
    onBoxReady: function () {
        var me = this;

        if (me.tabPanel.statusId !== 1 && me.tabPanel.statusId !== 2) {
            me.btnNovo.up().hide();
        } else {
            me.btnNovo.up().show();
        }
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        if (me.tabPanel.statusId === 1 || me.tabPanel.statusId === 2) {
            Ext.create('ProjetoGarage.view.orcamento.WindowProduto', {
                title: 'Produto ' + record.get('Descricao'),
                tratamento: 'AOVIPR',
                extraData: {
                    formType: 'Alterar',
                    grid: me,
                    record: record
                }
            }).show();
        }
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        if (me.tabPanel.statusId === 1 || me.tabPanel.statusId === 2) {
            Ext.create('ProjetoGarage.view.orcamento.WindowProduto', {
                title: 'Vínculo de Produto',
                tratamento: 'COVIPR',
                extraData: {
                    formType: 'Cadastrar',
                    grid: me
                }
            }).show();
        }
        return false;
    },
    onLoadStoreProduto: function (store, records, successfull, eOpts) {
        var me = this,
            storeCusto = me.tabPanel.panel.gridCustos.store,
            recordIndex = storeCusto.find('Descricao', 'Produtos');

        if (records.length > 0 && storeCusto.data.length > 0) {
            storeCusto.data.items[recordIndex].set('Valor', me.store.sum('ValorTotal'));
        }
    }
});