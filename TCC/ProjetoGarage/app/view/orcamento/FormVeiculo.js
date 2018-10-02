Ext.define('ProjetoGarage.view.orcamento.FormVeiculo', {
    extend: 'Ext.form.Panel',
    xtype: 'orcamento-formVeiculo',
    width: '100%',
    height: '100%',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                width: 390,
                labelWidth: 70
            },
            items: [{
                xtype: 'tcc-combo',
                name: 'VeiculoId',
                fieldLabel: 'Veículo',
                itemId: 'cboVeiculo',
                displayField: 'Placa',
                valueField: 'VeiculoId',
                store: Ext.create('ProjetoGarage.store.combos.Veiculo'),
                allowBlank: false
            }, {
                xtype: 'htmleditor',
                name: 'Observacao',
                rows: 7,
                itemId: 'txtObservacao',
                fieldLabel: 'Observação',
                disabled: true
            }, {
                xtype: 'htmleditor',
                name: 'Problema',
                rows: 7,
                itemId: 'txtProblema',
                fieldLabel: 'Problemas'
            }]
        });

        me.callParent(arguments);
    }
});
