import * as Neutralino from '@neutralinojs/lib';

// Ganti URL ini dengan URL raw manifest update di GitHub / Server Anda
const UPDATE_MANIFEST_URL = 'https://raw.githubusercontent.com/username/printpro-pos/main/update.json';

export async function checkForUpdates(manualCheck = false) {
  try {
    const response = await fetch(UPDATE_MANIFEST_URL);
    if (!response.ok) throw new Error('Gagal memeriksa pembaruan');
    
    const updateInfo = await response.json();
    const currentVersion = window.NL_APPVERSION || '1.0.0';

    if (isNewerVersion(currentVersion, updateInfo.version)) {
      const confirm = await Neutralino.os.showMessageBox(
        'Pembaruan Tersedia',
        `Versi v${updateInfo.version} sudah tersedia.\n\nLog Perubahan:\n${updateInfo.changelog}\n\nApakah Anda ingin memperbarui sekarang?`,
        'YES_NO',
        'QUESTION'
      );

      if (confirm === 'YES') {
        await Neutralino.os.showMessageBox(
          'Mengunduh Update',
          'Proses pengunduhan sedang berlangsung. Aplikasi akan restart otomatis.',
          'OK',
          'INFO'
        );

        // Download & install resources.neu baru
        await Neutralino.updater.checkForUpdates(updateInfo.resourcesURL);
        await Neutralino.updater.install();
        await Neutralino.app.restart();
      }
    } else if (manualCheck) {
      await Neutralino.os.showMessageBox(
        'Informasi',
        `Aplikasi Anda sudah menggunakan versi terbaru (v${currentVersion}).`,
        'OK',
        'INFO'
      );
    }
  } catch (error) {
    console.error('Update Error:', error);
    if (manualCheck) {
      await Neutralino.os.showMessageBox('Error', 'Gagal terhubung ke server pembaruan.', 'OK', 'ERROR');
    }
  }
}

function isNewerVersion(current, latest) {
  const c = current.split('.').map(Number);
  const l = latest.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if (l[i] > c[i]) return true;
    if (l[i] < c[i]) return false;
  }
  return false;
}