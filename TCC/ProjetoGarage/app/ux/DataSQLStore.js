Ext.define('ProjetoGarage.ux.DataSQLStore', {
    extend: 'Ext.data.Store',
    alias: 'store.data-sqlstore',
    requires: [
        'ProjetoGarage.ux.DataStoreHandler',
        'Ext.data.Request',
        'Ext.data.writer.Xml'
    ],
    statics: {
        fabricate: function (options) {
            options = Ext.apply({}, options);
            if (!Ext.isDefined(options.procedures)) {
                Ext.Error.raise(ProjetoGarage.ux.DataSQLStore.messages.error.STORE_WITHOUT_PROCEDURES);
                return;
            }
            if (!Ext.isDefined(options.procedures.select) &&
                !Ext.isDefined(options.procedures.insert) &&
                !Ext.isDefined(options.procedures.update) &&
                !Ext.isDefined(options.procedures.destroy)) {
                Ext.Error.raise(ProjetoGarage.ux.DataSQLStore.messages.error.STORE_PROCEDURES_WITHOUT_COMMANDS);
                return;
            }
            if (!Ext.isDefined(options.database)) {
                Ext.Error.raise(ProjetoGarage.ux.DataSQLStore.messages.error.STORE_WITHOUT_DATABASE);
                return;
            }
            var store = Ext.create('Data.SQLStore', options);
            return store;
        },
        urlchanged: function (storeHandler, urls, eOpts) {
            if (Ext.getClassName(this) === 'Data.SQLStore') {
                this.urls = urls;
            }
        },
        messages: {
            //<debug> 
            error: {
                STORE_WITHOUT_URL: 'A store não possui url configurada.',
                STORE_URL_WITHOUT_GET: 'A store não possui a configuração get para a configuração url.',
                STORE_URL_WITHOUT_POST: 'A store não possui a configuração post para a configuração url.',
                STORE_WITHOUT_PROCEDURES: 'A store não possui procedures configurada.',
                STORE_PROCEDURES_WITHOUT_COMMANDS: 'A store não possui a configuração select,insert,update ou destroy para a configuração procedures.',
                STORE_WITHOUT_DATABASE: 'A store não possui database configurada.'
            }
            //</debug>
        }
    },
    config: {
        urls: {
            get: '/data/get',
            post: '/data/post'
        },
        procedures: {
            select: '',
            insert: '',
            update: '',
            destroy: ''
        },
        buffered: false,
        database: '',
        currentPage: 1,
        pageSize: 1,
        remoteSort: true,
        autoLoad: false,
        isSortable: true,
        smart: false,
        login: false,
        security: false,
        nameProperty: 'id',
        dateFormat: 'd/m/Y H:i:s',
        searchText: '',
        params: {}
    },
    constructor: function (config) {
        var me = this;
        config = Ext.apply({}, config);
        me.handlerUrlConfig(config);
        config.procedures = config.procedures || me.procedures;
        config.database = config.database || me.database;
        config.buffered = Ext.isDefined(config.buffered) ? config.buffered : me.buffered;
        config.pageSize = Ext.isDefined(config.pageSize) ? config.pageSize : me.pageSize;
        config.currentPage = Ext.isDefined(config.currentPage) ? config.currentPage : me.currentPage;
        config.remoteSort = Ext.isDefined(config.remoteSort) ? config.remoteSort : me.remoteSort;
        config.autoLoad = Ext.isDefined(config.autoLoad) ? config.autoLoad : me.autoLoad;
        config.isSortable = Ext.isDefined(config.isSortable) ? config.isSortable : me.isSortable;
        config.smart = Ext.isDefined(config.smart) ? config.smart : me.smart;
        config.login = Ext.isDefined(config.login) ? config.login : me.login;
        config.security = Ext.isDefined(config.security) ? config.security : me.security;
        config.model = Ext.isDefined(config.model) ? config.model : me.model;
        config.params = Ext.isDefined(config.params) ? config.params : me.params;
        config.nameProperty = Ext.isDefined(config.nameProperty) ? config.nameProperty : me.nameProperty;
        config.dateFormat = Ext.isDefined(config.dateFormat) ? config.dateFormat : me.dateFormat;

        //<debug>
        if (!Ext.isDefined(config.urls)) {
            Ext.Error.raise(ProjetoGarage.ux.DataSQLStore.messages.error.STORE_WITHOUT_URL);
            return;
        }
        if (!Ext.isDefined(config.urls.get)) {
            Ext.Error.raise(ProjetoGarage.ux.DataSQLStore.messages.error.STORE_URL_WITHOUT_GET);
            return;
        }
        if (!Ext.isDefined(config.urls.post)) {
            Ext.Error.raise(ProjetoGarage.ux.DataSQLStore.messages.error.STORE_URL_WITHOUT_POST);
            return;
        }
        if (!Ext.isDefined(config.procedures)) {
            Ext.Error.raise(ProjetoGarage.ux.DataSQLStore.messages.error.STORE_WITHOUT_PROCEDURES);
            return;
        }
        if (!Ext.isDefined(config.procedures.select) &&
            !Ext.isDefined(config.procedures.insert) &&
            !Ext.isDefined(config.procedures.update) &&
            !Ext.isDefined(config.procedures.destroy)) {
            Ext.Error.raise(ProjetoGarage.ux.DataSQLStore.messages.error.STORE_PROCEDURES_WITHOUT_COMMANDS);
            return;
        }
        if (!Ext.isDefined(config.database)) {
            Ext.Error.raise(ProjetoGarage.ux.DataSQLStore.messages.error.STORE_WITHOUT_DATABASE);
            return;
        }
        //</debug>
        me.urls = config.urls ? config.urls : ProjetoGarage.ux.DataStoreHandler.urls;
        Ext.applyIf(me, {
            buffered: config.buffered ? config.buffered : false,
            pageSize: config.pageSize ? config.pageSize : 50,
            database: config.database ? config.database : '',
            currentPage: config.currentPage ? config.currentPage : 1,
            remoteSort: Ext.isDefined(config.remoteSort) ? config.remoteSort : true,
            autoLoad: Ext.isDefined(config.autoLoad) ? config.autoLoad : false,
            isSortable: Ext.isDefined(config.isSortable) ? config.isSortable : true,
            smart: Ext.isDefined(config.smart) ? config.smart : false,
            login: Ext.isDefined(config.login) ? config.login : false,
            security: Ext.isDefined(config.security) ? config.security : false,
            model: config.model,
            params: Ext.isDefined(config.params) ? config.params : {},

            proxy: {
                type: 'ajax',
                url: config.procedures.select ? (config.urls.get + '?procedure=' + config.procedures.select) : config.urls.get,
                batchActions: true,
                actionMethods: {
                    create: 'POST',
                    read: 'GET',
                    update: 'POST',
                    destroy: 'POST'
                },
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
                    nameProperty: Ext.isDefined(config.nameProperty) ? config.nameProperty : 'name',
                    writeAllFields: true,
                    documentRoot: 'rows',
                    record: 'row',
                    dateFormat: Ext.isDefined(config.dateFormat) ? config.dateFormat : 'd/m/Y H:i:s'
                },
                api: {
                    createBKP: config.urls.post + (config && Ext.isDefined(config.procedures.insert) ? ('?procedure=' + encodeURI(config.procedures.insert) + '&operation=new') : ''),
                    updateBKP: config.urls.put + (config && Ext.isDefined(config.procedures.update) ? ('?procedure=' + encodeURI(config.procedures.update) + '&operation=update') : ''),
                    destroyBKP: config.urls.del + (config && Ext.isDefined(config.procedures.destroy) ? ('?procedure=' + encodeURI(config.procedures.destroy) + '&operation=destroy') : '')
                }
            }
        });

        me.callParent(arguments);
        me.on('beforeload', function (store, operation, eOpts) {
            this.proxy.url = (!this.customUrl ? (this.urls.get + '?procedure=' + me.procedures.select) : this.customUrl) +
                (!this.params ? '' : ('&params=' + encodeURI(JSON.stringify(this.params)))) +
                (!this.remoteFilters ? '' : ('&remoteFilters=' + encodeURI(JSON.stringify(this.remoteFilters)))) +
                (!this.smart ? '' : '&smart=true') +
                (!this.bsSearchText ? '' : '&query=' + encodeURI(this.bsSearchText)) +
                (!this.database ? '' : '&database=' + this.database) +
                (!this.security ? '' : '&Security=true');
            if (!operation) {
                console.log('eOpts');
                console.log(eOpts);
            }
        });

        me.on('load', function (store, records, successful, eOpts) {

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
        });
        me.on('beforesync', function (options, eOpts) {
            this.params.HttpMethod = "POST";
            this.params.HttpMethod = options.destroy ? "DELETE" : this.params.HttpMethod;
            this.params.HttpMethod = options.update ? "PUT" : this.params.HttpMethod;
            var urlSuffix = (!this.params ? '' : ('&params=' + encodeURI(JSON.stringify(this.params)))) +
                            (!this.remoteFilters ? '' : ('&remoteFilters=' + encodeURI(JSON.stringify(this.remoteFilters)))) +
                            (!this.smart ? '' : '&smart=true') +
                            (!this.database ? '' : '&database=' + this.database) +
                            (!this.security ? '' : '&Security=true');

            this.proxy.api.create = this.proxy.api.createBKP + ('?procedure=' + config.procedures.insert) + urlSuffix;
            this.proxy.api.update = this.proxy.api.updateBKP + ('?procedure=' + config.procedures.update) + urlSuffix;
            this.proxy.api.destroy = this.proxy.api.destroyBKP + ('?procedure=' + config.procedures.destroy) + urlSuffix;
        });

        me.on('prefetch', function (store, records, successful, operation, eOpts) {

        });
    },
    geraparams: function () {
        if (this.params) {
            this.params.pCOD_CONCESSIONARIA_SEL = WS.lib.SessionHandler.concessionariasSelecionadasFiltro;
        } else {
            this.params = {
                pCOD_CONCESSIONARIA_SEL: WS.lib.SessionHandler.concessionariasSelecionadasFiltro
            };
        }

        if (this.pCOD_MODULO > 0) {
            this.params.pCOD_MODULO = this.pCOD_MODULO;
        }

        if (this.pCOD_FUNCIONALIDADE > 0) {
            this.params.pCOD_FUNCIONALIDADE = this.pCOD_FUNCIONALIDADE;
        }

        if (this.pAcao > 0) {
            this.params.pACAO = this.pACAO;
        }

    },
    exportaExcel: function () {
        Ext.Ajax.request({
            url: 'ExportaExcelFinal',
            method: 'POST',
            params: {
                procedure: procedure,
                params: JSON.stringify(this.params),
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
    },
    handlerUrlConfig: function (config) {
        if (!config.urls) {
            config.urls = ProjetoGarage.ux.DataStoreHandler.urls;
            ProjetoGarage.ux.DataStoreHandler.on({
                scope: this,
                urlschanged: ProjetoGarage.ux.DataSQLStore.urlchanged
            });
        }
    }
});