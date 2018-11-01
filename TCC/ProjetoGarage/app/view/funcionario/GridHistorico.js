Ext.define('ProjetoGarage.view.funcionario.GridHistorico', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'funcionario-gridHistorico',
    esconderAtualizar: false,
    esconderDelete: true,
    esconderPaging: true,
    esconderNew: true,
    esconderRelatorio: true,
    esconderPesquisa: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.funcionario.Historico'),
            columns: [{
                xtype: 'datecolumn',
                text: 'Data',
                width: 120,
                align: 'center',
                style: 'text-align: center;',
                format: 'd/m/Y',
                dataIndex: 'DataOcorrencia'
            }, {
                text: 'Usuario',
                flex: 0.3,
                minWidth: 120,
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