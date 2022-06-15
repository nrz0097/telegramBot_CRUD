//fungsi tambah data
function tambah(chtId, cmd) {
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Sheet1');
    var txt = '';
    var waktu = new Date();
    var tgl = Utilities.formatDate(waktu, "Asia/Singapore", "dd/MM/yyyy");
    var item = cmd.match(/tambah@(.+)\nKODE : (.+)\nUKURAN : (.+)\nTOKO : (.+)\nPIC : (.+)\nSTATUS : (.+)/mi);
    var sort = false;
    if (item[1] != '' && item[2] != '' && item[3] != '' && item[4] != '' && item[5] != '' && item[6] != '') {
        var cekNo = cek(item[1]);
        if (cekNo == '') {
            sort = true;
            item = item.map(function(x) {
                return x.toUpperCase();
            })
            sheet.appendRow([item[1], tgl, item[2], item[3], item[4], item[5], item[6]]);
            txt = '☑️ Data dengan nomor : ' + item[1] + '\nberhasil ditambahkan.';
            sendText(chtId, txt);
        } else {
            txt = '❌ Gagal! Data dengan nomor : ' + item[1] + '\nsudah ada.';
            sendText(chtId, txt);
        }
    }
    //fungsi sorting data
    if (sort == true) {
        var range = sheet.getRange('A2:G');
        range.sort(1);
    }
}

//fungsi edit data
function edit(chtId, cmd) {
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Sheet1');
    var txt = '';
    var waktu = new Date();
    var tgl = Utilities.formatDate(waktu, "Asia/Singapore", "dd/MM/yyyy");
    var item = cmd.match(/edit@(.+)\nKODE : (.+)\nUKURAN : (.+)\nTOKO : (.+)\nPIC : (.+)\nSTATUS : (.+)/mi);
    var sort = false;
    if (item[1] != '' && item[2] != '' && item[3] != '' && item[4] != '' && item[5] != '' && item[6] != '') {
        var cekNo = cek(item[1]);
        if (cekNo != '') {
            sort = true;
            var rs = bacaData();
            for (var i = 0; i < rs.length; i++) {
                if (rs[i][0] == item[1]) {
                    var j = i + 2;
                    sheet.deleteRow(j);
                }
            }
            item = item.map(function(x) {
                return x.toUpperCase();
            })
            sheet.appendRow([item[1], tgl, item[2], item[3], item[4], item[5], item[6]]);
            txt = '☑️ Data dengan nomor : ' + item[1] + '\nberhasil diubah.';
            sendText(chtId, txt);
        } else {
            txt = '❌ Gagal! Data dengan nomor : ' + item[1] + '\ngagal diubah.';
            sendText(chtId, txt);
        }
    }
    //fungsi sorting data
    if (sort == true) {
        var ss = SpreadsheetApp.openById(sheetId).getSheetByName('Sheet1');
        var range = ss.getRange('A2:G');
        range.sort(1);
    }
}

//fungsi hapus data
function hapus(chtId, cmd) {
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Sheet1');
    var txt = '';
    var item = cmd.match(/hapus@(.+)/);
    var cekNo = cek(item[1]);
    if (cekNo != '') {
        var rs = bacaData();
        for (var i = 0; i < rs.length; i++) {
            if (rs[i][0] == item[1]) {
                var j = i + 2;
                sheet.deleteRow(j);
                txt = '☑️ Data nomor : ' + item[1] + '\nberhasil dihapus.';
                sendText(chtId, txt);
            }
        }
    } else {
        txt = '❌ Gagal, tidak ada data';
        sendText(chtId, txt);
    }
}

//fungsi cari data pnt
function caripnt(chtId, cmd) {
    var txt = '';
    var cekData = false;
    var rs = bacaData();
    for (var i = 0; i < rs.length; i++) {
        if (rs[i][2] == 'PNT') {
            cekData = true;
        }
    }
    if (cekData == true) {
        for (var x = 0; x < rs.length; x++) {
            if (rs[x][2] == 'PNT') {
                var emoji = '';
                if (rs[x][6] == 'PROSES') {
                    emoji = ' 🔄';
                } else if (rs[x][6] == 'DONE') {
                    emoji = ' ✅';
                } else if (rs[x][6] == 'DONE') {
                    emoji = ' 🖨️';
                }
                txt = '📝 <b>Menampilkan Data Papan Nama Toko No.' + rs[x][0] + '</b>\n' +
                    '__________________________________________' + '\n\n' +
                    '• <b>TANGGAL :</b> ' + rs[x][1] + '\n' +
                    '• <b>KODE :</b> ' + rs[x][2] + '\n' +
                    '• <b>UKURAN :</b> ' + rs[x][3] + '\n' +
                    '• <b>TOKO :</b> ' + rs[x][4] + '\n' +
                    '• <b>PIC :</b> ' + rs[x][5] + '\n' +
                    '• <b>STATUS :</b> ' + rs[x][6] + emoji;
                sendText(chtId, txt);
            }
        }
    } else {
        txt = 'Tidak ada data Papan Nama Toko!';
        sendText(chtId, txt);
    }
}

//fungsi cari data spd
function carispd(chtId, cmd) {
    var txt = '';
    var cekData = false;
    var rs = bacaData();
    for (var i = 0; i < rs.length; i++) {
        if (rs[i][2] == 'SPD') {
            cekData = true;
        }
    }
    if (cekData == true) {
        for (var x = 0; x < rs.length; x++) {
            if (rs[x][2] == 'SPD') {
                var emoji = '';
                if (rs[x][6] == 'PROSES') {
                    emoji = ' 🔄';
                } else if (rs[x][6] == 'DONE') {
                    emoji = ' ✅';
                } else if (rs[x][6] == 'DONE') {
                    emoji = ' 🖨️';
                }
                txt = '📝 <b>Menampilkan Data Spanduk No.' + rs[x][0] + '</b>\n' +
                    '__________________________________________' + '\n\n' +
                    '• <b>TANGGAL :</b> ' + rs[x][1] + '\n' +
                    '• <b>KODE :</b> ' + rs[x][2] + '\n' +
                    '• <b>UKURAN :</b> ' + rs[x][3] + '\n' +
                    '• <b>TOKO :</b> ' + rs[x][4] + '\n' +
                    '• <b>PIC :</b> ' + rs[x][5] + '\n' +
                    '• <b>STATUS :</b> ' + rs[x][6] + emoji;
                sendText(chtId, txt);
            }
        }
    } else {
        txt = 'Tidak ada data Spanduk!';
        sendText(chtId, txt);
    }
}

//fungsi cari data proses
function cariproses(chtId, cmd) {
    var txt = '';
    var cekData = false;
    var rs = bacaData();
    for (var i = 0; i < rs.length; i++) {
        if (rs[i][6] == 'PROSES') {
            cekData = true;
        }
    }
    if (cekData == true) {
        for (var x = 0; x < rs.length; x++) {
            if (rs[x][6] == 'PROSES') {
                txt = '📝 <b>Menampilkan Data Yang Belum Selesai' + '</b>\n' +
                    '__________________________________________' + '\n\n' +
                    '• <b>TANGGAL :</b> ' + rs[x][1] + '\n' +
                    '• <b>KODE :</b> ' + rs[x][2] + '\n' +
                    '• <b>UKURAN :</b> ' + rs[x][3] + '\n' +
                    '• <b>TOKO :</b> ' + rs[x][4] + '\n' +
                    '• <b>PIC :</b> ' + rs[x][5] + '\n' +
                    '• <b>STATUS :</b> ' + rs[x][6] + ' 🔄';
                sendText(chtId, txt);
            }
        }
    } else {
        txt = 'Tidak ada data!';
        sendText(chtId, txt);
    }
}

//fungsi cari data done
function caridone(chtId, cmd) {
    var txt = '';
    var cekData = false;
    var rs = bacaData();
    for (var i = 0; i < rs.length; i++) {
        if (rs[i][6] == 'DONE') {
            cekData = true;
        }
    }
    if (cekData == true) {
        for (var x = 0; x < rs.length; x++) {
            if (rs[x][6] == 'DONE') {
                txt = '📝 <b>Menampilkan Data Yang Sudah Selesai' + '</b>\n' +
                    '__________________________________________' + '\n\n' +
                    '• <b>TANGGAL :</b> ' + rs[x][1] + '\n' +
                    '• <b>KODE :</b> ' + rs[x][2] + '\n' +
                    '• <b>UKURAN :</b> ' + rs[x][3] + '\n' +
                    '• <b>TOKO :</b> ' + rs[x][4] + '\n' +
                    '• <b>PIC :</b> ' + rs[x][5] + '\n' +
                    '• <b>STATUS :</b> ' + rs[x][6] + ' ✅';
                sendText(chtId, txt);
            }
        }
    } else {
        txt = 'Tidak ada data!';
        sendText(chtId, txt);
    }
}

//fungsi cari data cetak
function caricetak(chtId, cmd) {
    var txt = '';
    var cekData = false;
    var rs = bacaData();
    for (var i = 0; i < rs.length; i++) {
        if (rs[i][6] == 'CETAK') {
            cekData = true;
        }
    }
    if (cekData == true) {
        for (var x = 0; x < rs.length; x++) {
            if (rs[x][6] == 'CETAK') {
                var emoji = '';
                if (rs[x][6] == 'PROSES') {
                    emoji = ' 🔄';
                } else if (rs[x][6] == 'DONE') {
                    emoji = ' ✅';
                } else if (rs[x][6] == 'DONE') {
                    emoji = ' 🖨️';
                }
                txt = '📝 <b>Menampilkan Data Yang Sudah Cetak' + '</b>\n' +
                    '__________________________________________' + '\n\n' +
                    '• <b>TANGGAL :</b> ' + rs[x][1] + '\n' +
                    '• <b>KODE :</b> ' + rs[x][2] + '\n' +
                    '• <b>UKURAN :</b> ' + rs[x][3] + '\n' +
                    '• <b>TOKO :</b> ' + rs[x][4] + '\n' +
                    '• <b>PIC :</b> ' + rs[x][5] + '\n' +
                    '• <b>STATUS :</b> ' + rs[x][6] + ' 🖨️';
                sendText(chtId, txt);
            }
        }
    } else {
        txt = 'Tidak ada data!';
        sendText(chtId, txt);
    }
}

//fungsi cari semua data
function cariall(chtId, cmd) {
    var txt = '';
    var rs = bacaData();
    for (var x = 0; x < rs.length; x++) {
        var emoji = '';
        if (rs[x][6] == 'PROSES') {
            emoji = ' 🔄';
        } else if (rs[x][6] == 'DONE') {
            emoji = ' ✅';
        } else if (rs[x][6] == 'DONE') {
            emoji = ' 🖨️';
        }
        txt = '📝 <b>Menampilkan Data No.' + rs[x][0] + '</b>\n' +
            '__________________________________________' + '\n\n' +
            '• <b>TANGGAL :</b> ' + rs[x][1] + '\n' +
            '• <b>KODE :</b> ' + rs[x][2] + '\n' +
            '• <b>UKURAN :</b> ' + rs[x][3] + '\n' +
            '• <b>TOKO :</b> ' + rs[x][4] + '\n' +
            '• <b>PIC :</b> ' + rs[x][5] + '\n' +
            '• <b>STATUS :</b> ' + rs[x][6] + emoji;
        sendText(chtId, txt);
    }
}

//fungsi cek nomor 
function cek(kunci) {
    var txt = '';
    if (kunci != '') {
        var rs = bacaData();
        for (var i = 0; i < rs.length; i++) {
            if (rs[i][0] == kunci) {
                txt = rs[i][0];
            }
        }
    }
    return txt;
}

//fungsi ambil data sheet
function bacaData() {
    var ws = SpreadsheetApp.openById(sheetId);
    var ss = ws.getSheetByName('Sheet1');
    var lr = ws.getActiveSheet().getLastRow();
    var lc = ws.getActiveSheet().getLastColumn();
    var rg = 'Sheet1!A2:G' + lr;
    var rs = ws.getActiveSheet().getRange(rg).getValues();
    return rs;
}
