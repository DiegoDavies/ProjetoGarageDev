﻿Ext.define('ProjetoGarage.store.servico.Veiculo', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_ServicoVeiculo_L',
        insert: 'S_ServicoVeiculo_E',
        update: 'S_ServicoVeiculo_E',
        destroy: 'S_ServicoVeiculo_E'
    },
    model: 'ProjetoGarage.model.servico.Veiculo'
});