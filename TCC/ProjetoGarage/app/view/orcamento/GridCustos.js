Ext.define('ProjetoGarage.view.orcamento.GridCustos', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'orcamento-gridCustos',
    requires: [
        'ProjetoGarage.view.orcamento.WindowCustos'
    ],
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    esconderPaging: true,
    esconderRelatorio: true,
    esconderPesquisa: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.orcamento.Custos'),
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
                    return '<b>' + Ext.util.Format.number(somar, '0,000.00') + '</b>';
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
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        if (!record.get('Delete')) {
            Ext.create('ProjetoGarage.view.orcamento.WindowCustos', {
                title: 'Custo: ' + record.get('Descricao'),
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

        Ext.create('ProjetoGarage.view.orcamento.WindowCustos', {
            title: 'Cadastro de Custo',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    },
    onBtnDeleteClick: function () {
        var me = this,
            selection = me.getView().getSelectionModel().getSelection()[0];

        if (selection) {
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
    },
    onBeforeEdit: function (editor, context, eOpts) {
        var me = this;

        if (context.record.get('Descricao') === 'Produtos' || me.statusId !== 1) {
            return false;
        }
        return true;
    }
});