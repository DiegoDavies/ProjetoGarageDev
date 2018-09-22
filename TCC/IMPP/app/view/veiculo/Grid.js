Ext.define('ProjetoGarage.view.veiculo.Grid', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'veiculo-grid',
    requires: [
        'ProjetoGarage.view.veiculo.Panel'
    ],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.veiculo.Store'),
            columns: [{
                text: 'Código',
                width: 100,
                align: 'center',
                style: 'text-align: center;',
                dataIndex: 'VeiculoId',
                hidden: true,
                hideable: false
            }, {
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
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.toolbar = me.down('#pagingToolbarGrid')
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
            itemdblclick: me.onItemDblClick,
            boxready: me.onBoxReady
        });

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });

        me.btnRelatorio.on({
            scope: me,
            click: me.onBtnRelatorioClick
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
            title: 'Veículo: ' + record.get('Placa') + '&nbsp;&nbsp;',
            closable: true,
            tabPrincipal: me.tela.tabPrincipal,
            itemId: 'Veiculo' + record.get('VeiculoId'),
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
            title: 'Cadastro de Veículo' + '&nbsp;&nbsp;',
            closable: true,
            tabPrincipal: me.tela.tabPrincipal,
            itemId: 'CadastroVeiculo',
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
    },
    onBtnRelatorioClick: function () {
        var me = this;

    }
});