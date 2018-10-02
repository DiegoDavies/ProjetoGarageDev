Ext.define('ProjetoGarage.view.orcamento.FormCustos', {
    extend: 'Ext.form.Panel',
    xtype: 'orcamento-formCustos',
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
                xtype: 'textfield',
                name: 'Descricao',
                fieldLabel: 'Descrição',
                itemId: 'txtDescricao',
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode === 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'radiogroup',
                name: 'Desconto',
                fieldLabel: 'Desconto',
                itemId: 'rdgDesconto',
                items: [{
                    boxLabel: 'Sim',
                    name: 'Desconto',
                    inputValue: '1'
                }, {
                    boxLabel: 'Não',
                    name: 'Desconto',
                    inputValue: '2',
                    checked: true
                }]
            }]
        });

        me.callParent(arguments);
    }
});