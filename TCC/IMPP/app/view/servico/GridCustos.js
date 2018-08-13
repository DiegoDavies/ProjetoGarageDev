﻿Ext.define('ProjetoGarage.view.servico.GridCustos', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'servico-gridCustos',
    requires: [
        //'ProjetoGarage.view.servico.WindowDependente'
    ],
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    height: '100%',
    width: '100%',
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
                        if(item.get('Desconto') && item.get('Valor') > 0){
                            somar -= item.get('Valor');
                        } else {
                            somar += item.get('Valor');
                        }
                    });
                    return '<b>' + Ext.util.Format.number(somar, '0,000.00') + '</b>';
                },
                editor: {
                    xtype: 'numberfield',
                    format: '0,000.00'
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
            itemdblclick: me.onItemDblClick,
            edit: me.onEdit
        });

        me.btnNovo.on({
            scope: me,
            click: me.onBtnNovoClick
        });
    },
    onBoxReady: function () {
        var me = this;

        me.toolbar.up().hide();
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var me = this;

        //Ext.create('ProjetoGarage.view.servico.WindowDependente', {
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

        //Ext.create('ProjetoGarage.view.servico.WindowDependente', {
        //    title: 'Cadastro de Dependente',
        //    extraData: {
        //        formType: 'Cadastrar',
        //        grid: me
        //    }
        //}).show();
        //return false;
    },
    onEdit: function (editor, context, eOpts) {
        if (context.record.get('Desconto') && context.record.get('Valor') > 0) {
            context.record.set('Valor', context.record.get('Valor') * -1);
        }
    }
});