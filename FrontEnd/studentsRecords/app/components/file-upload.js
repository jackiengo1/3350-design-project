import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  /* golbal XLSX */
  actions:{
    fileLoaded: function(file) {
      var self = this;
      var workbook = XLSX.read(file.data, {type: 'binary'});
      var sheet_name_list = workbook.SheetNames;
      if(file.name === "genders.xlsx")
      {
        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];

          for (var cellName in worksheet) {
            //all keys that do not begin with "!" correspond to cell addresses

            if (cellName[0] === '!') {
              continue;
            }
            if(worksheet[cellName].v !== "name")
            {
              var newgender = self.get('store').createRecord('gender',{
                name: worksheet[cellName].v,
              });
              newgender.save();
            }
          }

        });
      }
      else if (file.name ==="residencies.xlsx")
      {
        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];

          for (var cellName in worksheet) {
            //all keys that do not begin with "!" correspond to cell addresses

            if (cellName[0] === '!') {
              continue;
            }
            if(worksheet[cellName].v !== "name")
            {
              var newgender = self.get('store').createRecord('residency',{
                name: worksheet[cellName].v,
              });
              newgender.save();
            }
          }

        });
      }

    },
  }

});
