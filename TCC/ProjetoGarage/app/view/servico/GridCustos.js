Ext.define('ProjetoGarage.view.servico.GridCustos', {
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
    esconderToolbar: true,
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
                        if (item.get('Desconto') && item.get('Valor') > 0) {
                            somar -= item.get('Valor');
                        } else {
                            somar += item.get('Valor');
                        }
                    });
                    return '<b>' + Ext.util.Format.number(somar, '0,000.00') + '</b>';
                },
                editor: {
                    xtype: 'numberfield',
                    format: '0,000.00',
                    fieldStyle: 'text-align:right'
                }
            }, {
                text: '',
                width: 10
            }]
        });

        me.callParent(arguments);
        me.addEventHandler();
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            edit: me.onEdit,
            beforeedit: me.onBeforeEdit
        });
    },
    onEdit: function (editor, context, eOpts) {
        var me = this;

        if (context.record.get('Desconto') && context.record.get('Valor') > 0) {
            context.record.set('Valor', context.record.get('Valor') * -1);
        }
    },
    onBeforeEdit: function (editor, context, eOpts) {
        var me = this;

        if (context.record.get('Descricao') === 'Produtos') {
            return false;
        }
        return true;
    }
});