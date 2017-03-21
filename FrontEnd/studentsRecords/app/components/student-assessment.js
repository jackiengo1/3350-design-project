import Ember from 'ember';
import pdfMake from 'ember-pdfmake';

export default Ember.Component.extend({
  /*global XLSX*/
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

      /* original data */
      var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar","0.3"], ["baz", null, "qux"]]
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

      saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "hello123.xlsx");


  },

}

});


function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
