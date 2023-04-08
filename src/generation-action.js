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

                        if(relation.collection && relation.handleStore) {
                            const subModel = this.modelConfig.models[relation['name']]
                            // subModel.handleStore = true;
                            const subResources = this.generate(subModel, [{name: model.name, data: resource, relationConfig: relation}]);
                            resource[relationItem] = subResources
                        }
                        if(!relation.collection) {
                            // console.log('relation', relation)
                            const parentResources = this.dataService.getData(this.fileUrl + relation.fileName)
                            // console.log('parentResources', parentResources)
                            const parentResourcesLength = parentResources ? parentResources.length : 0;
                            // console.log('parentResourcesLength', parentResourcesLength)
                            if(parentResourcesLength > 0) {
                               const parentResourceIndex = this.generalService.getRandomIntBetween(0, parentResourcesLength-1)
                               const parentResource = parentResources[parentResourceIndex]
                                console.log('parentResource', parentResource)
                                resource[relation.selfJoinResourceIdField] = parentResource ? parentResource.id : null
                            }

                        }
                    }
                }
                // before push avoid duplicate
                let alreadyResource = false;
                if(model.keys) {
                    alreadyResource = resources.find(x => {
                    let exists = true;
                        console.log('model.keys', model.keys)
                        model.keys.forEach(key => {
                            if(x[key] != resource[key]) {
                                exists = false
                            }
                        })
                        return exists
                    })
                }
                console.log('alreadyResource', alreadyResource)
                if(!alreadyResource) {
                    resources.push(resource)
                }
                console.log('resource', resource)
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