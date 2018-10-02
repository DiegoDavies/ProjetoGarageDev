Ext.define('ProjetoGarage.ux.DataStoreHandler', {
    singleton: true,
    requires: [
        'Ext.data.Store',
        'Ext.data.Request',
        'Ext.data.writer.Xml',
        'ProjetoGarage.ux.Data'
    ],
    mixins: {
        observable: 'Ext.util.Observable'
    },
    urls: {
        get: '/Data',
        post: '/Data',
        put: '/Data',
        del: '/Data'
    },
    constructor: function (config) {
        this.initializeEvents();

        ProjetoGarage.ux.Data.genStore = this.generate;
        ProjetoGarage.ux.Data.setUrls = this.setUrls;
    },
    initializeEvents: function (config) {
        this.mixins.observable.constructor.call(this, config);

        this.addEvents('urlschanged');
    },
    generate: function (config) {
        var me = this,
            store = Ext.create('Ext.data.Store', {
                buffered: config && config.buffered ? config.buffered : false,
                pageSize: config && config.pageSize ? config.pageSize : 50,
                database: config && config.database ? config.database : '',
                currentPage: config && config.currentPage ? config.currentPage : 1,
                remoteSort: config && Ext.isDefined(config.remoteSort) ? config.remoteSort : true,
                autoLoad: config && Ext.isDefined(config.autoLoad) ? config.autoLoad : false,
                isSortable: config && Ext.isDefined(config.isSortable) ? config.isSortable : true,
                smart: config && Ext.isDefined(config.smart) ? config.smart : false,
                login: config && Ext.isDefined(config.login) ? config.login : false,
                security: config && Ext.isDefined(config.security) ? config.security : false,
                model: config.model,
                customUrl: config && Ext.isDefined(config.customUrl) ? config.customUrl : "",
                extraArgs: config && Ext.isDefined(config.extraArgs) ? config.extraArgs : {},
                proxy: {
                    type: 'ajax',
                    url: !(config && Ext.isDefined(config.customUrl)) ? (me.urls.get + '?procedure=' + config.procedure) : config.customUrl,
                    batchActions: true,
                    reader: {
                        type: 'json',
                        root: 'result',
                        totalProperty: 'TotalLinhas',
                        successProperty: 'success',
                        readRecordsOnFailure: false
                    },
                    writer: {
                        writeRecordId: true,
                        type: 'xml',
                        nameProperty: config && Ext.isDefined(config.nameProperty) ? config.nameProperty : 'id',
                        writeAllFields: true,
                        documentRoot: "dados",
                        record: "dado"
                        ,
                        dateFormat: 'd/m/Y H:i:s'
                    },
                    api: {
                        createBKP: '/new' + (config && Ext.isDefined(config.procedureNew) ? ('?procedure=' + encodeURI(config.procedureNew) + '&operation=new') : ''),
                        updateBKP: '/update' + (config && Ext.isDefined(config.procedureUpdate) ? ('?procedure=' + encodeURI(config.procedureUpdate) + '&operation=update') : ''),
                        destroyBKP: '/destroy' + (config && Ext.isDefined(config.procedureDestroy) ? ('?procedure=' + encodeURI(config.procedureDestroy) + '&operation=destroy') : '')
                    }
                },
                listeners: {
                    beforeload: function (store, operation, eOpts) {

                        this.proxy.url = (!this.customUrl ? (me.urls.get + '?procedure=' + config.procedure) : this.customUrl) +
                            (!this.extraArgs ? '' : ('&extraArgs=' + encodeURI(JSON.stringify(this.extraArgs)))) +
                            (!this.remoteFilters ? '' : ('&remoteFilters=' + encodeURI(JSON.stringify(this.remoteFilters)))) +
                            (!this.smart ? '' : '&smart=true') +
                            (!this.database ? '' : '&database=' + this.database) +
                            (!this.security ? '' : '&Security=true');
                        if (!operation) {
                            console.log('eOpts');
                            console.log(eOpts);
                        }
                    },
                    load: function (store, records, successful, eOpts) {
                        if (store &&
    						store.proxy &&
    						store.proxy.reader &&
    						store.proxy.reader.rawData
                            ) {

                        }
                        if (!successful) {
                            console.log('eOpts');
                            console.log(eOpts);
                        }
                    },
                    beforesync: function (options, eOpts) {
                        this.proxy.api.create = this.proxy.api.createBKP + (!this.extraArgs && this.extraArgs.length > 0 ? '' : ('&extraArgs=' + encodeURI(JSON.stringify(this.extraArgs))));
                        this.proxy.api.update = this.proxy.api.updateBKP + (!this.extraArgs && this.extraArgs.length > 0 ? '' : ('&extraArgs=' + encodeURI(JSON.stringify(this.extraArgs))));
                        this.proxy.api.destroy = this.proxy.api.destroyBKP + (!this.extraArgs && this.extraArgs.length > 0 ? '' : ('&extraArgs=' + encodeURI(JSON.stringify(this.extraArgs))));
                    },
                    prefetch: function (store, records, successful, operation, eOpts) {
                        if (!successful) {
                            console.log('operation');
                            console.log(operation);
                            console.log('eOpts');
                            console.log(eOpts);
                        }
                    }
                },
                geraExtraArgs: function () {
                    if (this.extraArgs) {
                        this.extraArgs.pCOD_CONCESSIONARIA_SEL = WS.lib.SessionHandler.concessionariasSelecionadasFiltro;
                    } else {
                        this.extraArgs = {
                            pCOD_CONCESSIONARIA_SEL: WS.lib.SessionHandler.concessionariasSelecionadasFiltro
                        };
                    }

                    if (this.pCOD_MODULO > 0)
                        this.extraArgs.pCOD_MODULO = this.pCOD_MODULO;

                    if (this.pCOD_FUNCIONALIDADE > 0)
                        this.extraArgs.pCOD_FUNCIONALIDADE = this.pCOD_FUNCIONALIDADE;

                    if (this.pAcao > 0)
                        this.extraArgs.pACAO = this.pACAO;
                },
                exportaExcel: function (COD_ACAO) {
                    Ext.Ajax.request({
                        url: 'ExportaExcelFinal',
                        method: 'POST',
                        params: {
                            procedure: procedure,
                            COD_ACAO: COD_ACAO,
                            extraArgs: JSON.stringify(this.extraArgs),
                            remoteFilters: JSON.stringify(this.remoteFilters),
                            appliedFilters: JSON.stringify(this.appliedFilters),
                            security: this.security
                        },
                        success: function (response, opts) {
                            var obj = Ext.decode(response.responseText);
                            window.open('/ExportaExcel?tempFileName=' + encodeURIComponent(obj.tempFileName));
                        },
                        failure: function (response, opts) {
                            console.log('Falha ao exportar os dados!');
                        }
                    });
                }
            });
        return store;
    },
    loadMultipleStores: function (stores, callback) {
        //<debug>
        if (!stores) {
            Ext.Error.raise({
                msg: 'A stores é nula ou inválida',
                option: null
            });
            return;
        }
        if (!stores.length) {
            Ext.Error.raise({
                msg: 'A stores não possui items a serem validados',
                option: null
            });
            return;
        }
        if (!callback) {
            Ext.Error.raise({
                msg: 'Não há callback válido para essa operação',
                option: null
            });
            return;
        }
        if (typeof callback !== 'function') {
            Ext.Error.raise({
                msg: 'O callback passado não é uma função',
                option: null
            });
            return;
        }
        for (var i = 0; i < stores.length; i++) {
            if (!(stores[i] instanceof Ext.data.Store)) {
                Ext.Error.raise({
                    msg: 'Um objeto do array de stores não é uma store!',
                    option: null
                });
                return;
            };
        };
        //</debug>
        var storeIndex = 0
		   , storeResponse = []
		   , storeCallBack = function (records, operation, success) {

		       storeResponse.push({
		           records: records,
		           operation: operation,
		           success: success
		       });

		       storeIndex++;

		       if (storeIndex < stores.length)
		           stores[storeIndex].load(storeCallBack);
		       else
		           callback(storeResponse);
		   };

        stores[storeIndex].load(storeCallBack);
    },
    setUrls: function (urls) {
        if (Ext.getClassName(this) === Ext.getClassName(Data)) {
            ProjetoGarage.ux.DataStoreHandler.setUrls(urls);
            return;
        }
        this.urls = urls

        this.fireUrlsChanged(urls);
    },
    fireUrlsChanged: function (urls) {
        this.fireEvent('urlschanged', this, urls);
    }
});