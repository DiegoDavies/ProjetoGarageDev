Ext.define('ProjetoGarage.view.funcionario.Form', {
    extend: 'Ext.form.Panel',
    requires: [
        'ProjetoGarage.view.funcionario.TabPanelFilho'
    ],
    xtype: 'funcionario-form',
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
                    name: 'SituacaoId',
                    fieldLabel: 'Situação',
                    itemId: 'cboSituacao',
                    displayField: 'Nome',
                    valueField: 'SituacaoId',
                    store: Ext.create('ProjetoGarage.store.combos.Situacao')
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
                    xtype: 'datefield',
                    altFormats: 'd/m/Y|dmy|dmY',
                    format: 'd/m/Y',
                    name: 'DataNascimento',
                    fieldLabel: 'Data Nascimento',
                    itemId: 'dtDataNasc'
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'tcc-combo',
                        name: 'EstadoNascId',
                        itemId: 'cboEstadoNasc',
                        fieldLabel: 'Estado Nasc.',
                        margin: '0 10 0 0',
                        labelWidth: 105,
                        width: 172,
                        displayField: 'Nome',
                        valueField: 'EstadoId',
                        store: Ext.create('ProjetoGarage.store.combos.Estado')
                    }, {
                        xtype: 'tcc-combo',
                        name: 'CidadeNascId',
                        fieldLabel: 'Cidade',
                        labelWidth: 50,
                        flex: 1,
                        itemId: 'cboCidadeNasc',
                        displayField: 'Nome',
                        valueField: 'CidadeId',
                        store: Ext.create('ProjetoGarage.store.combos.Cidade')
                    }]
                }, {
                    xtype: 'tcc-combo',
                    name: 'EstadoCivilId',
                    fieldLabel: 'Estado Civil',
                    itemId: 'cboEstadoCivil',
                    displayField: 'Nome',
                    valueField: 'EstadoCivilId',
                    store: Ext.create('ProjetoGarage.store.combos.EstadoCivil')
                }, {
                    xtype: 'textfield',
                    name: 'NomeConjuge',
                    fieldLabel: 'Nome Cônjuge',
                    itemId: 'txtNomeConjuge'
                }, {
                    xtype: 'textfield',
                    name: 'NomePai',
                    fieldLabel: 'Nome Pai',
                    itemId: 'txtNomePai'
                }, {
                    xtype: 'textfield',
                    name: 'NomeMae',
                    fieldLabel: 'Nome Mãe',
                    itemId: 'txtNomeMae'
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Número PIS',
                        itemId: 'txtNumeroPis',
                        name: 'NumeroPis',
                        labelWidth: 105,
                        margin: '0 10 0 0',
                        flex: 1
                    }, {
                        xtype: 'datefield',
                        fieldLabel: 'Emissão',
                        itemId: 'dtEmissaoPis',
                        name: 'DataEmissaoPis',
                        labelWidth: 52,
                        width: 160,
                        format: 'd/m/Y',
                        altFormats: 'd/m/Y|dmy|dmY'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Reservista',
                        itemId: 'txtReservista',
                        name: 'Reservista',
                        labelWidth: 105,
                        flex: 1,
                        margin: '0 10 0 0'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Categoria',
                        name: 'Categoria',
                        width: 150,
                        labelWidth: 58,
                        itemId: 'txtCategoria'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Titulo Eleitor',
                        itemId: 'txtTituloEleitor',
                        name: 'TituloEleitor',
                        flex: 1,
                        labelWidth: 105,
                        margin: '0 10 0 0'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Zona',
                        name: 'ZonaEleitoral',
                        itemId: 'txtZonaEleitor',
                        width: 150,
                        labelWidth: 40
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Seção',
                        name: 'SecaoEleitoral',
                        itemId: 'txtSecaoEleitor',
                        flex: 1,
                        labelWidth: 105,
                        margin: '0 10 0 0'
                    }, {
                        xtype: 'datefield',
                        fieldLabel: 'Emissão',
                        itemId: 'dtEmissaoEleitor',
                        name: 'DataEmissaoEleitor',
                        labelWidth: 52,
                        width: 160,
                        format: 'd/m/Y',
                        altFormats: 'd/m/Y|dmy|dmY'
                    }]
                }, {
                    xtype: 'tcc-combo',
                    name: 'FormacaoId',
                    fieldLabel: 'Formação',
                    itemId: 'cboFormacao',
                    displayField: 'Nome',
                    valueField: 'FormacaoId',
                    store: Ext.create('ProjetoGarage.store.combos.Formacao')
                }, {
                    xtype: 'tcc-combo',
                    name: 'EtniaId',
                    fieldLabel: 'Etnia',
                    itemId: 'cboEtnia',
                    displayField: 'Nome',
                    valueField: 'EtniaId',
                    store: Ext.create('ProjetoGarage.store.combos.Etnia')
                }]
            }, {
                xtype: 'funcionario-tabPanel',
                flex: 1,
                hidden: true,
                margin: '0 0 0 0',
                panel: me.panel
            }, {
                xtype: 'tcc-mascaraTab',
                itemId: 'funcionarioMasc',
                flex: 1,
                margin: '0 0 0 0',
                width: '100%',
                height: '100%'
            }]
        });

        me.callParent(arguments);
    }
});