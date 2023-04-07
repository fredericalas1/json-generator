class GeneralService {
    initCurrentDate() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      const date = yyyy + "-" + mm + "-" + dd;
      return date;
    }
    initCurrentDateTime() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      const hh = today.getHours();
      let time = "";
      if (hh < 10) {
        time += "0" + hh + ":";
      } else {
        time += hh + ":";
      }
      const min = today.getMinutes();
      if (min < 10) {
        time += "0" + min;
      } else {
        time += min;
      }
      const date = yyyy + "-" + mm + "-" + dd;
      // console.log('time', tim
      //  cont time = '2:00';
      return date;
    }

    getRandomString(resource = null, settings = {}) {
        // console.log('settings', settings)
        const includeResource = settings['includeResource']
        const resourceKeys = settings['resourceKeys']
        const date = new Date();
        const datestring = date.toString();
        const timestamp = Number(date);
        const resourceKey = this.getResourceKey(resource, resourceKeys)
        const resourceCode = JSON.stringify(resource);
      
        let id = resourceKey;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        id += '--' + timestamp
        if(includeResource) {
          id += '--' + resourceCode
        }
        id = id.substring(0, 250)
    
        // console.log('getBackupCode id', id)
        return id;
      }
      getResourceKey(resource, resourceKeys) {
        let keys = ''
        if (resourceKeys) {
          resourceKeys.forEach(key => {
            keys += resource[key]
          })
        }
        // console.log('keys', keys)
        return keys
      }
  }
  module.exports = {
    GeneralService,
  };
  