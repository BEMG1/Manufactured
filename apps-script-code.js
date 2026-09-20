function doGet(e) {
  // 1. Reemplaza esto con el ID real de tu Google Sheet
  // El ID es la cadena larga en la URL: docs.google.com/spreadsheets/d/AQUI_ESTA_EL_ID/edit
  var sheetId = 'PON_TU_ID_DE_GOOGLE_SHEET_AQUI'; 
  
  var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // 2. Asumimos que la primera fila tiene los encabezados: ID, Nombre, Descripción, Precio, URL_Imagen, Categoría
  var headers = data[0];
  var results = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      // Normalizamos el encabezado para que sea más fácil de usar en el Frontend
      var headerName = String(headers[j]).trim();
      obj[headerName] = row[j];
    }
    results.push(obj);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(results))
    .setMimeType(ContentService.MimeType.JSON);
}
