﻿Ext.define('ProjetoGarage.store.fornecedor.Historico', {
    extend: 'ProjetoGarage.ux.DataSQLStore',
    autoLoad: false,
    pageSize: 999999,
    database: 'ProjetoGarage',
    procedures: {
        select: 'S_FornecedorHistorico_L'
    },
    model: 'ProjetoGarage.model.fornecedor.Historico'
})