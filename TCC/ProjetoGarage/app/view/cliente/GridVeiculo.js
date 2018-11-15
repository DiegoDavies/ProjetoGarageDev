Ext.define('ProjetoGarage.view.cliente.GridVeiculo', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'cliente-gridVeiculo',
    requires: [
        'ProjetoGarage.view.cliente.WindowVeiculo'
    ],
    esconderAtualizar: false,
    esconderRelatorio: true,
    esconderPesquisa: true,
    esconderPaging: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.cliente.Veiculo'),
            columns: [{
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

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        window.viewport.tabPanelPrincipal.add({
            xtype: 'veiculo-panel',
            title: 'Veículo: ' + record.get('Placa'),
            closable: true,
            tabPrincipal: window.viewport.tabPanelPrincipal,
            itemId: 'Veiculo' + record.get('VeiculoId'),
            tratamento: 'AEVEIC',
            extraData: {
                formType: 'Alterar',
                grid: me,
                record: record,
                isCliente: true
            },
            listeners: {
                scope: me,
                beforeclose: function () {
                    this.getStore().load();
                }
            }
        });
        window.viewport.tabPanelPrincipal.setActiveTab('Veiculo' + record.get('VeiculoId'));
        return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        Ext.create('ProjetoGarage.view.cliente.WindowVeiculo', {
            title: 'Cadastro de Veículo',
            tratamento: 'CEVEIC',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    }
});