Ext.define('ProjetoGarage.view.servico.GridProduto', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'servico-gridProduto',
    requires: [
        //'ProjetoGarage.view.servico.WindowDependente'
    ],
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

        me.btnDelete.on({
            scope: me,
            click: me.onBtnDeleteClick
        });
    },
    onBoxReady: function () {
        var me = this;

        me.btnRelatorio.hide();
        me.toolbar.hide();
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        //Ext.create('ProjetoGarage.view.servico.WindowDependente', {
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

        //Ext.create('ProjetoGarage.view.servico.WindowDependente', {
        //    title: 'Cadastro de Dependente',
        //    extraData: {
        //        formType: 'Cadastrar',
        //        grid: me
        //    }
        //}).show();
        //return false;
    },
    onBtnDeleteClick: function () {
        var me = this,
            selection = me.getView().getSelectionModel().getSelection()[0];

        if (selection) {
            if (selection.get('Delete')) {
                Ext.Msg.show({
                    title: 'Validação',
                    msg: 'Deseja realmente prosseguir com a operação?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.store.remove(selection);
                            me.store.sync({
                                success: function () {
                                    me.store.load();
                                },
                                failure: function () {
                                    me.store.rejectChanges();
                                }
                            });
                        }
                    }
                });
            } else {
                Ext.Msg.show({
                    title: 'Informação',
                    msg: 'Impossível deletar esse item',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
            }
        }
    }
});