/* ================= AMBIL ELEMEN FORM ================= */

const form = document.getElementById("formPendaftaran");

const nama = document.getElementById("nama");

const kelas = document.getElementById("kelas");

const ekskul = document.getElementById("ekskul");

const email = document.getElementById("email");

const password = document.getElementById("password");

const konfirmasi = document.getElementById("konfirmasi");

const pesanSukses = document.getElementById("pesanSukses");



/* ================= FUNGSI ERROR ================= */

function tampilkanError(input, pesan) {

    // Border merah
    input.classList.add("is-invalid");

    input.classList.remove("is-valid");


    // Cari pesan error
    let error = input.parentElement.querySelector(
        ".error-message"
    );


    // Jika belum ada, buat pesan baru
    if (!error) {

        error = document.createElement("small");

        error.className = "error-message";

        input.parentElement.appendChild(error);

    }


    // Isi pesan error
    error.textContent = pesan;

}



/* ================= FUNGSI BERHASIL ================= */

function tampilkanBerhasil(input) {

    // Border hijau
    input.classList.remove("is-invalid");

    input.classList.add("is-valid");


    // Hapus pesan error
    let error = input.parentElement.querySelector(
        ".error-message"
    );

    if (error) {

        error.remove();

    }

}



/* ================= VALIDASI NAMA ================= */

function validasiNama() {

    const nilaiNama = nama.value.trim();


    if (nilaiNama === "") {

        tampilkanError(
            nama,
            "Nama lengkap wajib diisi."
        );

        return false;

    }


    if (nilaiNama.length < 3) {

        tampilkanError(
            nama,
            "Nama minimal 3 karakter."
        );

        return false;

    }


    tampilkanBerhasil(nama);

    return true;

}



/* ================= VALIDASI KELAS ================= */

function validasiKelas() {

    if (kelas.value === "") {

        tampilkanError(
            kelas,
            "Silakan pilih kelas."
        );

        return false;

    }


    tampilkanBerhasil(kelas);

    return true;

}



/* ================= VALIDASI EKSKUL ================= */

function validasiEkskul() {

    if (ekskul.value === "") {

        tampilkanError(
            ekskul,
            "Silakan pilih ekstrakurikuler."
        );

        return false;

    }


    tampilkanBerhasil(ekskul);

    return true;

}



/* ================= VALIDASI EMAIL ================= */

function validasiEmail() {

    const polaEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const nilaiEmail = email.value.trim();


    if (nilaiEmail === "") {

        tampilkanError(
            email,
            "Email wajib diisi."
        );

        return false;

    }


    if (!polaEmail.test(nilaiEmail)) {

        tampilkanError(
            email,
            "Format email tidak valid."
        );

        return false;

    }


    tampilkanBerhasil(email);

    return true;

}



/* ================= VALIDASI PASSWORD ================= */

function validasiPassword() {

    if (password.value === "") {

        tampilkanError(
            password,
            "Password wajib diisi."
        );

        return false;

    }


    if (password.value.length < 8) {

        tampilkanError(
            password,
            "Password minimal 8 karakter."
        );

        return false;

    }


    tampilkanBerhasil(password);

    return true;

}



/* ================= VALIDASI KONFIRMASI ================= */

function validasiKonfirmasi() {

    if (konfirmasi.value === "") {

        tampilkanError(
            konfirmasi,
            "Konfirmasi password wajib diisi."
        );

        return false;

    }


    if (konfirmasi.value !== password.value) {

        tampilkanError(
            konfirmasi,
            "Password tidak sama."
        );

        return false;

    }


    tampilkanBerhasil(konfirmasi);

    return true;

}



/* ================= VALIDASI REAL-TIME ================= */

// Nama
nama.addEventListener("input", validasiNama);


// Email
email.addEventListener("input", validasiEmail);


// Password
password.addEventListener("input", function() {

    validasiPassword();

    // Jika konfirmasi sudah diisi,
    // cek kembali kecocokan password
    if (konfirmasi.value !== "") {

        validasiKonfirmasi();

    }

});


// Konfirmasi password
konfirmasi.addEventListener(
    "input",
    validasiKonfirmasi
);


// Kelas
kelas.addEventListener(
    "change",
    validasiKelas
);


// Ekstrakurikuler
ekskul.addEventListener(
    "change",
    validasiEkskul
);



/* ================= VALIDASI SUBMIT ================= */

form.addEventListener("submit", function(event) {

    // Mencegah halaman reload
    event.preventDefault();


    // Sembunyikan pesan sukses lama
    pesanSukses.classList.add("d-none");


    // Jalankan semua validasi
    const namaValid = validasiNama();

    const kelasValid = validasiKelas();

    const ekskulValid = validasiEkskul();

    const emailValid = validasiEmail();

    const passwordValid = validasiPassword();

    const konfirmasiValid = validasiKonfirmasi();



    // Jika semua input benar
    if (

        namaValid &&
        kelasValid &&
        ekskulValid &&
        emailValid &&
        passwordValid &&
        konfirmasiValid

    ) {

        // Tampilkan pesan sukses
        pesanSukses.classList.remove("d-none");

        pesanSukses.textContent =
            "Pendaftaran Berhasil!";


        // Scroll ke pesan sukses
        pesanSukses.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        // Catatan:
        // Data belum disimpan ke database.
        // Ini masih validasi frontend.

    }

});