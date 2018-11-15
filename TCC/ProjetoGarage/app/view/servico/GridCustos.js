Ext.define('ProjetoGarage.view.servico.GridCustos', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'servico-gridCustos',
    requires: [
        'ProjetoGarage.view.servico.WindowCustos'
    ],
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    esconderPaging: true,
    esconderRelatorio: true,
    esconderPesquisa: true,
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.servico.Custos'),
            columns: [{
                text: 'Descrição',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Descricao',
                summaryRenderer: function (value, summaryData, field) {
                    return '<b>Valor Total:</b>';
                }
            }, {
                xtype: 'numbercolumn',
                format: '0,000.00',
                align: 'right',
                style: 'text-align: center;',
                text: 'Valor',
                width: 110,
                dataIndex: 'Valor',
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, field) {
                    var somar = 0;
                    Ext.each(me.store.data.items, function (item) {
                        if (item.get('Desconto') && item.get('Valor') > 0) {
                            somar -= item.get('Valor');
                        } else {
                            somar += item.get('Valor');
                        }
                    });
                    me.panel.extraData.record.set('ValorTotal', somar);
                    me.panel.txtValorTotal.setValue(Ext.util.Format.number(somar, '000.00'));
                    return '<b>' + Ext.util.Format.number(somar, '0,000.00') + '</b>';
                },
                renderer: function (val, metaData, record) {
                    var tool = '';
                    if (record.get('Descricao') !== 'Produtos' && (me.statusId === 1 || me.statusId === 2)) {
                        tool = '1 clique para editar o valor';
                    }
                    metaData.tdAttr = 'data-qtip="' + tool + '"';
                    return Ext.util.Format.number(val, '0,000.00');
                },
                editor: {
                    xtype: 'numberfield',
                    format: '0,000.00',
                    fieldStyle: 'text-align:right'
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
            boxready: me.onBoxReady,
            itemdblclick: me.onItemDblClick,
            edit: me.onEdit,
            beforeedit: me.onBeforeEdit
        });

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });

        me.btnDelete.on({
            scope: me,
            click: me.onBtnDeleteClick
        });

        me.store.on({
            scope: me,
            load: me.onStoreLoadCusto
        });
    },
    onBoxReady: function () {
        var me = this;

        if (me.statusId !== 1 && me.statusId !== 2) {
            me.btnNovo.up().hide();
        } else {
            me.btnNovo.up().show();
        }
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        if (!record.get('Delete') && me.statusId === 1) {
            Ext.create('ProjetoGarage.view.servico.WindowCustos', {
                title: 'Custo: ' + record.get('Descricao'),
                tratamento: 'AOCUST',
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

        if (me.statusId === 1) {
            Ext.create('ProjetoGarage.view.servico.WindowCustos', {
                title: 'Cadastro de Custo',
                tratamento: 'COCUST',
                extraData: {
                    formType: 'Cadastrar',
                    grid: me
                }
            }).show();
        }
        return false;
    },
    onBtnDeleteClick: function () {
        var me = this,
            selection = me.getView().getSelectionModel().getSelection()[0];

        if (selection && me.statusId === 1) {
            if (!selection.get('Delete')) {
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
    },
    onEdit: function (editor, context, eOpts) {
        var me = this;

        if (context.record.get('Desconto') && context.record.get('Valor') > 0) {
            context.record.set('Valor', context.record.get('Valor') * -1);
        }
        me.store.sync();
    },
    onBeforeEdit: function (editor, context, eOpts) {
        var me = this;

        if (context.record.get('Descricao') === 'Produtos' || me.statusId !== 1) {
            return false;
        }
        return true;
    },
    onStoreLoadCusto: function (store, records, successfull, eOpts) {
        var me = this,
            storeProduto = me.panel.tabPanel.gridProduto.store;

        if (records.length > 0 && storeProduto.data.length > 0) {
            var recordIndex = store.find('Descricao', 'Produtos');
            store.data.items[recordIndex].set('Valor', storeProduto.sum('ValorTotal'));
        }
    }
});