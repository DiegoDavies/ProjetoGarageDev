Ext.define('ProjetoGarage.view.contaReceber.GridRecebimento', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'contaReceber-gridRecebimento',
    requires: [
        //'ProjetoGarage.view.contaReceber.WindowDependente'
    ],
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.contaReceber.Recebimento'),
            columns: [{
                text: 'Documento',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Documento'
            }, {
                text: 'Tipo de Pagamento',
                width: 160,
                style: 'text-align: center;',
                dataIndex: 'TipoPagamentoNome'
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
                width: 110,
                dataIndex: 'ValorPago',
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, field) {
                    return '<b>' + Ext.util.Format.number(me.store.sum('ValorPago'), '0,000.00') + '</b>';
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

        me.btnRelatorio.hide();
        me.toolbar.hide();
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        //Ext.create('ProjetoGarage.view.contaReceber.WindowDependente', {
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

        //Ext.create('ProjetoGarage.view.contaReceber.WindowDependente', {
        //    title: 'Cadastro de Dependente',
        //    extraData: {
        //        formType: 'Cadastrar',
        //        grid: me
        //    }
        //}).show();
        //return false;
    }
});