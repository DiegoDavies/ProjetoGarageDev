Ext.define('ProjetoGarage.view.cliente.GridServico', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'cliente-gridServico',
    esconderAtualizar: false,
    esconderRelatorio: true,
    esconderPesquisa: true,
    esconderPaging: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.cliente.Servico'),
            columns: [{
                text: 'Status',
                width: 120,
                style: 'text-align: center;',
                dataIndex: 'Status'
            }, {
                text: 'Número',
                flex: 1,
                minWidth: 100,
                style: 'text-align: center;',
                dataIndex: 'Numero'
            }, {
                text: 'Duração',
                style: 'text-align: center;',
                width: 150,
                dataIndex: 'Duracao'
            }, {
                xtype: 'numbercolumn',
                format: '0,000.00',
                align: 'right',
                style: 'text-align: center;',
                text: 'Valor Total',
                width: 120,
                dataIndex: 'ValorTotal',
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, field) {
                    return Ext.util.Format.number(me.store.sum('ValorTotal'), '0,000.00');
                }
            }, {
                xtype: 'datecolumn',
                text: 'Data Aprovação',
                width: 150,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y H:i:s',
                dataIndex: 'DataRealizacao'
            }, {
                xtype: 'datecolumn',
                text: 'Data Inicio',
                width: 150,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y H:i:s',
                dataIndex: 'DataInicio'
            }, {
                xtype: 'datecolumn',
                text: 'Data Finalização',
                width: 150,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y H:i:s',
                dataIndex: 'DataFinalizacao'
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

        Ext.create('ProjetoGarage.view.cliente.WindowServico', {
            title: 'Serviço: ' + record.get('Nome'),
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

        Ext.create('ProjetoGarage.view.cliente.WindowServico', {
            title: 'Cadastro de Serviço',
            extraData: {
                formType: 'Cadastrar',
                grid: me
            }
        }).show();
        return false;
    }
});