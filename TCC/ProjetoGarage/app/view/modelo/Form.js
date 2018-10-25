Ext.define('ProjetoGarage.view.modelo.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'modelo-form',
    width: '100%',
    height: '100%',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'tcc-combo',
                name: 'MarcaId',
                fieldLabel: 'Marca *',
                itemId: 'cboMarca',
                labelAlign: 'top',
                width: 300,
                displayField: 'Nome',
                valueField: 'MarcaId',
                store: Ext.create('ProjetoGarage.store.combos.Marca'),
                allowBlank: false
            }, {
                fieldLabel: 'Nome *',
                xtype: 'textfield',
                name: 'Nome',
                itemId: 'txtNome',
                width: 300,
                labelAlign: 'top',
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode === 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }]
        });

        me.callParent(arguments);
    }
});