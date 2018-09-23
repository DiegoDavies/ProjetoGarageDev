Ext.define('ProjetoGarage.view.funcionario.FormHistoricoOcupacional', {
    extend: 'Ext.form.Panel',
    xtype: 'funcionario-formHistoricoOcupacional',
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
                width: 400,
                labelWidth: 110,
            },
            items: [{
                xtype: 'datefield',
                altFormats: 'd/m/Y|dmy|dmY',
                format: 'd/m/Y',
                fieldLabel: 'Data *',
                itemId: 'dtDataOcorrencia',
                name: 'DataOcorrencia',
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode == 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'radiogroup',
                fieldLabel: 'Tipo',
                itemId: 'rgTipo',
                columns: 2,
                vertical: true,
                items: [{
                    boxLabel: 'Admissão',
                    name: 'TipoId',
                    inputValue: '1'
                }, {
                    boxLabel: 'Demissão',
                    name: 'TipoId',
                    inputValue: '2'
                }, {
                    boxLabel: 'Afastamento',
                    name: 'TipoId',
                    inputValue: '3'
                }, {
                    boxLabel: 'Promoção',
                    name: 'TipoId',
                    inputValue: '4'
                }]
            }, {
                xtype: 'numberfield',
                name: 'Salario',
                fieldLabel: 'Salário',
                itemId: 'txtSalario',
                fieldStyle: 'text-align:right;',
                allowDecimals: true,
                decimalSeparator: ',',
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode == 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }, {
                xtype: 'tcc-combo',
                flex: 1,
                name: 'FuncaoIdAntigo',
                fieldLabel: 'Função',
                itemId: 'cboFuncao',
                displayField: 'Nome',
                valueField: 'FuncaoId',
                store: Ext.create('ProjetoGarage.store.combos.Funcao')
            }, {
                xtype: 'textareafield',
                name: 'Observacao',
                fieldLabel: 'Observação',
                rows: 5,
                itemId: 'txtObservacao',
                enableKeyEvents: true,
                listeners: {
                    keyup: function (txt, e, eOpts) {
                        if (e.keyCode == 13) {
                            me.window.btnSalvar.fireEvent('click', this);
                        }
                    }
                }
            }]
        });

        me.callParent(arguments);
    }
})