﻿Ext.define('ProjetoGarage.view.servico.GridHistorico', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'servico-gridHistorico',
    esconderAtualizar: false,
    esconderRelatorio: true,
    esconderPesquisa: true,
    esconderNew: true,
    esconderPaging: true,
    esconderDelete: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.servico.Historico'),
            columns: [{
                xtype: 'datecolumn',
                text: 'Data Hora',
                width: 120,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y',
                dataIndex: 'DataOcorrencia'
            }, {
                text: 'Usuario',
                width: 150,
                style: 'text-align: center;',
                dataIndex: 'UsuarioNome'
            }, {
                text: 'Ocorrencia',
                flex: 1,
                minWidth: 280,
                style: 'text-align: center;',
                dataIndex: 'Ocorrencia',
                renderer: function (val, metaData, record) {
                    metaData.tdAttr = 'data-qtip="' + val + '"';
                    return val;
                }
            }]
        });

        me.callParent(arguments);
    }
});