import Ember from 'ember';
import pdfMake from 'ember-pdfmake';

export default Ember.Component.extend({
  /*global XLSX*/
  store: Ember.inject.service(),
  studentModel: null,
  adjudicationModel: null,
  currentStudentAdjudications: null,

  init() {
    this._super(...arguments);
    var self = this;

    this.get('store').query('student', {
      limit: 1000,
      offset: 0
    }).then(function (records) {
      self.set('studentModel', records);
    });

    this.get('store').findAll('adjudication').then(function(records){
      self.set('adjudicationModel', records);
    });

  },

  actions: {


    generatePDFs(){

      var body = [];
      var col = [];

      col.pushObject("Student Number");
      col.pushObject("Assessment Code");
      body.pushObject(col);

      col = [];

      for(let i = 0; i < this.get('studentModel').get('length'); i++){

        this.get('store').query('adjudication', { filter: { student: this.get('studentModel').objectAt(i).get('id') } });
        this.set('currentStudentAdjudications', this.get('studentModel').objectAt(i).get('adjudicationInfo'));

        for(let j = 0; j < this.get('currentStudentAdjudications').get('length'); j++){
          col = [];
          col.pushObject(this.get('studentModel').objectAt(i).get('number'));
          col.pushObject(this.get('currentStudentAdjudications').objectAt(j).get('termAVG'));
          body.pushObject(col);
        }
      }


      var pdfBody = body;


      var softwareDocDefinition = {
        info: {
          title: 'Assessment Results',
          author: 'Genesis Ideas',
          subject: 'Student Assessment',
          keywords: 'Assessment',
        },
        content: [
          {
            layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ '*', '*'],

              body: pdfBody
            }
          }
        ]
      };
      pdfMake.createPdf(softwareDocDefinition).open();
    },

    generateExcelFiles(){

      var body = [];
      var col = [];

      col.pushObject("Student Number");
      col.pushObject("Assessment Code");
      body.pushObject(col);

      col = [];

      for(let i = 0; i < this.get('studentModel').get('length'); i++){

        this.get('store').query('adjudication', { filter: { student: this.get('studentModel').objectAt(i).get('id') } });
        this.set('currentStudentAdjudications', this.get('studentModel').objectAt(i).get('adjudicationInfo'));

        for(let j = 0; j < this.get('currentStudentAdjudications').get('length'); j++){
          col = [];
          col.pushObject(this.get('studentModel').objectAt(i).get('number'));
          col.pushObject(this.get('currentStudentAdjudications').objectAt(j).get('termAVG'));
          body.pushObject(col);
        }
      }

      /* original data */
      var data = body;

      var ws_name = "SheetJS";

      /* set up workbook objects -- some of these will not be required in the future */
      var wb = {}
      wb.Sheets = {};
      wb.Props = {};
      wb.SSF = {};
      wb.SheetNames = [];

      /* create worksheet: */
      var ws = {}

      /* the range object is used to keep track of the range of the sheet */
      var range = {s: {c:0, r:0}, e: {c:0, r:0 }};

      /* Iterate through each element in the structure*/
      for(var R = 0; R != data.length; ++R) {
        if(range.e.r < R) range.e.r = R;
        for(var C = 0; C != data[R].length; ++C) {
          if(range.e.c < C) range.e.c = C;

          /* create cell object: .v is the actual data */
          var cell = { v: data[R][C] };
          if(cell.v == null) continue;

          /* create the correct cell reference */
          var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

          /* determine the cell type */
          if(typeof cell.v === 'number') cell.t = 'n';
          else if(typeof cell.v === 'boolean') cell.t = 'b';
          else cell.t = 's';

          /* add to structure */
          ws[cell_ref] = cell;
        }
      }
      ws['!ref'] = XLSX.utils.encode_range(range);

      /* add worksheet to workbook */
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;

      var wopts = { bookType:'xlsx', bookSST:false, type:'binary'};

      /* write file */
      var wbout = XLSX.write(wb, wopts);

      saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "Assessment Result.xlsx");


    },

  }

});




function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
