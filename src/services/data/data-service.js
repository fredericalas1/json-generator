const { Hash } = require('crypto');
const fs = require('fs');

class DataService {
    errorFileUrl = './data/backup/errorLog.json';
    getData(fileUrl) {
        let file = null;
        file = fileUrl;
        let rawdata = null;
        try {
            rawdata = fs.readFileSync(file);
        } catch (error) {

        }
        let data = [];
        try {
            data = JSON.parse(rawdata);
        } catch (error) {
            console.log('error', error)
            data = [];
        }
        return data;
    }
    async setData(newData, fileUrl) {
        let file = null;
        file = fileUrl;
        try {
            fs.writeFileSync(file, JSON.stringify(newData));
        } catch (error) {
            console.log('error', error)
        }
    }

    async clearData(fileUrl) {
        let file = null;
        file = fileUrl;
        try {
            fs.writeFileSync(file, JSON.stringify({}));
        } catch (error) {
            console.log('error', error);
        }
    }
}
module.exports = {
    DataService,
};