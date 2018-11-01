Ext.define('ProjetoGarage.view.veiculo.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'veiculo-grid',
    requires: [
        'ProjetoGarage.view.veiculo.Panel'
    ],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            nomeExcel: 'Veículos',
            store: Ext.create('ProjetoGarage.store.veiculo.Store'),
            columns: [{
                text: 'Cliente',
                flex: 1,
                minWidth: 250,
                style: 'text-align: center;',
                dataIndex: 'Cliente'
            }, {
                text: 'Placa',
                width: 120,
                style: 'text-align: center;',
                dataIndex: 'Placa'
            }, {
                text: 'Marca',
                width: 150,
                style: 'text-align: center;',
                dataIndex: 'Marca'
            }, {
                text: 'Modelo',
                width: 180,
                style: 'text-align: center;',
                dataIndex: 'Modelo'
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
            }],
            columnsExcel: [{
                dataIndex: 'Cliente',
                nomeExcel: 'Cliente'
            }, {
                dataIndex: 'Placa',
                nomeExcel: 'Placa'
            }, {
                dataIndex: 'Marca',
                nomeExcel: 'Marca'
            }, {
                dataIndex: 'Modelo',
                nomeExcel: 'Modelo'
            }, {
                dataIndex: 'UsuarioNomeInclusao',
                nomeExcel: 'Usuário Inclusão'
            }, {
                dataIndex: 'DataHoraInclusao',
                nomeExcel: 'Data Hora Inclusão',
                formatoExcel: 'Data'
            }, {
                dataIndex: 'UsuarioNomeAlteracao',
                nomeExcel: 'Usuário Alteração'
            }, {
                dataIndex: 'DataHoraAlteracao',
                nomeExcel: 'Data Hora Alteração',
                formatoExcel: 'Data'
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
            itemdblclick: me.onItemDblClick,
            boxready: me.onBoxReady
        });

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });
    },
    onBoxReady: function () {
        var me = this;

        me.store.load();
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        me.tela.tabPrincipal.add({
            xtype: 'veiculo-panel',
            title: 'Veículo: ' + record.get('Placa'),
            closable: true,
            tabPrincipal: me.tela.tabPrincipal,
            itemId: 'Veiculo' + record.get('VeiculoId'),
            tratamento: 'AEVEIC',
            extraData: {
                formType: 'Alterar',
                grid: me,
                record: record
            },
            listeners: {
                scope: me,
                beforeclose: function () {
                    this.getStore().load();
                }
            }
        });
        me.tela.tabPrincipal.setActiveTab('Veiculo' + record.get('VeiculoId'));
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        me.tela.tabPrincipal.add({
            xtype: 'veiculo-panel',
            title: 'Cadastro de Veículo',
            closable: true,
            tabPrincipal: me.tela.tabPrincipal,
            itemId: 'CadastroVeiculo',
            tratamento: 'CEVEIC',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            },
            listeners: {
                scope: me,
                beforeclose: function () {
                    this.getStore().load();
                }
            }
        });
        me.tela.tabPrincipal.setActiveTab('CadastroVeiculo');
        return false;
    }
});