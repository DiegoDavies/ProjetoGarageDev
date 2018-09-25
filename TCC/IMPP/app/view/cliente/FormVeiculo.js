Ext.define('ProjetoGarage.view.cliente.FormVeiculo', {
    extend: 'Ext.form.Panel',
    xtype: 'cliente-formVeiculo',
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
                labelWidth: 110
            },
            items: [{
                xtype: 'textfield',
                name: 'Placa',
                fieldLabel: 'Placa *',
                itemId: 'txtPlaca',
                allowBlank: false,
                plugins: [
                    new ProjetoGarage.ux.InputTextMask('LLL-9999')
                ]
            }, {
                xtype: 'tcc-combo',
                name: 'MarcaId',
                fieldLabel: 'Marca *',
                itemId: 'cboMarca',
                displayField: 'Nome',
                valueField: 'MarcaId',
                store: Ext.create('ProjetoGarage.store.combos.Marca'),
                allowBlank: false
            }, {
                xtype: 'tcc-combo',
                name: 'ModeloId',
                fieldLabel: 'Modelo *',
                itemId: 'cboModelo',
                displayField: 'Nome',
                valueField: 'ModeloId',
                store: Ext.create('ProjetoGarage.store.combos.Modelo'),
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'Cor',
                fieldLabel: 'Cor',
                itemId: 'txtCor'
            }, {
                xtype: 'numberfield',
                name: 'Ano',
                fieldLabel: 'Ano',
                itemId: 'txtAno',
                fieldStyle: 'text-align:right;',
                allowDecimals: false,
                minValue: 0
            }, {
                xtype: 'textareafield',
                name: 'Observacao',
                fieldLabel: 'Observação',
                itemId: 'txtObservacao',
                rows: 6
            }]
        });

        me.callParent(arguments);
    }
});