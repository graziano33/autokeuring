// ============================================================
// AutoKeuring Pro - Google Apps Script
// ============================================================
// INSTALLATIE:
// 1. Open je Google Sheet
// 2. Ga naar Extensies → Apps Script
// 3. Plak deze volledige code in het script-venster
// 4. Sla op (Ctrl+S)
// 5. Klik op "Implementeren" → "Nieuw implementeren"
// 6. Kies type: "Web App"
// 7. Stel in: "Uitvoeren als: Ik" en "Toegang: Iedereen"
// 8. Klik "Implementeren" en kopieer de URL
// 9. Plak die URL in de app via het ⚙️ menu
// ============================================================

const SHEET_NAME = 'Database';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    appendToSheet(data);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'online', app: 'AutoKeuring Pro' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function appendToSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // --- MAIN DATABASE SHEET ---
  let dbSheet = ss.getSheetByName(SHEET_NAME);
  if (!dbSheet) {
    dbSheet = ss.insertSheet(SHEET_NAME);
  }
  
  // Create header row if empty
  if (dbSheet.getLastRow() === 0) {
    const headers = [
      'ID', 'Timestamp', 'Rapportnummer', 'Datum inspectie', 'Tijdstip', 'Locatie',
      'Opdrachtgever', 'Verkoper', 'Verkoper type', 'Adviseur',
      'Kenteken', 'Chassisnummer', 'Merk', 'Model', 'Uitvoering', 'Segment',
      'Transmissie', 'Brandstof', 'Kleur', 'Datum productie', 'Datum eerste toelating',
      'Import', 'Kilometerstand', 'Oordeel RDW', 'APK geldig tot', 'Verkoopprijs (€)', 'Dagwaarde (€)',
      'Onderhoudsboekje', 'Onderhoud compleet', 'Aantal eigenaren', 'Laatste beurt',
      'Distributie vervangen', 'Distributie km',
      'Auto schoon', 'Staat carrosserie', 'Roest', 'Roest locatie',
      'Deukschade', 'Deuken locatie', 'Krasschade', 'Krassen locatie',
      'Portiersloten', 'Keyless', 'Deurscharnieren', 'Rubbers',
      'Gasveer achterklep', 'Antenne', 'Trekhaak', 'Wisser achter',
      'Lichtunit achter', 'Lichtunit voor', 'Gasveer motorkap', 'Wisser voor',
      'Panoramadak', 'Tankklep', 'Buitenspiegels', 'Voorruit', 'Overige ruiten',
      'Koplampen', 'Mistlampen', 'Knipperlicht', 'Achterlicht', 'Kentekenverlichting', 'Velgen',
      'Kleurnaam', 'Lak origineel', 'Overgespoten panelen', 'Kleurverschil', 'Kleurverschil locatie', 'Lak staat',
      'Staat interieur', 'Bekleding type', 'Schade bekleding', 'Bekleding locatie',
      'Vloermatten', 'Vocht', 'Vocht locatie', 'Geur', 'Gordels',
      'Lampjes contact', 'Lampjes doven', 'Lampjes blijven',
      'Airco', 'Verwarming', 'El ramen', 'Centrale vergrendeling', 'Schakelaars', 'Radio/nav',
      'OBD scan', 'Foutcodes', 'Foutcodes tekst',
      'Motortype', 'Motorruimte schoon', 'Olieniveau', 'Olie kleur',
      'Koelvloeistof', 'Koelvloeistof kleur', 'Remvloeistof',
      'Lekken', 'Lekken locatie', 'Slangen riemen', 'Accu',
      'Proefrit', 'Motor start', 'Stationair', 'Schakelen', 'Versnellingsbak',
      'Koppeling', 'Trillingen', 'Stuurgedrag', 'Remmen', 'Geluiden', 'Geluiden beschrijving',
      'Onderstel', 'Roest onderstel', 'Beschadigingen onderstel', 'Schokdempers', 'Uitlaat',
      'Reservewiel', 'Gereedschap', 'Sleutels', 'Handleidingen',
      'Kenteken deel 1', 'Kenteken deel 2', 'APK datum', 'APK status', 'VIN overeen', 'KM aannemelijk',
      'Algemeen oordeel', 'Gevonden gebreken', 'Reparatiekosten (€)', 'Aanbevolen prijs (€)', 'Advies', 'Opmerkingen',
      'Lakdikte JSON'
    ];
    dbSheet.appendRow(headers);
    dbSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffffff');
    dbSheet.setFrozenRows(1);
  }
  
  const id = 'K-' + Date.now();
  const ts = new Date();
  
  const row = [
    id, ts, data.rapportnummer, data.datum_inspectie, data.tijdstip, data.locatie,
    data.opdrachtgever, data.verkoper, data.verkoper_type, data.adviseur,
    data.kenteken, data.chassisnummer, data.merk, data.model, data.uitvoering, data.segment,
    data.transmissie, data.brandstof, data.kleur, data.datum_productie, data.datum_eerste_toelating,
    data.import, data.kilometerstand, data.oordeel_rdw, data.apk_geldig_tot, data.verkoopprijs, data.dagwaarde,
    data.onderhoud_boekje, data.onderhoud_compleet, data.aantal_eigenaren, data.laatste_beurt,
    data.distributie_vervangen, data.distributie_km,
    data.auto_schoon, data.staat_carrosserie, data.roest, data.roest_locatie,
    data.deukschade, data.deuken_locatie, data.krasschade, data.krassen_locatie,
    data.portiersloten, data.keyless, data.deurscharnieren, data.rubbers,
    data.gasveer_achterklep, data.antenne, data.trekhaak, data.wisser_achter,
    data.lichtunit_achter, data.lichtunit_voor, data.gasveer_motorkap, data.wisser_voor,
    data.panoramadak, data.tankklep, data.buitenspiegels, data.voorruit, data.overige_ruiten,
    data.koplampen, data.mistlampen, data.knipperlicht, data.achterlicht, data.kentekenverlichting, data.velgen,
    data.kleurnaam, data.lak_origineel, data.overgespoten, data.kleurverschil, data.kleurverschil_locatie, data.lak_staat,
    data.staat_interieur, data.bekleding_type, data.schade_bekleding, data.bekleding_locatie,
    data.vloermatten, data.vocht, data.vocht_locatie, data.geur, data.gordels,
    data.lampjes_contact, data.lampjes_doven, data.lampjes_blijven,
    data.airco, data.verwarming, data.el_ramen, data.centrale_vergrendeling, data.schakelaars, data.radio_nav,
    data.obd_scan, data.foutcodes, data.foutcodes_tekst,
    data.motortype, data.motorruimte_schoon, data.olieniveau, data.olie_kleur,
    data.koelvloeistof, data.koelvloeistof_kleur, data.remvloeistof,
    data.lekken, data.lekken_locatie, data.slangen_riemen, data.accu,
    data.proefrit, data.motor_start, data.stationair, data.schakelen, data.versnellingsbak,
    data.koppeling, data.trillingen, data.stuurgedrag, data.remmen, data.geluiden, data.geluiden_beschrijving,
    data.onderstel, data.roest_onderstel, data.beschadigingen_onderstel, data.schokdempers, data.uitlaat,
    data.reservewiel, data.gereedschap, data.sleutels, data.handleidingen,
    data.kenteken1, data.kenteken2, data.apk_datum, data.apk_status, data.vin_overeen, data.km_aannemelijk,
    data.algemeen_oordeel, data.gevonden_gebreken, data.reparatiekosten, data.aanbevolen_prijs, data.advies, data.opmerkingen,
    JSON.stringify(data.lakdikte || {})
  ];
  
  dbSheet.appendRow(row);
  
  // Auto-resize columns (only first time or every 10 rows)
  if (dbSheet.getLastRow() % 10 === 2) {
    dbSheet.autoResizeColumns(1, 10);
  }
  
  // --- OPTIONAL: Create per-keuring detail sheet ---
  createDetailSheet(ss, data, id, ts);
}

function createDetailSheet(ss, data, id, ts) {
  // Create a formatted report sheet for each inspection
  const sheetName = (data.kenteken || 'AUTO') + ' ' + Utilities.formatDate(ts, Session.getScriptTimeZone(), 'dd-MM-yy');
  
  // Limit sheet name length
  const safeName = sheetName.substring(0, 31);
  
  let sheet = ss.getSheetByName(safeName);
  if (!sheet) {
    sheet = ss.insertSheet(safeName);
  } else {
    sheet.clear();
  }
  
  sheet.setColumnWidth(1, 220);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 180);
  
  const addHeader = (text, color = '#1a1a2e') => {
    const row = sheet.getLastRow() + 1;
    sheet.getRange(row, 1, 1, 3).merge().setValue(text)
      .setBackground(color).setFontColor('#ffffff').setFontWeight('bold').setFontSize(11);
  };
  
  const addRow = (label, value, note = '') => {
    const row = sheet.getLastRow() + 1;
    sheet.getRange(row, 1).setValue(label).setFontColor('#555555');
    sheet.getRange(row, 2).setValue(value || '').setFontWeight('500');
    if (note) sheet.getRange(row, 3).setValue(note).setFontColor('#888888').setFontStyle('italic');
    if (row % 2 === 0) sheet.getRange(row, 1, 1, 3).setBackground('#f8f9fa');
  };
  
  const addBlank = () => sheet.appendRow(['']);
  
  // Title
  sheet.getRange(1, 1, 1, 3).merge().setValue('AUTO AANKOOPKEURING RAPPORT')
    .setBackground('#e94560').setFontColor('#ffffff').setFontSize(14).setFontWeight('bold')
    .setHorizontalAlignment('center');
  sheet.setRowHeight(1, 36);
  
  sheet.getRange(2, 1, 1, 3).merge()
    .setValue('Rapport: ' + (data.rapportnummer || id) + '  |  Adviseur: ' + (data.adviseur || ''))
    .setBackground('#2a2a4a').setFontColor('#9fa8da').setFontSize(10)
    .setHorizontalAlignment('center');
  
  addBlank();
  addHeader('VOERTUIG INFORMATIE', '#0f3460');
  addRow('Kenteken', data.kenteken);
  addRow('Merk / Model', (data.merk || '') + ' ' + (data.model || '') + ' ' + (data.uitvoering || ''));
  addRow('Brandstof / Transmissie', (data.brandstof || '') + ' / ' + (data.transmissie || ''));
  addRow('Kilometerstand', data.kilometerstand ? data.kilometerstand + ' km' : '');
  addRow('Datum productie', data.datum_productie);
  addRow('Datum inspectie', data.datum_inspectie);
  addRow('Locatie', data.locatie);
  addRow('Verkoopprijs', data.verkoopprijs ? '€ ' + data.verkoopprijs : '');
  addRow('Dagwaarde', data.dagwaarde ? '€ ' + data.dagwaarde : '');
  
  addBlank();
  addHeader('EINDOORDEEL', '#e94560');
  const oordeel = data.advies || '';
  const oordeelColor = oordeel === 'Aanraden' ? '#4caf50' : oordeel === 'Afraden' ? '#f44336' : '#ff9800';
  const row = sheet.getLastRow() + 1;
  sheet.getRange(row, 1).setValue('Advies').setFontColor('#555555');
  sheet.getRange(row, 2, 1, 2).merge().setValue(oordeel)
    .setFontWeight('bold').setFontSize(13).setFontColor(oordeelColor);
  
  addRow('Algemeen oordeel', data.algemeen_oordeel);
  addRow('Gevonden gebreken', data.gevonden_gebreken);
  addRow('Reparatiekosten', data.reparatiekosten ? '€ ' + data.reparatiekosten : '');
  addRow('Aanbevolen aankoopprijs', data.aanbevolen_prijs ? '€ ' + data.aanbevolen_prijs : '');
  addRow('Opmerkingen', data.opmerkingen);
  
  addBlank();
  addHeader('LAKDIKTE METINGEN', '#0f3460');
  const ld = data.lakdikte || {};
  Object.entries(ld).forEach(([panel, waarde]) => {
    if (waarde) {
      const status = waarde <= 130 ? 'Origineel' : waarde <= 200 ? 'Let op' : 'Gespoten';
      addRow(panel, waarde + ' μm', status);
    }
  });
  
  // Freeze first 2 rows
  sheet.setFrozenRows(2);
}
