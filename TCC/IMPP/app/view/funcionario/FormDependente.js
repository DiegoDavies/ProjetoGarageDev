Ext.define('ProjetoGarage.view.funcionario.FormDependente', {
    extend: 'Ext.form.Panel',
    xtype: 'funcionario-formDependente',
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
                name: 'Nome',
                fieldLabel: 'Nome',
                itemId: 'txtNome'
            }, {
                xtype: 'textfield',
                name: 'CPF',
                itemId: 'txtCpf',
                fieldLabel: 'CPF',
                plugins: [
                    new ProjetoGarage.ux.InputTextMask('999.999.999-99')
                ]
            }, {
                xtype: 'datefield',
                altFormats: 'd/m/Y|dmy|dmY',
                format: 'd/m/Y',
                fieldLabel: 'Data Nascimento',
                itemId: 'dtDataNasc',
                name: 'DataNascimento'
            }, {
                xtype: 'tcc-combo',
                flex: 1,
                name: 'ParentescoId',
                fieldLabel: 'Grau Parentesco',
                itemId: 'cboGrauParentesco',
                displayField: 'Nome',
                valueField: 'ParentescoId',
                store: Ext.create('ProjetoGarage.store.combos.Parentesco')
            }]
        });

        me.callParent(arguments);
    }
});