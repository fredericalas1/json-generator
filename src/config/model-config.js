
class ModelConfig {
    models = {
        salle: {
            name: 'salle',
            fields: ['idSalle', 'nomSalle'],
            relations: {
                examens: {
                    name: 'examen',
                    collection: true,
                    // collectionType: 'MANY_TO_MANY',
                    foreign: false,
                    deleteType: 'cascade',
                    keys: ['name'],
                    fields: ['code', 'name'],
                    resourceName: 'salle',
                    resourceIdField: 'salle_id',
                    handleStore: true,
                }
            },
            length: 10,
            fileName: '/salles.json',
            handleStore: true,
        },
        examen: {
            name: 'examen',
            fields: ['idExamen', 'nom'],
            relations: {
            },
            length: 10,
            fileName: '/examens.json',
            handleStore: false,
        },
        cours: {
            name: 'cours',
            fields: ['idCours', 'nomCours', 'description'],
            relations: {
                salle: {
                    name: 'salle',
                    collection: false,
                    foreign: true,
                    deleteType: 'cascade',
                    keys: ['nomSalle'],
                    fields: ['idSalle', 'nomSalle'],
                }
            },
            length: 10,
            fileName: '/cours.json',
            handleStore: false,
        },
        planification: {
            
        }
    }
    constructor() {
    }
}

module.exports = {
    ModelConfig,
};