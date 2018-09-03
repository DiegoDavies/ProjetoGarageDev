Ext.define('ProjetoGarage.view.fornecedor.Form', {
    extend: 'Ext.form.Panel',
    requires: [
        'ProjetoGarage.view.fornecedor.TabPanelFilho'
    ],
    xtype: 'fornecedor-form',
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
                width: 420,
                border: 5,
                height: '100%',
                layout: 'vbox',
                autoScroll: true,
                defaults: {
                    labelWidth: 110,
                    width: 400
                },
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 8 0',
                    items: [{
                        xtype: 'displayfield',
                        name: 'FornecedorId',
                        fieldLabel: 'Código',
                        itemId: 'txtCodigo',
                        margin: '0 15 0 0',
                        labelWidth: 110,
                        width: 145
                    }, {
                        xtype: 'tcc-combo',
                        flex: 1,
                        name: 'StatusId',
                        fieldLabel: 'Status',
                        itemId: 'cboStatus',
                        labelWidth: 45,
                        displayField: 'Nome',
                        valueField: 'StatusFornecedorId',
                        store: Ext.create('ProjetoGarage.store.combos.StatusFornecedor'),
                        allowBlank: false
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'RazaoSocial',
                    fieldLabel: 'Razão Social',
                    itemId: 'txtRazaoSocial',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    name: 'Fantasia',
                    fieldLabel: 'Fantasia',
                    itemId: 'txtFantasia'
                }, {
                    xtype: 'textfield',
                    name: 'Cep',
                    fieldLabel: 'CEP',
                    itemId: 'txtCep',
                    plugins: [
                        new ProjetoGarage.ux.InputTextMask('99999-999')
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'Endereco',
                        flex: 1,
                        fieldLabel: 'Endereço',
                        itemId: 'txtEndereco',
                        margin: '0 10 0 0',
                        labelWidth: 110
                    }, {
                        xtype: 'numberfield',
                        name: 'Numero',
                        fieldLabel: 'Número',
                        itemId: 'txtNumero',
                        labelWidth: 50,
                        fieldStyle: 'text-align:right;',
                        allowDecimals: false,
                        minValue: 0,
                        width: 140
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'Complemento',
                    fieldLabel: 'Complemento',
                    itemId: 'txtComplemento'
                }, {
                    xtype: 'textfield',
                    name: 'Bairro',
                    fieldLabel: 'Bairro',
                    itemId: 'txtBairro'
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'tcc-combo',
                        name: 'EstadoId',
                        itemId: 'cboEstado',
                        fieldLabel: 'Estado',
                        margin: '0 10 0 0',
                        labelWidth: 110,
                        width: 172,
                        displayField: 'Nome',
                        valueField: 'EstadoId',
                        store: Ext.create('ProjetoGarage.store.combos.Estado')
                    }, {
                        xtype: 'tcc-combo',
                        name: 'CidadeId',
                        fieldLabel: 'Cidade',
                        labelWidth: 50,
                        flex: 1,
                        itemId: 'cboCidade',
                        displayField: 'Nome',
                        valueField: 'CidadeId',
                        store: Ext.create('ProjetoGarage.store.combos.Cidade')
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'Cnpj',
                        itemId: 'txtCnpj',
                        fieldLabel: 'CNPJ',
                        labelWidth: 110,
                        margin: '0 10 0 0',
                        flex: 1,
                        plugins: [
                            new ProjetoGarage.ux.InputTextMask('99.999.999/9999-99')
                        ]
                    }, {
                        xtype: 'textfield',
                        name: 'Cpf',
                        itemId: 'txtCpf',
                        fieldLabel: 'CPF',
                        labelWidth: 30,
                        margin: '0 0 0 0',
                        flex: 0.55,
                        plugins: [
                            new ProjetoGarage.ux.InputTextMask('999.999.999-99')
                        ]
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'InscricaoEstadual',
                        itemId: 'txtInscricaoEstadual',
                        fieldLabel: 'Inscrição Estadual',
                        margin: '0 10 0 0',
                        flex: 1,
                        labelWidth: 110
                    }, {
                        xtype: 'textfield',
                        name: 'Rg',
                        itemId: 'txtRg',
                        fieldLabel: 'RG',
                        flex: 0.55,
                        labelWidth: 25
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'Email',
                    vtype: 'email',
                    vtypeText: 'Este campo deve conter um endereço de e-mail no formato "usuario@exemplo.com"',
                    itemId: 'txtEmail',
                    fieldLabel: 'E-mail'
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'Telefone',
                        itemId: 'txtTelefone',
                        fieldLabel: 'Telefone',
                        labelWidth: 110,
                        margin: '0 10 0 0',
                        plugins: [
                            new ProjetoGarage.ux.InputTextMask('(99)9999-9999')
                        ],
                        flex: 1
                    }, {
                        xtype: 'textfield',
                        name: 'Celular',
                        itemId: 'txtCelular',
                        fieldLabel: 'Celular',
                        labelWidth: 45,
                        plugins: [
                            new ProjetoGarage.ux.InputTextMask('(99)99999-9999')
                        ],
                        flex: 0.8
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'Website',
                    vtype: 'url',
                    vtypeText: 'Este campo deve conter um site no formato "https://www.exemplo.com"',
                    itemId: 'txtSite',
                    fieldLabel: 'WebSite'
                }, {
                    xtype: 'textareafield',
                    name: 'Observacao',
                    rows: 7,
                    itemId: 'txtObservacao',
                    fieldLabel: 'Observação'
                }]
            }, {
                xtype: 'fornecedor-tabPanel',
                flex: 1,
                margin: '0 0 0 0',
                panel: me.panel
            }]
        });

        me.callParent(arguments);
    }
});