Ext.define('ProjetoGarage.view.login.WindowSolicitar', {
    extend: 'Ext.window.Window',
    xtype: 'solicitarWindow',
    title: 'Solicitar alteração de senha',
    width: 500,
    cls: 'ContainerLogin',
    layout: 'fit',
    modal: true,
    closable: true,
    draggable: false,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            storeSolicitar: Ext.create('ProjetoGarage.store.login.SolicitarSenha'),
            items: [{
                xtype: 'container',
                items: [{
                    xtype: 'form',
                    itemId: 'frmDados',
                    bodyPadding: 10,
                    flex: 1,
                    style: 'border-radius: 4px;',
                    items: [{
                        xtype: 'displayfield',
                        width: '100%',
                        labelSeparator: '',
                        margin: '0 0 10 0',
                        value: 'Digite o seu <b>Login</b> OU o seu <b>E-mail cadastrado</b> no campo abaixo:'
                    }, {
                        xtype: 'textfield',
                        itemId: 'txtEmail',
                        width: '100%',
                        margin: '0 0 10 0',
                        name: 'Solicitacao',
                        cls: 'TxtLogin',
                        enableKeyEvents: true,
                        fieldStyle: 'border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;',
                        allowBlank: false
                    }, {
                        xtype: 'displayfield',
                        width: '100%',
                        labelSeparator: '',
                        margin: '0 0 0 0',
                        value: 'Após enviar a solicitação, você receberá um e-mail com o <b>Código de Alteração</b> de senha. Para cadastrar a nova senha, clique no botão <b>Cadastrar Nova Senha</b>'
                    }],
                    bbar: [{
                        xtype: 'button',
                        text: 'Cadastrar Nova Senha',
                        margin: '0 0 0 0',
                        itemId: 'btnNovaSenha'
                    }, '->', {
                        xtype: 'button',
                        text: 'Enviar Solicitação',
                        margin: '0 10 0 0',
                        itemId: 'btnSolicitar'
                    }]
                }]
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.txtEmail = me.down('#txtEmail');
        me.btnNovaSenha = me.down('#btnNovaSenha');
        me.btnSolicitar = me.down('#btnSolicitar');
        me.form = me.down('#frmDados');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            show: me.onShowWindow
        });

        me.txtEmail.on({
            scope: me,
            keypress: me.onKeyPress
        });

        me.btnNovaSenha.on({
            click: me.onBtnNovaSenhaClick,
            scope: me
        });

        me.btnSolicitar.on({
            click: me.onBtnSolicitarClick,
            scope: me
        });
    },
    onShowWindow: function () {
        var me = this;

        me.txtEmail.focus();
    },
    onKeyPress: function (dado, e, eOpts) {
        var me = this;

        if (e.keyCode === 13) {
            me.btnSolicitar.fireEvent('click');
        }
    },
    onBtnNovaSenhaClick: function () {
        var me = this;

        Ext.create('ProjetoGarage.view.login.WindowResetar', {
            parentWindow: me
        }).show();
    },
    onBtnSolicitarClick: function () {
        var me = this;

        if (me.form.isValid()) {
            Ext.Msg.show({
                title: 'Validação',
                msg: 'Deseja realmente prosseguir com a operação?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.getEl().mask('Enviando solicitação...');
                        var model = Ext.create('ProjetoGarage.model.login.SolicitarSenha');
                        me.form.updateRecord(model);
                        me.storeSolicitar.add(model);

                        me.storeSolicitar.sync({
                            success: function () {
                                Ext.Msg.show({
                                    title: 'Sucesso',
                                    msg: 'Solicitação enviada com sucesso. Em instantes você receberá um email com o Código para alterar a senha!',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                me.getEl().unmask();
                            },
                            failure: function () {
                                me.storeSolicitar.rejectChanges();
                                me.getEl().unmask();
                            }
                        });
                    }
                }
            });
        }
    }
});