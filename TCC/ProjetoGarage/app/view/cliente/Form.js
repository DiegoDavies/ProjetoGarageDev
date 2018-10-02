Ext.define('ProjetoGarage.view.cliente.Form', {
    extend: 'Ext.form.Panel',
    requires: [
        'ProjetoGarage.view.cliente.TabPanelFilho'
    ],
    xtype: 'cliente-form',
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
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 8 0',
                    items: [{
                        xtype: 'displayfield',
                        name: 'ClienteId',
                        fieldLabel: 'Código',
                        itemId: 'txtCodigo',
                        margin: '0 15 0 0',
                        labelWidth: 105,
                        width: 145
                    }, {
                        xtype: 'tcc-combo',
                        flex: 1,
                        name: 'SituacaoId',
                        fieldLabel: 'Situação',
                        itemId: 'cboSituacao',
                        labelWidth: 55,
                        displayField: 'Nome',
                        valueField: 'SituacaoId',
                        store: Ext.create('ProjetoGarage.store.combos.Situacao')
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'Nome',
                    fieldLabel: 'Nome *',
                    itemId: 'txtNome',
                    allowBlank: false
                }, {
                    xtype: 'tcc-combo',
                    name: 'SexoId',
                    fieldLabel: 'Sexo *',
                    itemId: 'cboSexo',
                    displayField: 'Nome',
                    valueField: 'SexoId',
                    store: Ext.create('ProjetoGarage.store.combos.Sexo'),
                    allowBlank: false
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
                        labelWidth: 105
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
                        labelWidth: 105,
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
                        name: 'Cpf',
                        itemId: 'txtCpf',
                        fieldLabel: 'CPF',
                        labelWidth: 105,
                        margin: '0 10 0 0',
                        flex: 1,
                        plugins: [
                            new ProjetoGarage.ux.InputTextMask('999.999.999-99')
                        ]
                    }, {
                        xtype: 'textfield',
                        name: 'Rg',
                        itemId: 'txtRg',
                        fieldLabel: 'RG',
                        flex: 0.6,
                        labelWidth: 30
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'EstadoRg',
                        itemId: 'txtEstadoRg',
                        fieldLabel: 'Estado (RG)',
                        labelWidth: 105,
                        margin: '0 10 0 0',
                        flex: 1
                    }, {
                        xtype: 'datefield',
                        fieldLabel: 'Emissão',
                        itemId: 'dtEmissaoRg',
                        name: 'DataEmissaoRg',
                        labelWidth: 52,
                        width: 160,
                        format: 'd/m/Y',
                        altFormats: 'd/m/Y|dmy|dmY'
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
                        labelWidth: 105,
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
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'TelefoneAdc',
                        itemId: 'txtTelefoneAdc',
                        fieldLabel: 'Telefone Adc.',
                        labelWidth: 105,
                        margin: '0 10 0 0',
                        plugins: [
                            new ProjetoGarage.ux.InputTextMask('(99)9999-9999')
                        ],
                        flex: 1
                    }, {
                        xtype: 'textfield',
                        name: 'CelularAdc',
                        itemId: 'txtCelularAdc',
                        fieldLabel: 'Celular',
                        labelWidth: 45,
                        plugins: [
                            new ProjetoGarage.ux.InputTextMask('(99)99999-9999')
                        ],
                        flex: 0.8
                    }]
                }, {
                    xtype: 'datefield',
                    altFormats: 'd/m/Y|dmy|dmY',
                    format: 'd/m/Y',
                    name: 'DataNascimento',
                    fieldLabel: 'Data Nascimento',
                    itemId: 'dtDataNasc'
                }, {
                    xtype: 'tcc-combo',
                    name: 'EstadoCivilId',
                    fieldLabel: 'Estado Civil',
                    itemId: 'cboEstadoCivil',
                    displayField: 'Nome',
                    valueField: 'EstadoCivilId',
                    store: Ext.create('ProjetoGarage.store.combos.EstadoCivil')
                }, {
                    xtype: 'tcc-combo',
                    name: 'FuncaoId',
                    fieldLabel: 'Função',
                    itemId: 'cboFuncao',
                    displayField: 'Nome',
                    valueField: 'FuncaoId',
                    store: Ext.create('ProjetoGarage.store.combos.Funcao')
                }]
            }, {
                xtype: 'cliente-tabPanel',
                flex: 1,
                hidden: true,
                margin: '0 0 0 0',
                panel: me.panel
            }, {
                xtype: 'tcc-mascaraTab',
                itemId: 'clienteMasc',
                flex: 1,
                margin: '0 0 0 0',
                width: '100%',
                height: '100%'
            }]
        });

        me.callParent(arguments);
    }
});