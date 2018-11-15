Ext.define('ProjetoGarage.view.orcamento.GridVeiculo', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'orcamento-gridVeiculo',
    requires: [
        'ProjetoGarage.view.orcamento.WindowVeiculo'
    ],
    esconderAtualizar: false,
    esconderPaging: true,
    esconderRelatorio: true,
    esconderPesquisa: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.orcamento.Veiculo'),
            columns: [{
                text: 'Placa',
                width: 110,
                style: 'text-align: center;',
                dataIndex: 'Placa'
            }, {
                text: 'Marca - Modelo',
                flex: 1,
                minWidth: 200,
                style: 'text-align: center;',
                dataIndex: 'MarcaModelo',
                renderer: function (val, metaData, record) {
                    metaData.tdAttr = 'data-qtip="' + val + '"';
                    return val;
                }
            }, {
                text: 'Ano',
                width: 80,
                style: 'text-align: center;',
                dataIndex: 'Ano'
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
                text: 'Descrição do Problema',
                flex: 1,
                minWidth: 200,
                style: 'text-align: center;',
                dataIndex: 'Problema',
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
    },
    onBoxReady: function () {
        var me = this;

        if (me.tabPanel.statusId !== 1) {
            me.btnNovo.up().hide();
        } else {
            me.btnNovo.up().show();
        }
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this,
            clienteId = me.tabPanel.panel.extraData.record.get('ClienteId');

        if (me.tabPanel.statusId === 1) {
            if (clienteId > 0) {
                Ext.create('ProjetoGarage.view.orcamento.WindowVeiculo', {
                    title: 'Veículo ' + record.get('Placa'),
                    tratamento: 'AOVIVE',
                    extraData: {
                        formType: 'Alterar',
                        grid: me,
                        record: record,
                        clienteId: clienteId
                    }
                }).show();
            } else {
                Ext.Msg.show({
                    title: 'Validação',
                    msg: 'Selecione um cliente e salve o registro para continuar',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.WARNING
                });
            }
        }
        return false;
    },
    onBtnNovoClick: function () {
        var me = this,
            clienteId = me.tabPanel.panel.extraData.record.get('ClienteId');

        if (clienteId > 0) {
            Ext.create('ProjetoGarage.view.orcamento.WindowVeiculo', {
                title: 'Seleção de Veículo',
                tratamento: 'COVIVE',
                extraData: {
                    formType: 'Cadastrar',
                    grid: me,
                    clienteId: clienteId
                }
            }).show();
        } else {
            Ext.Msg.show({
                title: 'Validação',
                msg: 'Selecione um cliente e salve o registro para continuar',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
        return false;
    }
});