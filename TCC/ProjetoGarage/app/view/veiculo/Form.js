Ext.define('ProjetoGarage.view.veiculo.Form', {
    extend: 'Ext.form.Panel',
    requires: [
        'ProjetoGarage.view.veiculo.TabPanelFilho'
    ],
    xtype: 'veiculo-form',
    width: '100%',
    height: '100%',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'container',
                padding: 10,
                width: 410,
                border: 5,
                height: '100%',
                layout: 'vbox',
                autoScroll: true,
                defaults: {
                    labelWidth: 105,
                    width: 390
                },
                items: [{
                    xtype: 'tcc-combo',
                    name: 'ClienteId',
                    fieldLabel: 'Cliente *',
                    itemId: 'cboCliente',
                    displayField: 'Nome',
                    valueField: 'ClienteId',
                    store: Ext.create('ProjetoGarage.store.combos.Cliente'),
                    allowBlank: false
                }, {
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
                    xtype: 'htmleditor',
                    name: 'Observacao',
                    fieldLabel: 'Observação',
                    itemId: 'txtObservacao',
                    rows: 6
                }]
            }, {
                xtype: 'veiculo-tabPanel',
                flex: 1,
                hidden: true,
                margin: '0 0 0 0',
                panel: me.panel
            }, {
                xtype: 'tcc-mascaraTab',
                itemId: 'veiculoMasc',
                flex: 1,
                margin: '0 0 0 0',
                width: '100%',
                height: '100%'
            }]
        });

        me.callParent(arguments);
    }
});