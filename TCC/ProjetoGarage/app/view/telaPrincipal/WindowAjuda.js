Ext.define('ProjetoGarage.view.telaPrincipal.WindowAjuda', {
    extend: 'Ext.window.Window',
    xtype: 'ajudaWindow',
    title: 'Ajuda',
    icon: '/resources/images/help-white.png',
    width: 650,
    maxHeight: screen.availHeight * 0.8,
    layout: 'fit',
    modal: true,
    closable: true,
    draggable: false,
    resizable: false,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
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
            show: me.onShowWindow,
            resize: me.onResize
        });

        me.btnSuporte.on({
            click: me.onBtnSuporteClick,
            scope: me
        });
    },
    onResize: function () {
        var me = this;

        me.center();
    },
    onShowWindow: function () {
        var me = this,
            activeTab = (me.viewport ? me.viewport.tabPanelPrincipal.getActiveTab() : null),
            tratamentoViewport = (activeTab !== null && activeTab !== undefined ? (activeTab.tratamento ? activeTab.tratamento : '') : ''),
            tratamentoWindow = (me.window ? (me.window.tratamento ? me.window.tratamento : '') : '');

        if (tratamentoViewport !== '') {
            me.setModelosViewport(tratamentoViewport);
        }
        if (tratamentoWindow !== '') {
            me.setModelosWindow(tratamentoWindow);
        }
        if (tratamentoWindow === '' && tratamentoViewport === '') {
            me.setMensagemPadrao();
        }
    },
    setMensagemPadrao: function() {
        var me = this;

        me.setWidth(400);

        me.html = '<div>' +
                '<div style="text-align: center;">' +
                    '<span><strong>Tela de Ajuda</strong></span>' +
                '</div>' +
                '<div style="line-height: 1.5">' +
                    '<p>Selecione uma tela no menu do lado esquerdo para ter acesso ao cadastro desejado.</p>' +
                    '<p>Caso já esteja em uma tela, e essa mensagem está aparecendo, clique no botão abaixo e envie um comentário detalhado para que possam entrar em contato com você e resolver o seu problema.</p>' +
                '</div>' +
            '</div>';

        me.ctnMensagem.update(me.html);
    },
    setModelosWindow: function (tratamento) {
        var me = this,
            tratamentoInit = tratamento.substring(0, 2),
            tratamentoRest = tratamento.replace(tratamentoInit, '');

        me.setWidth(400);

        me.html = '';
        me.title = '';
        me.other = '';
        me.objective = '';
        if (tratamentoInit === 'AO' || tratamentoInit === 'CO') {
            me.title = (tratamentoInit === 'AO' ? 'Alteração' : 'Cadastro');
            me.objective = 'Tela de ' + (tratamentoInit === 'AO' ? 'Alteração' : 'Cadastro');
            if (tratamentoRest === 'PAGT') {
                me.title = me.title + ' de Pagamentos';
                me.objective = me.objective + ' de Pagamentos';
                me.other = 'Tela responsável por cadastrar Pagamentos a conta em questão, mantendo um histórico de toda a movimentação.';
            }
            else if (tratamentoRest === 'RECE') {
                me.title = me.title + ' de Recebimentos';
                me.objective = me.objective + ' de Recebimentos';
                me.other = ' Tela responsável por cadastrar Recebimentos a conta em questão, mantendo um histórico de toda a movimentação.';
            }
            else if (tratamentoRest === 'PROD') {
                me.title = me.title + ' de Vínculo de Produtos';
                me.objective = me.objective + ' de Vínculo de Produtos';
                me.other = ' Tela responsável por víncular produtos ao Fornecedor em questão';
            }
            else if (tratamentoRest === 'BANC') {
                me.title = me.title + ' de Pagamentos';
                me.objective = me.objective + ' de Pagamentos';
                me.other = ' Tela responsável por cadastrar as contas para efetuação de pagamentos.';
            }
            else if (tratamentoRest === 'DEPE') {
                me.title = me.title + ' de Dependentes';
                me.objective = me.objective + ' de Dependentes';
                me.other = ' Tela responsável por cadastrar os dependentes do Funcionário em questão. Com seus respectivos graus de parentesco.';
            }
            else if (tratamentoRest === 'OCUP') {
                me.title = me.title + ' de Histórico Ocupacional';
                me.objective = me.objective + ' de Histórico Ocupacional';
                me.other = ' Tela responsável por cadastrar o histórico completo do funcionário na empresa, com seus afastamentos, data de admissão, demissão e etc.';
            }
            else if (tratamentoRest === 'FORN') {
                me.title = me.title + ' de Vínculo com Fornecedor';
                me.objective = me.objective + ' de Vínculo com Fornecedor';
                me.other = ' Tela responsável por víncular Fornecedores ao produto em questão, determinando nomes do Produto para cada Fornecedor.';
            }
            else if (tratamentoRest === 'VIPR') {
                me.title = me.title + ' de Seleção de Produtos';
                me.objective = me.objective + ' de Seleção de Produtos';
                me.other = ' Tela responsável por adicionar Produtos ao Orçamento/Serviço em questão, determinando quais produtos serão utilizados para a realização da manutenção.';
            }
            else if (tratamentoRest === 'VIVE') {
                me.title = me.title + ' de Seleção de Veículos';
                me.objective = me.objective + ' de Seleção de Veículos';
                me.other = ' Tela responsável por adicionar Veículos ao Orçamento/Serviço em questão, determinando o veículo que será realizado a manutenção.';
            }
            else if (tratamentoRest === 'CUST') {
                me.title = me.title + ' de Custos';
                me.objective = me.objective + ' de Custos';
                me.other = ' Tela responsável por adicionar custos extras caso necessário, e responsável por definir se o custo é positivo ou negativo.';
            }
            me.html = '<div>' +
                '<div style="text-align: center;">' +
                    '<span><strong>' + me.title + '</strong></span>' +
                '</div>' +
                '<div style="line-height: 1.5">' +
                    '<p><b>Descritivo:</b> ' + me.objective + ', preencha a(s) informação(ões) desejada(s) no(s) campo(s) abaixo e posteriormente clique no botão Salvar. ' + me.other + '</p>' +
                '</div>' +
            '</div>';
        }
        else if (tratamentoInit === 'AG' || tratamentoInit === 'CG') {
            me.title = (tratamentoInit === 'AG' ? 'Alteração' : 'Cadastro');
            me.objective = 'Tela de ' + (tratamentoInit === 'AG' ? 'Alteração' : 'Cadastro');
            if (tratamentoRest === 'ETNI') {
                me.title = me.title + ' de Etnia';
                me.objective = me.objective + ' de Etnia';
            }
            else if (tratamentoRest === 'ESCI') {
                me.title = me.title + ' de Estado Civil';
                me.objective = me.objective + ' de Estado Civil';
            }
            else if (tratamentoRest === 'DURA') {
                me.title = me.title + ' de Duração';
                me.objective = me.objective + ' de Duração';
            }
            else if (tratamentoRest === 'BANC') {
                me.title = me.title + ' de Banco';
                me.objective = me.objective + ' de Banco';
            }
            else if (tratamentoRest === 'FUNÇ') {
                me.title = me.title + ' de Função';
                me.objective = me.objective + ' de Função';
            }
            else if (tratamentoRest === 'GRCO') {
                me.title = me.title + ' de Grupo de Compra';
                me.objective = me.objective + ' de Grupo de Compra';
            }
            else if (tratamentoRest === 'MARC') {
                me.title = me.title + ' de Marca (Veículo)';
                me.objective = me.objective + ' de Marca (Veículo)';
            }
            else if (tratamentoRest === 'MAPR') {
                me.title = me.title + ' de Marca (Produto)';
                me.objective = me.objective + ' de Marca (Produto)';
            }
            else if (tratamentoRest === 'MODE') {
                me.title = me.title + ' de Modelo (Veículo)';
                me.objective = me.objective + ' de Modelo (Veículo)';
                me.other = 'É necessário cadastrar anteriormente as Marcas para poder utilizar.';
            }
            else if (tratamentoRest === 'MOPR') {
                me.title = me.title + ' de Modelo (Produto)';
                me.objective = me.objective + ' de Modelo (Produto)';
            }
            else if (tratamentoRest === 'PARE') {
                me.title = me.title + ' de Parentesco';
                me.objective = me.objective + ' de Parentesco';
            }
            else if (tratamentoRest === 'SITU') {
                me.title = me.title + ' de Situação';
                me.objective = me.objective + ' de Situação';
            }
            else if (tratamentoRest === 'STFO') {
                me.title = me.title + ' de Status de Fornecedor';
                me.objective = me.objective + ' de Status de Fornecedor';
            }
            else if (tratamentoRest === 'TIPO') {
                me.title = me.title + ' de Tipo de Pagamento';
                me.objective = me.objective + ' de Tipo de Pagamento';
            }
            else if (tratamentoRest === 'UNMD') {
                me.title = me.title + ' de Unidade de Medida';
                me.objective = me.objective + ' de Unidade de Medida';
            }
            else if (tratamentoRest === 'FORM') {
                me.title = me.title + ' de Formação';
                me.objective = me.objective + ' de Formação';
            }
            me.html = '<div>' +
                    '<div style="text-align: center;">' +
                        '<span><strong>' + me.title + '</strong></span>' +
                    '</div>' +
                    '<div style="line-height: 1.5">' +
                        '<p><b>Descritivo:</b> ' + me.objective + ', para realizar alguma alteração preencha a(s) informação(ões) desejada(s) no(s) campo(s) abaixo e posteriormente clique no botão Salvar. ' + me.other + '</p>' +
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
                        '<p><b>Descritivo:</b> ' + me.objective + ', preencha as informações necessárias no Formulário abaixo e posteriormente clique no botão Salvar. Ao clicar em Salvar, a tela será fechada e será exibido o novo registro na tabela, selecionando o mesmo e dando dois cliques, abrirá uma nova tela onde será possivel realizar a alteração dos registros e visualização de ' + me.other + '.</p>' +
                    '</div>' +
                '</div>';
        }

        me.ctnMensagem.update(me.html);
    },
    setModelosViewport: function (tratamento) {
        var me = this,
            tratamentoInit = tratamento.substring(0, 2),
            tratamentoRest = tratamento.replace(tratamentoInit, '');

        me.setWidth(650);

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
            me.setWidth(400);
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
            me.setWidth(450);
        }
        else if (tratamentoInit === 'AE') {
            if (tratamentoRest === 'CREC') {
                me.title = 'Alteração de Conta à Receber';
                me.objective = 'Tela de Alteração de Contas à Receber';
                me.other = '<p><b>Recebimentos</b></p><ul><li>Para realizar a inclusão de um novo recebimento, vá a aba de <b><i>Recebimentos</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um recebimento, vá a aba de <b><i>Recebimentos</i></b> e de dois cliques na linha desejada; </li>' +
                    '<li>Para realizar a exclusão do recebimento, vá a aba de <b><i>Recebimentos</i></b> e selecione o item desejado, clique em estorno, o mesmo será cancelado e lançado um novo recebimento com o valor negativo.</li></ul>';
            }
            else if (tratamentoRest === 'CLIE') {
                me.title = 'Alteração de Cliente';
                me.objective = 'Tela de Alteração de Cliente';
                me.other = '<p><b>Contas à Receber:</b></p><ul><li>Para realizar a inclusão de uma Conta à Receber para esse Cliente, vá a aba de <b><i>Contas à Receber</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de uma Conta à Receber, vá a aba de <b><i>Contas à Receber</i></b> e de dois cliques na linha desejada, posteriormente preencha as informações na nova aba que irá abrir; </li>' +
                    '<li>Para realizar a exclusão de uma Conta à Receber, vá a aba de <b><i>Contas à Receber</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>' +
                    '<p><b>Orçamentos:</b></p><ul><li>Para realizar a inclusão de um Orçamento para esse Cliente, vá a aba de <b><i>Orçamentos</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um Orçamento, vá a aba de <b><i>Orçamento</i></b> e de dois cliques na linha desejada, posteriormente preencha as informações na nova aba que irá abrir; </li>' +
                    '<li>Para realizar a exclusão de um Orçamento, vá a aba de <b><i>Orçamento</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>' +
                    '<p><b>Serviços:</b></p><ul><li>Para realizar a inclusão de um Serviço para esse Cliente, vá a aba de <b><i>Serviço</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um Serviço, vá a aba de <b><i>Serviço</i></b> e de dois cliques na linha desejada, posteriormente preencha as informações na nova aba que irá abrir; </li>' +
                    '<li>Para realizar a exclusão de um Serviço, vá a aba de <b><i>Serviço</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>' +
                    '<p><b>Veículos:</b></p><ul><li>Para realizar a inclusão de um Veículo para esse Cliente, vá a aba de <b><i>Veículos</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um Veículo, vá a aba de <b><i>Veículos</i></b> e de dois cliques na linha desejada, posteriormente preencha as informações na nova aba que irá abrir; </li>' +
                    '<li>Para realizar a exclusão de um Veículo, vá a aba de <b><i>Veículos</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>';
            }
            else if (tratamentoRest === 'CPAG') {
                me.title = 'Alteração de Conta à Pagar';
                me.objective = 'Tela de Alteração de Conta à Pagar';
                me.other = '<p><b>Pagamentos:</b></p><ul><li>Para realizar a inclusão de um novo pagamento, vá a aba de <b><i>Pagamentos</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um pagamento, vá a aba de <b><i>Pagamentos</i></b> e de dois cliques na linha desejada; </li>' +
                    '<li>Para realizar a exclusão do pagamento, vá a aba de <b><i>Pagamentos</i></b> e selecione o item desejado, clique em estorno, o mesmo será cancelado e lançado um novo pagamento com o valor negativo. </li></ul>';
            }
            else if (tratamentoRest === 'FORN') {
                me.title = 'Alteração de Fornecedor';
                me.objective = 'Tela de Alteração de Fornecedor';
                me.other = '<p><b>Contas à Pagar:</b></p><ul><li>Para realizar a inclusão de uma Conta à Pagar para esse Fornecedor, vá a aba de <b><i>Contas à Pagar</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                        '<li>Para realizar a alteração de uma Conta à Pagar, vá a aba de <b><i>Contas à Pagar</i></b> e de dois cliques na linha desejada, posteriormente preencha as informações na nova aba que irá abrir; </li>' +
                        '<li>Para realizar a exclusão de uma Conta à Pagar, vá a aba de <b><i>Contas à Pagar</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>' +
                        '<p><b>Produtos:</b></p><ul><li>Para realizar o vínculo de um Produto para esse Fornecedor, vá a aba de <b><i>Produtos</i></b> e clique em Novo e selecione o produto desejado; </li>' +
                        '<li>Para realizar a alteração de um vínculo de Produto, vá a aba de <b><i>Produtos</i></b> e de dois cliques na linha desejada, posteriormente selecione o novo produto desejado; </li>' +
                        '<li>Para realizar a exclusão de um vínculo de Prouto, vá a aba de <b><i>Produtos</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>' +
                        '<p><b>Bancos:</b></p><ul><li>Para realizar a inclusão de um Banco para esse Fornecedor, vá a aba de <b><i>Bancos</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                        '<li>Para realizar a alteração de um Banco, vá a aba de <b><i>Bancos</i></b> e de dois cliques na linha desejada; </li>' +
                        '<li>Para realizar a exclusão de um Banco, vá a aba de <b><i>Bancos</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>';
            }
            else if (tratamentoRest === 'FUNC') {
                me.title = 'Alteração de Funcionário';
                me.objective = 'Tela de Alteração de Funcionários';
                me.other = '<p><b>Contas à Pagar:</b></p><ul><li>Para realizar a inclusão de uma Conta à Pagar para esse Funcionário, vá a aba de <b><i>Contas à Pagar</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de uma Conta à Pagar, vá a aba de <b><i>Contas à Pagar</i></b> e de dois cliques na linha desejada, posteriormente preencha as informações na nova aba que irá abrir; </li>' +
                    '<li>Para realizar a exclusão de uma Conta à Pagar, vá a aba de <b><i>Contas à Pagar</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>' +
                    '<p><b>Dependentes:</b></p><ul><li>Para realizar a inclusão de um Dependente para esse Funcionário, vá a aba de <b><i>Dependentes</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um Dependente, vá a aba de <b><i>Dependentes</i></b> e de dois cliques na linha desejada; </li>' +
                    '<li>Para realizar a exclusão de um Dependente, vá a aba de <b><i>Dependentes</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>' +
                    '<p><b>Histórico Ocupacional:</b></p><ul><li>Para realizar a inclusão de um Histórico Ocupacional para esse Funcionário, vá a aba de <b><i>Histórico Ocupacional</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um Histórico Ocupacional, vá a aba de <b><i>Histórico Ocupacional</i></b> e de dois cliques na linha desejada; </li>' +
                    '<li>Para realizar a exclusão de um Histórico Ocupacional, vá a aba de <b><i>Histórico Ocupacional</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>' +
                    '<p><b>Bancos:</b></p><ul><li>Para realizar a inclusão de um Banco para esse Funcionário, vá a aba de <b><i>Bancos</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um Banco, vá a aba de <b><i>Bancos</i></b> e de dois cliques na linha desejada; </li>' +
                    '<li>Para realizar a exclusão de um Banco, vá a aba de <b><i>Bancos</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>';
            }
            else if (tratamentoRest === 'PROD') {
                me.title = 'Alteração de Produto';
                me.objective = 'Tela de Alteração de Produto';
                me.other = '<p><b>Vínculo com Fornecedor:</b></p><ul><li>Para realizar a inclusão de um novo vínculo do produto com um Fornecedor, vá a aba de <b><i>Nome pelo Fornecedor</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um vínculo, vá a aba de <b><i>Nome pelo Fornecedor</i></b> e de dois cliques na linha desejada; </li>' +
                    '<li>Para realizar a exclusão de um vínculo, vá a aba de <b><i>Nome pelo Fornecedor</i></b>, selecione o item desejado e clique no botão Excluir. </li></ul>';
            }
            else if (tratamentoRest === 'ORÇA') {
                me.title = 'Alteração de Orçamento';
                me.objective = 'Tela de Alteração de Orçamento';
                me.other = '<p><b>Custos:</b></p><ul><li>Para realizar a inclusão de um Custo para esse Orçamento, vá a tabela de <b><i>Custos</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um Custo, vá a tabela de <b><i>Custos</i></b> e de dois cliques na linha desejada; </li>' +
                    '<li>Para realizar a exclusão de um Custo, vá a tabela de <b><i>Custos</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>' +
                    '<p><b>Produtos:</b></p><ul><li>Para realizar a inclusão de um Produto para esse Orçamento, vá a aba de <b><i>Produtos</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um Produto, vá a aba de <b><i>Produtos</i></b> e de dois cliques na linha desejada; </li>' +
                    '<li>Para realizar a exclusão de um Produto, vá a aba de <b><i>Produtos</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>' +
                    '<p><b>Veículos:</b></p><ul><li>Para realizar a inclusão de um Veículo para esse Orçamento, vá a aba de <b><i>Veículos</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um Veículo, vá a aba de <b><i>Veículos</i></b> e de dois cliques na linha desejada; </li>' +
                    '<li>Para realizar a exclusão de um Veículo, vá a aba de <b><i>Veículos</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>';
            }
            else if (tratamentoRest === 'SERV') {
                me.title = 'Alteração de Serviço';
                me.objective = 'Tela de Alteração de Serviço';
                me.other = '<p><b>Custos:</b></p><ul><li>Para realizar a inclusão de um Custo para esse Serviço, vá a tabela de <b><i>Custos</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um Custo, vá a tabela de <b><i>Custos</i></b> e de dois cliques na linha desejada; </li>' +
                    '<li>Para realizar a exclusão de um Custo, vá a tabela de <b><i>Custos</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>' +
                    '<p><b>Produtos:</b></p><ul><li>Para realizar a inclusão de um Produto para esse Serviço, vá a aba de <b><i>Produtos</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um Produto, vá a aba de <b><i>Produtos</i></b> e de dois cliques na linha desejada; </li>' +
                    '<li>Para realizar a exclusão de um Produto, vá a aba de <b><i>Produtos</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>' +
                    '<p><b>Veículos:</b></p><ul><li>Para realizar a inclusão de um Veículo para esse Serviço, vá a aba de <b><i>Veículos</i></b> e clique em Novo e preencha as informações necessárias; </li>' +
                    '<li>Para realizar a alteração de um Veículo, vá a aba de <b><i>Veículos</i></b> e de dois cliques na linha desejada; </li>' +
                    '<li>Para realizar a exclusão de um Veículo, vá a aba de <b><i>Veículos</i></b> e selecione o item desejado, clique em Excluir, o mesmo será excluido.</li></ul>';
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
                        '<p><b>Descritivo:</b> ' + me.objective + ', para realizar alguma alteração preencha as informações desejadas no Formulário a esquerda e posteriormente clique no botão Salvar. </p> ' +
                        me.other +
                    '</div>' +
                '</div>';
            me.setWidth(600);
        }
        me.ctnMensagem.update(me.html);
    },
    onBtnSuporteClick: function () {
        var me = this;

        me.close();
        Ext.create('ProjetoGarage.view.telaPrincipal.WindowSuporte').show();
    }
});