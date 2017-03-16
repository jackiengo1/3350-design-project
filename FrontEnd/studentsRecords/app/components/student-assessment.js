import Ember from 'ember';
import pdfMake from 'ember-pdfmake';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
  },

  actions: {

    generatePDFs(){
      var docDefinition = {
        info: {
          title: 'awesome Document',
          author: 'john doe',
          subject: 'subject of document',
          keywords: 'keywords for document',
        },
        content: 'This is an sample PDF printed with pdfMake'
      };
      pdfMake.createPdf(docDefinition).open();
    },

    generateExcelFiles(){

      var data = [
        ['Title 1', 'Title 2', 'Title 3'],
        ['row1cell1', 'row1cell2', 'row1cell3'],
        ['row2cell1', 'row2cell2', 'row2cell3']
      ];


      this.get('excel').export(data, 'sheet1', 'test.xlsx');


    },

  }

});
