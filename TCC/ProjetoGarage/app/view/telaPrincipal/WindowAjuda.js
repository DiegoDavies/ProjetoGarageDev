Ext.define('ProjetoGarage.view.telaPrincipal.WindowAjuda', {
    extend: 'Ext.window.Window',
    xtype: 'ajudaWindow',
    title: 'Ajuda',
    icon: '/resources/images/helpsmall.png',
    width: 650,
    height: screen.availHeight * 0.7,
    layout: 'fit',
    modal: true,
    closable: true,
    draggable: false,
    resizable: false,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            //storeAjuda: Ext.create('ProjetoGarage.store.telaPrincipal.Ajuda'),
            items: [{
                xtype: 'container',
                itemId: 'ctnMensagem',
                margin: 10,
                width: '100%',
                height: '100%',
                html: '&nbsp;',
                autoScroll: true
            }],
            bbar: ['->', {
                xtype: 'button',
                text: 'Minha dúvida não está na lista',
                margin: '0 10 0 0',
                itemId: 'btnSuporte'
            }]
        });

        me.callParent(arguments);
        me.addReferences();
        me.addEventHandler();
    },
    addReferences: function () {
        var me = this;

        me.ctnMensagem = me.down('#ctnMensagem');
        me.btnSuporte = me.down('#btnSuporte');
    },
    addEventHandler: function () {
        var me = this;

        me.on({
            scope: me,
            show: me.onShowWindow
        });

        me.btnSuporte.on({
            click: me.onBtnSuporteClick,
            scope: me
        });
    },
    onShowWindow: function () {
        var me = this,
            tratamento = me.viewport.tabPanelPrincipal.getActiveTab().tratamento;

        if (tratamento && tratamento !== '') {
            me.setVariables(tratamento);
        }
    },
    setVariables: function (tratamento) {
        var me = this;

        var tratamentoInit = tratamento.substring(0, 2),
            tratamentoRest = tratamento.replace(tratamentoInit, '');

        me.html = '';
        me.title = '';
        me.other = '';
        me.objective = '';
        if (tratamentoInit === 'DS') {
            me.html = '<div>' +
                    '<div style="text-align: center;">' +
                        '<span><strong>Dashboard</strong></span>' +
                    '</div>' +
                    '<div style="line-height:1.5">' +
                        '<p><b>Objetivo:</b> Exibição dos dados de Contas à Pagar, Contas à Receber, números de Serviços a serem entregues e números de Orçamentos a serem respondidos.</p>' +
                    '</div>' +
                '</div>';
        }
        else if (tratamentoInit === 'LA') {
            me.html = '<div>' +
                    '<div style="text-align: center;">' +
                        '<span><strong>Auditoria de Usuários</strong></span>' +
                    '</div>' +
                    '<div>' +
                        '<p><b>Objetivo:</b> Exibição de todo os registros dos usuários que estão utilizando o sistema, o que cada um está fazendo, telas que estão acessando e as respectivas alterações que estão fazendo.</p>' +
                        '<p><b>Funcionalidades:</b></p>' +
                        '<ul>' +
                            '<li><b>Pesquisa:</b> Para realizar a pesquisa, é necessário incluir o termo desejado no campo de pesquisa localizado na parte inferior direita da tela e apertar <b><i>Enter</i></b> ou clicar no botão <b><i>Pesquisar;</i></b></li>' +
                            '<li><b>Paginação:</b> Para realizar a navegação entre todas as páginas de registros, existe o menu posicionado na parte inferior esquerda, utilizando os botões de <b><i>Primeira Página, Página anterior, Número da Página Desejada, Próxima Página e Última Página</i></b> e também a funcionalidade de <b><i>Atualizar os Registros</i></b> nessa respectiva ordem.</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>';
        }
        else if (tratamentoInit === 'LE') {
            if (tratamentoRest === 'CLIE') {
                me.title = 'Cadastro de Clientes';
                me.objective = 'Exibição de todos os Clientes cadastrados no sistema. ';
            }
            else if (tratamentoRest === 'CPAG') {
                me.title = 'Cadastro de Contas à Pagar';
                me.objective = 'Exibição de todas as Contas à Pagar cadastradas no sistema, independente se a mesma está paga ou não. ';
            }
            else if (tratamentoRest === 'CREC') {
                me.title = 'Cadastro de Contas à Receber';
                me.objective = 'Exibição de todas as Contas à Receber cadastradas no sistema, independente se a mesma já foi recebida ou não. ';
            }
            else if (tratamentoRest === 'FORN') {
                me.title = 'Cadastro de Fornecedores';
                me.objective = 'Exibição de todos os Fornecedores cadastrados no sistema, com status para o usuário saber se o mesmo é um bom fornecedor ou não. ';
            }
            else if (tratamentoRest === 'FUNC') {
                me.title = 'Cadastro de Funcionários';
                me.objective = 'Exibição de todos os Funcionários cadastrados no sistema, com algumas informações básicas para não necessitar entrar na tela. ';
            }
            else if (tratamentoRest === 'ORÇA') {
                me.title = 'Cadastro de Orçamentos';
                me.objective = 'Exibição de todos os Orçamentos cadastrados no sistema, os que possuem status Aprovado, foram cadastrados automaticamente como serviços no ato da aprovação. ';
            }
            else if (tratamentoRest === 'SERV') {
                me.title = 'Cadastro de Serviços';
                me.objective = 'Exibição de todos os Serviços cadastrados no sistema, exibindo também seus respectivos Status. ';
            }
            else if (tratamentoRest === 'VEIC') {
                me.title = 'Cadastro de Veículos';
                me.objective = 'Exibição de todos os Veículos cadastrados no sistema, com os seus respectivos Clientes. ';
            }
            else if (tratamentoRest === 'PROD') {
                me.title = 'Cadastro de Produto';
                me.objective = 'Exibição de todos os Produtos cadastrados no sistema. ';
            }
            me.html = '<div>' +
                    '<div style="text-align: center;">' +
                        '<span><strong>' + me.title + '</strong></span>' +
                    '</div>' +
                    '<div style="line-height:1.5">' +
                        '<p><b>Objetivo:</b> ' + me.objective + 'Conta também com as informações do usuário que incluiu esse registro e sua respectiva hora de inclusão, e também com a informação do último usuário que realizou uma alteração e sua respectiva hora. </p>' +
                        '<p><b>Funcionalidades:</b></p>' +
                        '<ul>' +
                            '<li><b>Inclusão:</b> Para realizar a inclusão, é necessário clicar no botão <b><i>Novo</i></b> e preencher os dados necessários na nova aba que irá abrir;</li>' +
                            '<li><b>Alteração:</b> Para realizar uma alteração, é necessário clicar <b><i>duas vezes</i></b> sobre a linha que deseja realizar as alterações e efetuar a mesma na nova aba que irá abrir;</li>' +
                            '<li><b>Exclusão:</b> Para realizar a exclusão, é necessário <b><i>selecionar</i></b> (com um clique sobre a linha) a linha que deseja excluir e clicar no botão <b><i>Excluir;</i></b></li>' +
                            '<li><b>Geração de Relatório:</b> Existem duas opções de gerar relatório no Sistema:' +
                                '<ul>' +
                                    '<li><b>Excel:</b> Para realizar o download do relatório em formato Excel, é necessário clicar no botão <b><i>Gerar Relatório</i></b> e no menu que aparecer, clicar no botão <b><i>Relatório em Excel</i></b>. Todos os itens que estão sendo exibidos na tela serão enviados para um novo arquivo e posteriormente será realizado o download do mesmo e disponibilizado no navegador;</li>' +
                                    '<li><b>PDF:</b> Para realizar o download do relatório em formato PDF, é necessário selecionar o registro do qual deseja imprimir o relatório, clicar no botão <b><i>Gerar Relatório</i></b> e no menu que aparecer, clicar no botão <b><i>Relatório em PDF</i></b>. Será realizado o download do arquivo e disponibilizado no navegador.</li>' +
                                '</ul>' +
                            '</li>' +
                            '<li><b>Pesquisa:</b> Para realizar a pesquisa, é necessário incluir o termo desejado no campo de pesquisa localizado na parte inferior direita da tela e apertar <b><i>Enter</i></b> ou clicar no botão <b><i>Pesquisar;</i></b></li>' +
                            '<li><b>Paginação:</b> Para realizar a navegação entre todas as páginas de registros, existe o menu posicionado na parte inferior esquerda, utilizando os botões de <b><i>Primeira Página, Página anterior, Número da Página Desejada, Próxima Página e Última Página</i></b> e também a funcionalidade de <b><i>Atualizar os Registros</i></b> nessa respectiva ordem.</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>';
        }
        else if (tratamentoInit === 'LG') {
            if (tratamentoRest === 'BANCO') {
                me.title = 'Cadastro de Bancos';
                me.objective = 'Cadastro de Bancos que serão utilizados pelo cadastro de Fornecedores e de Funcionários. ';
            }
            else if (tratamentoRest === 'DURAC') {
                me.title = 'Cadastro de Durações';
                me.objective = 'Cadastro de Durações que serão utilizados para definir o tipo de duração do Orçamento e do Serviço. ';
            }
            else if (tratamentoRest === 'ESTCI') {
                me.title = 'Cadastro de Estados Civis';
                me.objective = 'Cadastro de Estados Civis que serão utilizados no cadastro de Funcionários e Clientes. ';
            }
            else if (tratamentoRest === 'ETNIA') {
                me.title = 'Cadastro de Etnias';
                me.objective = 'Cadastro de Etnias que serão utilizados no cadastro de Funcionários. ';
            }
            else if (tratamentoRest === 'FORMA') {
                me.title = 'Cadastro de Formações';
                me.objective = 'Cadastro de Formações que serão utilizados no cadastro de Funcionários. ';
            }
            else if (tratamentoRest === 'FUNCA') {
                me.title = 'Cadastro de Funções';
                me.objective = 'Cadastro de Funções que serão utilizadas no cadastro de Funcionários e Clientes. ';
            }
            else if (tratamentoRest === 'GRUCO') {
                me.title = 'Cadastro de Grupos de Compra';
                me.objective = 'Cadastro de Grupos de Compra que serão utilizados no cadastro de Produtos. ';
            }
            else if (tratamentoRest === 'MARCA') {
                me.title = 'Cadastro de Marcas';
                me.objective = 'Cadastro de Marcas de Veículos. ';
            }
            else if (tratamentoRest === 'MARPR') {
                me.title = 'Cadastro de Marcas (Produto)';
                me.objective = 'Cadastro de Marcas de Produtos. ';
            }
            else if (tratamentoRest === 'MODEL') {
                me.title = 'Cadastro de Modelos';
                me.objective = 'Cadastro de Modelos de Veículos com base nas suas respectivas Marcas. ';
            }
            else if (tratamentoRest === 'MODPR') {
                me.title = 'Cadastro de Modelo (Produto)';
                me.objective = 'Cadastro de Modelos de Produtos. ';
            }
            else if (tratamentoRest === 'PAREN') {
                me.title = 'Cadastro de Grau de Parentesco';
                me.objective = 'Cadastro de Grau de Parentesco que serão utilizados no cadastro de Dependentes dos Funcionários. ';
            }
            else if (tratamentoRest === 'SITUA') {
                me.title = 'Cadastro de Situações';
                me.objective = 'Cadastro de Situações que serão utilizados no cadastro de Funcionários. ';
            }
            else if (tratamentoRest === 'STATUS') {
                me.title = 'Cadastro de Status (Fornecedor)';
                me.objective = 'Cadastro de Status que serão utilizados para definir se o Fornecedor é bom ou não. ';
            }
            else if (tratamentoRest === 'TIPAG') {
                me.title = 'Cadastro de Tipos de Pagamentos';
                me.objective = 'Cadastro de Tipos de Pagamentos que serão utilizados no cadastro de um novo Recebimento ou Pagamento. ';
            }
            else if (tratamentoRest === 'UNMED') {
                me.title = 'Cadastro de Unidades de Medida';
                me.objective = 'Cadastro de Unidades de Medida que serão utilizados no cadastro de Produtos. ';
            }
            me.html = '<div>' +
                '<div style="text-align: center;">' +
                    '<span><strong>' + me.title + '</strong></span>' +
                '</div>' +
                    '<div style="line-height:1.5">' +
                        '<p><b>Objetivo:</b> ' + me.objective + 'Conta também com as informações do usuário que incluiu esse registro e sua respectiva hora de inclusão, e também com a informação do último usuário que realizou uma alteração e sua respectiva hora. </p>' +
                        '<p><b>Funcionalidades:</b></p>' +
                        '<ul>' +
                            '<li><b>Inclusão:</b> Para realizar a inclusão, é necessário clicar no botão <b><i>Novo</i></b> e preencher os dados necessários na nova janela que irá abrir;</li>' +
                            '<li><b>Alteração:</b> Para realizar uma alteração, é necessário clicar <b><i>duas vezes</i></b> sobre a linha que deseja realizar as alterações e efetuar a mesma na nova janela que irá abrir;</li>' +
                            '<li><b>Exclusão:</b> Para realizar a exclusão, é necessário <b><i>selecionar</i></b> (com um clique sobre a linha) a linha que deseja excluir e clicar no botão <b><i>Excluir;</i></b></li>' +
                            '<li><b>Pesquisa:</b> Para realizar a pesquisa, é necessário incluir o termo desejado no campo de pesquisa localizado na parte inferior direita da tela e apertar <b><i>Enter</i></b> ou clicar no botão <b><i>Pesquisar;</i></b></li>' +
                            '<li><b>Paginação:</b> Para realizar a navegação entre todas as páginas de registros, existe o menu posicionado na parte inferior esquerda, utilizando os botões de <b><i>Primeira Página, Página anterior, Número da Página Desejada, Próxima Página e Última Página</i></b> e também a funcionalidade de <b><i>Atualizar os Registros</i></b> nessa respectiva ordem.</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>';
        }
        else if (tratamentoInit === 'CE') {
            if (tratamentoRest === 'CREC') {
                me.title = 'Cadastro de Conta à Receber';
                me.objective = 'Tela de Cadastro de Contas à Receber';
                me.other = 'Recebimentos e Histórico de todas as alterações';
            }
            else if (tratamentoRest === 'CLIE') {
                me.title = 'Cadastro de Cliente';
                me.objective = 'Tela de Cadastro de Cliente';
                me.other = 'Contas à Receber, Orçamentos, Serviços, Veículos e Histórico de todas as alterações';
            }
            else if (tratamentoRest === 'CPAG') {
                me.title = 'Cadastro de Conta à Pagar';
                me.objective = 'Tela de Cadastro de Contas à Pagar';
                me.other = 'Pagamentos e Históricos de todas as alterações';
            }
            else if (tratamentoRest === 'FORN') {
                me.title = 'Cadastro de Fornecedor';
                me.objective = 'Tela de Cadastro de Fornecedor';
                me.other = 'Contas à Pagar, Bancos para pagamentos do Fornecedor e Histórico de todas as alterações';
            }
            else if (tratamentoRest === 'FUNC') {
                me.title = 'Cadastro de Funcionário';
                me.objective = 'Tela de Cadastro de Funcionário';
                me.other = 'Contas à Pagar, Dependentes do Funcionário, Histórico Ocupacional na empresa, Bancos para pagamentos do Funcionário e Histórico de todas as alterações';
            }
            else if (tratamentoRest === 'PROD') {
                me.title = 'Cadastro de Produto';
                me.objective = 'Tela de Cadastro de Produto';
                me.other = 'Nome pelo Fornecedor (que será o vínculo do produto com o Fornecedor) e Histórico de todas as alterações';
            }
            else if (tratamentoRest === 'ORÇA') {
                me.title = 'Cadastro de Orçamento';
                me.objective = 'Tela de Cadastro de Orçamento';
                me.other = 'Custos, Produtos que serão necessários, Veículos que serão realizados a manutenção e Histórico de todas as alterações';
            }
            else if (tratamentoRest === 'SERV') {
                me.title = 'Cadastro de Serviços';
                me.objective = 'Tela de Cadastro de Serviços';
                me.other = 'Custos, Produtos que serão necessários, Veículos que serão realizados a manutenção e Histórico de todas as alterações';
            }
            else if (tratamentoRest === 'VEIC') {
                me.title = 'Cadastro de Veículo';
                me.objective = 'Tela de Cadastro de Veículo';
                me.other = 'Histórico de todas as alterações';
            }
            me.html = '<div>' +
                    '<div style="text-align: center;">' +
                        '<span><strong>' + me.title + '</strong></span>' +
                    '</div>' +
                    '<div style="line-height: 1.5">' +
                        '<p><b>Descritivo:</b> ' + me.objective + ', preencha as informações necessárias no Formulário a esquerda e posteriormente clique no botão Salvar. Ao clicar em Salvar, o formulário será recarregado e novas funcionalidades serão disponibilizadas, como visualização de ' + me.other + '.</p>' +
                    '</div>' +
                '</div>';
        }
        else if (tratamentoInit === 'AE') {
            if (tratamentoRest === 'CREC') {
                me.title = 'Alteração de Conta à Receber';
                me.objective = 'Tela de Alteração de Contas à Receber';
                me.other = 'Para realizar a inclusão de um novo recebimento, vá a aba de Recebimentos e clique em Novo e preencha as informações necessárias; ' +
                    'Para realizar a alteração de um recebimento, vá a aba de Recebimentos e de dois cliques na linha desejada; ' +
                    'Para realizar a exclusão do recebimento, é necessário selecionar o item desejado e clicar em estorno, o mesmo será cancelado e lançado um novo recebimento com o valor negativo.';
            }
            else if (tratamentoRest === 'CLIE') {
                me.title = 'Alteração de Cliente';
                me.objective = 'Tela de Alteração de Cliente';
                me.other = '';
            }
            else if (tratamentoRest === 'CPAG') {
                me.title = 'Alteração de Conta à Pagar';
                me.objective = 'Tela de Alteração de Conta à Pagar';
                me.other = 'Para realizar a inclusão de um novo pagamento, vá a aba de Pagamentos e clique em Novo e preencha as informações necessárias; ' +
                    'Para realizar a alteração de um pagamento, vá a aba de Pagamentos e de dois cliques na linha desejada; ' +
                    'Para realizar a exclusão do pagamento, é necessário selecionar o item desejado e clicar em estorno, o mesmo será cancelado e lançado um novo pagamento com o valor negativo.';
            }
            else if (tratamentoRest === 'FORN') {
                me.title = 'Alteração de Fornecedor';
                me.objective = 'Tela de Alteração de Fornecedor';
                me.other = '';
            }
            else if (tratamentoRest === 'FUNC') {
                me.title = 'Alteração de Funcionário';
                me.objective = 'Tela de Alteração de Funcionários';
                me.other = '';
            }
            else if (tratamentoRest === 'PROD') {
                me.title = 'Alteração de Produto';
                me.objective = 'Tela de Alteração de Produto';
                me.other = 'Para realizar a inclusão de um novo vínculo do produto com um Fornecedor, vá a aba de Nome pelo Fornecedor e clique em Novo e preencha as informações necessárias; ' +
                    'Para realizar a alteração de um vínculo, vá a aba de Nome pelo Fornecedor e de dois cliques na linha desejada; ' +
                    'Para realizar a exclusão de um vínculo, vá a aba, selecione o item desejado e clique no botão Excluir.';
            }
            else if (tratamentoRest === 'ORÇA') {
                me.title = 'Alteração de Orçamento';
                me.objective = 'Tela de Alteração de Orçamento';
                me.other = '';
            }
            else if (tratamentoRest === 'SERV') {
                me.title = 'Alteração de Serviço';
                me.objective = 'Tela de Alteração de Serviço';
                me.other = '';
            }
            else if (tratamentoRest === 'VEIC') {
                me.title = 'Alteração de Veículo';
                me.objective = 'Tela de Alteração de Veículo';
                me.other = '';
            }
            me.html = '<div>' +
                    '<div style="text-align: center;">' +
                        '<span><strong>' + me.title + '</strong></span>' +
                    '</div>' +
                    '<div style="line-height: 1.5">' +
                        '<p><b>Descritivo:</b> ' + me.objective + ', para realizar alguma alteração preencha as informações desejadas no Formulário a esquerda e posteriormente clique no botão Salvar. ' + me.other + '</p>' +
                    '</div>' +
                '</div>';
        }
        me.ctnMensagem.update(me.html);
    },
    onBtnSuporteClick: function () {
        var me = this;

        me.close();
        Ext.create('ProjetoGarage.view.telaPrincipal.WindowSuporte').show();
    }
});