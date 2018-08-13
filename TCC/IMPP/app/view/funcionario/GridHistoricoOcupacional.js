Ext.define('ProjetoGarage.view.funcionario.GridHistoricoOcupacional', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'funcionario-gridHistoricoOcupacional',
    requires: [
        'ProjetoGarage.view.funcionario.WindowHistoricoOcupacional'
    ],
    esconderAtualizar: false,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.funcionario.HistoricoOcupacional'),
            columns: [{
                text: 'Código',
                width: 100,
                align: 'center',
                style: 'text-align: center;',
                dataIndex: 'FuncionarioHistoricoOcupacionalId'
            }, {
                xtype: 'datecolumn',
                text: 'Data',
                width: 120,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y',
                dataIndex: 'DataOcorrencia'
            }, {
                text: 'Tipo',
                style: 'text-align: center;',
                columns: [{
                    xtype: 'actioncolumn',
                    text: 'Admissão',
                    align: 'center',
                    style: 'text-align: center;',
                    renderer: function (val, metaData, record) {
                        if (record.get('TipoId') === 1) {
                            this.items[0].icon = '/resources/images/check.png';
                        } else {
                            this.items[0].icon = '';
                        }
                    }
                }, {
                    xtype: 'actioncolumn',
                    text: 'Demissão',
                    align: 'center',
                    style: 'text-align: center;',
                    renderer: function (val, metaData, record) {
                        if (record.get('TipoId') === 2) {
                            this.items[0].icon = '/resources/images/check.png';
                        } else {
                            this.items[0].icon = '';
                        }
                    }
                }, {
                    xtype: 'actioncolumn',
                    text: 'Afastamento',
                    align: 'center',
                    style: 'text-align: center;',
                    renderer: function (val, metaData, record) {
                        if (record.get('TipoId') === 3) {
                            this.items[0].icon = '/resources/images/check.png';
                        } else {
                            this.items[0].icon = '';
                        }
                    }
                }, {
                    xtype: 'actioncolumn',
                    text: 'Promoção',
                    align: 'center',
                    style: 'text-align: center;',
                    renderer: function (val, metaData, record) {
                        if (record.get('TipoId') === 4) {
                            this.items[0].icon = '/resources/images/check.png';
                        } else {
                            this.items[0].icon = '';
                        }
                    }
                }]
            }, {
                xtype: 'numbercolumn',
                text: 'Salário',
                align: 'right',
                style: 'text-align: center;',
                dataIndex: 'Salario'
            }, {
                text: 'Função',
                flex: 1,
                minWidth: 200,
                style: 'text-align: center;',
                dataIndex: 'Funcao'
            }, {
                text: 'Observação',
                flex: 1,
                minWidth: 200,
                style: 'text-align: center;',
                dataIndex: 'Observacao',
                renderer: function (val, metaData, record) {
                    metaData.tdAttr = 'data-qtip="' + val + '"';
                    return val;
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

        me.toolbar.hide();
        me.btnRelatorio.hide();
        me.txtQuery.hide();
        me.btnPesquisar.hide();
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        Ext.create('ProjetoGarage.view.funcionario.WindowHistoricoOcupacional', {
            title: 'Histórico: ' + Ext.Date.format(record.get('Data'), 'd/m/Y'),
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

        Ext.create('ProjetoGarage.view.funcionario.WindowHistoricoOcupacional', {
            title: 'Cadastro de Histórico Ocupacional',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    }
});