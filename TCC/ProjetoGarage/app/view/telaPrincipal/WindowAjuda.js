Ext.define('ProjetoGarage.view.telaPrincipal.WindowAjuda', {
    extend: 'Ext.window.Window',
    xtype: 'ajudaWindow',
    title: 'Preencha o campo abaixo com suas Dúvidas/Reclamações/Sugestões e etc.',
    width: 650,
    height: screen.availHeight * 0.7,
    layout: 'fit',
    modal: true,
    closable: true,
    draggable: false,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            storeAjuda: Ext.create('ProjetoGarage.store.telaPrincipal.Ajuda'),
            items: [{
                xtype: 'htmleditor',
                itemId: 'txtMensagem',
                width: '100%',
                height: '100%',
                labelAlign: 'top',
                emptyText: 'Preencha o campo com suas Dúvidas/Reclamações/Sugestões e etc. *',
                name: 'Mensagem',
                fieldStyle: 'border-radius: 4px;',
                enableKeyEvents: true,
                allowBlank: false
            }],
            bbar: ['->', {
                xtype: 'button',
                text: 'Enviar Mensagem',
                margin: '0 10 0 0',
                itemId: 'btnEnviar'
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.txtMensagem = me.down('#txtMensagem');
        me.btnEnviar = me.down('#btnEnviar');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            show: me.onShowWindow
        });

        me.txtMensagem.on({
            scope: me,
            keypress: me.onKeyPress
        });

        me.btnEnviar.on({
            click: me.onBtnEnviarClick,
            scope: me
        });
    },
    onShowWindow: function () {
        var me = this;

        me.txtMensagem.focus();
    },
    onKeyPress: function (dado, e, eOpts) {
        var me = this;

        if (e.keyCode === 13) {
            me.btnEnviar.fireEvent('click');
        }
    },
    onBtnEnviarClick: function () {
        var me = this;

        if (me.txtMensagem.isValid()) {
            Ext.Msg.show({
                title: 'Validação',
                msg: 'Deseja realmente prosseguir com a operação?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.getEl().mask('Enviando mensagem...');
                        var model = Ext.create('ProjetoGarage.model.telaPrincipal.Ajuda');
                        model.set('Mensagem', me.txtMensagem.getValue());
                        me.storeAjuda.add(model);

                        me.storeAjuda.sync({
                            success: function (batch) {
                                var rec = batch.operations[0].records[0];

                                Ext.Ajax.request({
                                    url: '/Email',
                                    method: 'GET',
                                    params: {
                                        TipoEmail: 1,
                                        TextoProblema: rec.get('Mensagem')
                                    },
                                    success: function (response) {
                                        Ext.Msg.show({
                                            title: 'Sucesso',
                                            msg: 'Mensagem enviada com sucesso!<br>Em breve receberá um e-mail com um posicionamento da equipe de suporte',
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.INFO
                                        });
                                        me.getEl().unmask();
                                        me.close();
                                    },
                                    failure: function (retorno, request) {
                                        Ext.Msg.show({
                                            title: 'Erro',
                                            msg: 'Ocorreu um erro ao enviar o e-mail, mas sua mensagem foi gravada no banco de dados.<br> Aguarde um posicionamento da equipe de suporte.',
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.ERROR
                                        });
                                    }
                                });
                            },
                            failure: function () {
                                me.storeAjuda.rejectChanges();
                                me.getEl().unmask();
                            }
                        });
                    }
                }
            });
        }
    }
});