Ext.define('ProjetoGarage.view.contaPagar.GridOcorrencia', {
    extend: 'ProjetoGarage.view.GridDefault',
    xtype: 'contaPagar-gridOcorrencia',
    esconderAtualizar: false,
    esconderRelatorio: true,
    esconderPesquisa: true,
    esconderPaging: true,
    esconderNew: true,
    esconderDelete: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('ProjetoGarage.store.contaPagar.Ocorrencia'),
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