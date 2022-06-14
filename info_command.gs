//teks command /start
function start(chtId, cmd) {
	var txtStart = '<b>🤖 SELAMAT DATANG DI BOT INI!</b>' + '\n' 
    + 'Silahkan klik command /help untuk bantuan.';
	sendText(chtId, txtStart);
}

//teks command /help
function help(chtId, cmd) {
	var txtHelp = '<b>ℹ️ DAFTAR COMMAND BOT</b>' + '\n' 
    + '--------------------------' + '\n' 
    + '1. /tambahformat - Untuk menambah data' + '\n' 
    + '2. /editformat - Untuk mengubah data' + '\n' 
    + '3. /hapusformat - Untuk menghapus data' + '\n' 
    + '4. /caripnt - Untuk menampilkan data PNT' + '\n' 
    + '5. /carispd - Untuk menampilkan data SPD' + '\n' 
    + '6. /cariproses - Untuk menampilkan data proses' + '\n' 
    + '7. /caridone - Untuk menampilkan data done' + '\n' 
    + '8. /cariall - Untuk menampilkan semua data' + '\n' 
    + '9. /help - Untuk bantuan';
	sendText(chtId, txtHelp);
}

//teks command tambah
function tambahFrmt(chtId, cmd) {
	var txtInfo = 'ℹ️ Gunakan format seperti ini untuk menginput data' + '\n\n' 
    + '<b>Tambah@</b>(Nomor_Data)' + '\n' 
    + '<b>KODE :</b> (PNT/SPD)' + '\n' 
    + '<b>UKURAN :</b> (Ukuran)' + '\n' 
    + '<b>TOKO :</b> (Nama_Toko)' + '\n' 
    + '<b>PIC :</b> (PIC)' + '\n' 
    + '<b>STATUS :</b> (Done/Proses)' + '\n\n' 
    + '⚠️ Pastikan tidak menginput nomor yang sama, lihat data yang sudah diinput /cariall .' + '\n' 
    + '- Copas command dibawah lalu masukan data.';
	sendText(chtId, txtInfo);
	var txtTbh = 'Tambah@' + '\n' 
    + 'KODE : ' + '\n' 
    + 'UKURAN : ' + '\n' 
    + 'TOKO : ' + '\n' 
    + 'PIC : ' + '\n' 
    + 'STATUS : ';
	sendText(chtId, txtTbh);
}

//teks command edit
function editFrmt(chtId, cmd) {
	var txtInfo = 'ℹ️ Ketik command <b>/edit@(nomor_data)</b> lalu gunakan format seperti ini untuk mengedit data' + '\n\n' 
    + '<b>Edit@</b>(Nomor_Data)' + '\n' 
    + '<b>KODE :</b> (PNT/SPD)' + '\n' 
    + '<b>UKURAN :</b> (Ukuran)' + '\n' 
    + '<b>TOKO :</b> (Nama_Toko)' + '\n' 
    + '<b>PIC :</b> (PIC)' + '\n' 
    + '<b>STATUS :</b> (Done/Proses)' + '\n\n' 
    + '- Copas command dibawah lalu masukan nomor data yang mau diedit.';
	sendText(chtId, txtInfo);
	var txtEdit = '/edit@';
	sendText(chtId, txtEdit);
}

//teks command edit
function editData(chtId, cmd) {
	var sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Sheet1');
	var txt = '';
	var item = cmd.match(/edit@(.+)/);
	var cekNo = cek(item[1]);
	if (cekNo != '') {
		var rs = bacaData();
		for (var i = 0; i < rs.length; i++) {
			if (rs[i][0] == item[1]) {
				txt = 'Edit@' + rs[i][0] + '\n' 
                + 'KODE : ' + rs[i][2] + '\n' 
                + 'UKURAN : ' + rs[i][3] + '\n' 
                + 'TOKO : ' + rs[i][4] + '\n' 
                + 'PIC : ' + rs[i][5] + '\n' 
                + 'STATUS : ' + rs[i][6];
				sendText(chtId, txt);
			}
		}
	} else {
		txt = '❌ Gagal, tidak ada data' + '\n' 
        + 'tambahkan data /tambahformat';
		sendText(chtId, txt);
	}
}

//teks command hapus
function hapusFrmt(chtId, cmd) {
	var txtInfo = 'ℹ️ Ketik command <b>/hapus@(nomor_data)</b>' + '\n\n' 
    + '- Copas command dibawah lalu masukan nomor data yang mau dihapus.';
	sendText(chtId, txtInfo);
	var txtHps = 'Hapus@';
	sendText(chtId, txtHps);
}