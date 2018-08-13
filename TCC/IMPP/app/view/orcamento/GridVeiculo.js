Ext.define('ProjetoGarage.view.orcamento.GridVeiculo', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'orcamento-gridVeiculo',
    requires: [
        //'ProjetoGarage.view.orcamento.WindowDependente'
    ],
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
                text: 'Modelo',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Modelo'
            }, {
                text: 'Ano',
                width: 110,
                style: 'text-align: center;',
                dataIndex: 'Ano'
            }, {
                text: 'Descrição do Problema',
                flex: 1,
                style: 'text-align: center;',
                dataIndex: 'Descricao'
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

        me.btnRelatorio.hide();
        me.toolbar.hide();
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        //Ext.create('ProjetoGarage.view.orcamento.WindowDependente', {
        //    title: 'Dependente ' + record.get('Nome'),
        //    extraData: {
        //        formType: 'Alterar',
        //        grid: me,
        //        record: record
        //    }
        //}).show();
        //return false;
    },
    onBtnNovoClick: function () {
        var me = this;

        //Ext.create('ProjetoGarage.view.orcamento.WindowDependente', {
        //    title: 'Cadastro de Dependente',
        //    extraData: {
        //        formType: 'Cadastrar',
        //        grid: me
        //    }
        //}).show();
        //return false;
    }
});