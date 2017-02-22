import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import XLSX from 'npm:xlsx';
export default EmberUploader.FileField.extend({

  filesDidChange: function(files) {
    console.log(files);
    var workbook = XLSX.readFile('test.xlsx');
    const uploader = EmberUploader.Uploader.create({
      url: this.get('url')
    });

    if (!Ember.isEmpty(files)) {
      // this second argument is optional and can to be sent as extra data with the upload
      uploader.upload(files[0] /*,{ whateverObject }*/);
    }
  }
});
