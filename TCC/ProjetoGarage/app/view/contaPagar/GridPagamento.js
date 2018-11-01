Ext.define('ProjetoGarage.view.contaPagar.GridPagamento', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'contaPagar-gridPagamento',
    requires: [
        'ProjetoGarage.view.contaPagar.WindowPagamento'
    ],
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    esconderEstorno: false,
    esconderDelete: true,
    esconderAtualizar: false,
    esconderPaging: true,
    esconderRelatorio: true,
    esconderPesquisa: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.contaPagar.Pagamento'),
            columns: [{
                text: 'Documento',
                flex: 1,
                minWidth: 160,
                style: 'text-align: center;',
                dataIndex: 'Documento',
                renderer: function (v, metaData, rec) {
                    if (rec.get('Estornado')) {
                        metaData.style = 'background-color: #FF6560 !important;';
                    }
                    return v;
                }
            }, {
                text: 'Tipo de Pagamento',
                width: 160,
                style: 'text-align: center;',
                dataIndex: 'TipoPagamentoNome',
                renderer: function (v, metaData, rec) {
                    if (rec.get('Estornado')) {
                        metaData.style = 'background-color: #FF6560 !important;';
                    }
                    return v;
                }
            }, {
                xtype: 'datecolumn',
                text: 'Data Pagamento',
                width: 150,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y',
                dataIndex: 'DataPagamento',
                renderer: function (v, metaData, rec) {
                    if (rec.get('Estornado')) {
                        metaData.style = 'background-color: #FF6560 !important;';
                    }
                    return Ext.Date.format(v, 'd/m/Y');
                }
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
                },
                renderer: function (v, metaData, rec) {
                    if (rec.get('Estornado')) {
                        metaData.style = 'background-color: #FF6560 !important;';
                    }
                    return Ext.util.Format.number(v, '0,000.00');
                }
            }, {
                text: 'Inclusão',
                style: 'text-align: center;',
                columns: [{
                    text: 'Usuário',
                    sortable: true,
                    style: 'text-align: center;',
                    dataIndex: 'UsuarioNomeInclusao',
                    renderer: function (v, metaData, rec) {
                        if (rec.get('Estornado')) {
                            metaData.style = 'background-color: #FF6560 !important;';
                        }
                        return v;
                    }
                }, {
                    xtype: 'datecolumn',
                    sortable: true,
                    text: 'Data Hora',
                    width: 150,
                    align: 'center',
                    style: 'text-align: center;',
                    format: 'd/m/Y H:i:s',
                    dataIndex: 'DataHoraInclusao',
                    renderer: function (v, metaData, rec) {
                        if (rec.get('Estornado')) {
                            metaData.style = 'background-color: #FF6560 !important;';
                        }
                        return Ext.Date.format(v, 'd/m/Y H:i:s');
                    }
                }]
            }, {
                text: 'Alteração',
                style: 'text-align: center;',
                columns: [{
                    text: 'Usuário',
                    sortable: true,
                    style: 'text-align: center;',
                    dataIndex: 'UsuarioNomeAlteracao',
                    renderer: function (v, metaData, rec) {
                        if (rec.get('Estornado')) {
                            metaData.style = 'background-color: #FF6560 !important;';
                        }
                        return v;
                    }
                }, {
                    xtype: 'datecolumn',
                    sortable: true,
                    text: 'Data Hora',
                    width: 150,
                    align: 'center',
                    style: 'text-align: center;',
                    format: 'd/m/Y H:i:s',
                    dataIndex: 'DataHoraAlteracao',
                    renderer: function (v, metaData, rec) {
                        if (rec.get('Estornado')) {
                            metaData.style = 'background-color: #FF6560 !important;';
                        }
                        return Ext.Date.format(v, 'd/m/Y H:i:s');
                    }
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

        me.store.on({
            scope: me,
            load: me.onLoadStore
        });

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        Ext.create('ProjetoGarage.view.contaPagar.WindowPagamento', {
            title: 'Pagamento ' + record.get('Documento'),
            extraData: {
                formType: 'Alterar',
                grid: me,
                record: record
            }
        }).show();
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        Ext.create('ProjetoGarage.view.contaPagar.WindowPagamento', {
            title: 'Cadastro de Pagamento',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    },
    onLoadStore: function (store, records, successful, eOpts) {
        var me = this;

        if (records.length > 0) {
            me.tabPanel.panel.dtDataPagamento.setValue(Ext.Date.format(records[0].get('DataPreenchimentoTela'), 'd/m/Y'));
        }
        me.tabPanel.panel.txtValorPago.setValue(me.store.sum('ValorPago'));
    }
});