const fs = require('fs');
const { DataService } = require("./services/data/data-service");
const { GeneralService } = require("./services/general-service");
const { ModelConfig } = require("./config/model-config");



class GenerationAction {
    fileUrl = './data/json';
    dataService;
    generalService;
    modelConfig;
    constructor() {
        this.generalService = new GeneralService();
        this.dataService = new DataService();
        this.modelConfig = new ModelConfig();
    }

    launch() {
        const models = this.modelConfig.models
        // console.log('models', models)
        for (var item in models) {
            if (models.hasOwnProperty(item)) {
                const model = models[item];
                this.generate(model);
            }
        }
        
    }
    generate(model, parentData = []) {
        // console.log('model', model)
        if(model.fields) {
            const length = model.length
            const resources = [];
            for(let x = 1; x <= length; x++) {
                const resource = {};
                resource['id'] = x + '-' + this.generalService.getRandomString();
                model.fields.forEach(field => {
                    resource[field] = this.generalService.getRandomString();
                })
                parentData.forEach(parentResourceData => {
                    // console.log('parentResourceData', parentResourceData)
                    const parentModel = this.modelConfig.models[parentResourceData.name]
                    console.log('parentModel', parentModel)
                    resource[parentResourceData.relationConfig.resourceIdField] = parentResourceData.data.id
                })
                const relations = model.relations
                for (var relationItem in relations) {
                    if (relations.hasOwnProperty(relationItem)) {
                        const relation = relations[relationItem];
                        // console.log('relation', relation)

                        if(relation.handleStore) {
                            const subModel = this.modelConfig.models[relation['name']]
                            // subModel.handleStore = true;
                            const subResources = this.generate(subModel, [{name: model.name, data: resource, relationConfig: relation}]);
                            resource[relationItem] = subResources
                        }
                    }
                }
                resources.push(resource)
                // console.log('resource', resource)
            }
            // console.log('resources', resources)
            if(model.handleStore) {
                this.dataService.setData(resources, this.fileUrl + model.fileName)
            }
            return resources;
        }
    }
}

module.exports = {
    GenerationAction,
};