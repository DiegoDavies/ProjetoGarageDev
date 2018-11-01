Ext.define('ProjetoGarage.view.orcamento.GridProduto', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'orcamento-gridProduto',
    requires: [
        //'ProjetoGarage.view.orcamento.WindowDependente'
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
            store: Ext.create('ProjetoGarage.store.orcamento.Produto'),
            columns: [{
                text: 'Descrição',
                flex: 1,
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
                text: '',
                width: 10
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
            itemdblclick: me.onItemDblClick
        });

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        //Ext.create('ProjetoGarage.view.orcamento.WindowDependente', {
        //    title: 'Dependente ' + record.get('Nome'),
        //    extraData: {
        //        formType: 'Alterar',
        //        grid: me,
        //        record: record
        //    }
        //}).show();
        //return false;
        //var encontrado = me.tabPanel.panel.gridCustos.store.query('Descricao', 'Produtos');
        //encontrado.itens.itens.set('Valor', me.getStore().sum('ValorTotal'));
    },
    onBtnNovoClick: function () {
        var me = this;

        //Ext.create('ProjetoGarage.view.orcamento.WindowDependente', {
        //    title: 'Cadastro de Dependente',
        //    extraData: {
        //        formType: 'Cadastrar',
        //        grid: me
        //    }
        //}).show();
        //return false;
    }
});