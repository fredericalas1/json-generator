
class ModelConfig {
    models = {
        salle: {
            name: 'salle',
            fields: ['idSalle', 'nomSalle'],
            relations: {
                examens: {
                    name: 'examen',
                    collection: true,
                    collectionType: 'ONE_TO_MANY',
                    // collectionType: 'MANY_TO_MANY',
                    foreign: false,
                    deleteType: 'cascade',
                    keys: ['name'],
                    fields: ['code', 'name'],
                    resourceName: 'salle',
                    resourceIdField: 'salle_id',
                    handleStore: false,
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
                salle: {
                    name: 'salle',
                    collection: false,
                    foreign: true,
                    deleteType: 'cascade',
                    keys: ['name'],
                    fields: ['code', 'name'],
                    selfJoinResourceIdField: 'salle_id',
                    fileName: '/salles.json',
                }
            },
            length: 10,
            fileName: '/examens.json',
            handleStore: true,
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
                    selfJoinResourceIdField: 'salle_id',
                    fileName: '/salles.json',
                }
            },
            length: 10,
            fileName: '/cours.json',
            handleStore: true,
        },
        planification: {
            name: 'planification',
            fields: ['salle_id', 'cours_id'],
            keys: ['salle_id', 'cours_id'],
            relations: {
                salle: {
                    name: 'salle',
                    collection: false,
                    foreign: true,
                    deleteType: 'cascade',
                    keys: ['nomSalle'],
                    fields: ['idSalle', 'nomSalle'],
                    selfJoinResourceIdField: 'salle_id',
                    fileName: '/salles.json',
                },
                cours: {
                    name: 'cours',
                    collection: false,
                    foreign: true,
                    deleteType: 'cascade',
                    keys: ['nomSalle'],
                    fields: ['idSalle', 'nomSalle'],
                    selfJoinResourceIdField: 'cours_id',
                    fileName: '/cours.json',
                }
            },
            length: 50,
            fileName: '/planifications.json',
            handleStore: true,
        }
    }
    constructor() {
    }
}

module.exports = {
    ModelConfig,
};