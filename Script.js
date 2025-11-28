// ===================================================
// JAVASCRIPT UTAMA – Brew & Co Café Website
// ===================================================

/**
 * Event listener ini memastikan semua kode JavaScript baru berjalan
 * SETELAH seluruh halaman HTML selesai dimuat.
 * Ini adalah praktik terbaik untuk menghindari error.
 */
document.addEventListener('DOMContentLoaded', function () {

    // ============================
    // A. KUMPULAN DATA & STATE
    // (Bagian ini berfungsi sebagai 'database' mini untuk konten website)
    // ============================

    const menuDetails = {
        espresso: { title: "Espresso", image: "image/espresso.jpg", info: ["Kopi murni dengan cita rasa kuat dan pekat.", "Diseduh menggunakan tekanan tinggi tanpa campuran.", "Cocok untuk penikmat kopi sejati yang menyukai rasa bold."] },
        latte: { title: "Latte", image: "image/latte.jpg", info: ["Campuran espresso dan susu steamed yang creamy.", "Memiliki lapisan foam tipis di bagian atas.", "Favorit bagi pecinta rasa lembut dan seimbang."] },
        cappuccino: { title: "Cappuccino", image: "image/capucino.jpg", info: ["Perpaduan espresso, susu steamed, dan busa foam tebal.", "Rasa seimbang antara pahit dan lembut.", "Cocok diminum pagi hari untuk energi ekstra."] },
        mocha: { title: "Mocha", image: "image/mocha.jpg", info: ["Kombinasi espresso, susu, dan cokelat murni.", "Rasa manis berpadu dengan aroma kopi pekat.", "Pilihan ideal untuk kamu yang suka kopi dengan sentuhan coklat."] },
        americano: { title: "Americano", image: "image/americano.jpg", info: ["Espresso yang dicampur air panas.", "Rasa ringan dengan aroma kopi yang kuat.", "Sering dinikmati tanpa tambahan gula atau susu."] },
        matcha: { title: "Matcha Latte", image: "image/matcha.jpg", info: ["Perpaduan bubuk matcha Jepang dan susu steamed.", "Rasa earthy yang khas dengan aroma lembut.", "Disajikan panas atau dingin sesuai selera."] },
        coldbrew: { title: "Cold Brew", image: "image/coldbrew.jpg", info: ["Kopi diseduh dengan air dingin selama 12–18 jam.", "Rasa lebih halus dan tidak terlalu asam.", "Cocok dinikmati dingin untuk hari yang panas."] },
        brownies: { title: "Brownies", image: "image/Brownies.jpg", info: ["Cokelat brownies lembut dengan aroma butter.", "Tekstur fudgy dan manis seimbang.", "Paling nikmat disajikan dengan kopi espresso."] },
        cookies: { title: "Cookies", image: "image/Cookies.jpg", info: ["Kue renyah dengan taburan chocochips premium.", "Rasa gurih mentega dan manis cokelat berpadu sempurna.", "Cocok sebagai teman ngobrol di sore hari."] },
        croissant: { title: "Croissant", image: "image/Croissant.jpg", info: ["Roti Prancis berlapis dengan tekstur flaky dan lembut.", "Dibuat dari adonan mentega berkualitas tinggi.", "Lezat disantap bersama kopi latte atau teh hangat."] },
        fries: { title: "French Fries", image: "image/FrenchFries.jpg", info: ["Kentang goreng renyah di luar, lembut di dalam.", "Dibumbui ringan dengan garam dan herbs.", "Cocok untuk camilan santai atau teman minum kopi."] },
        onionrings: { title: "Onion Rings", image: "image/Onionrings.jpg", info: ["Irisan bawang besar dilapisi tepung crispy.", "Rasa gurih dan sedikit manis alami.", "Paling enak dengan saus keju atau mayones."] },
        nugget: { title: "Nugget", image: "image/Nugget.jpg", info: ["Potongan ayam dibalut tepung renyah.", "Dimasak hingga keemasan dan gurih.", "Sajikan hangat untuk rasa terbaik."] }
    };

    const memberDetails = [
        {
            name: "Muhammad Wahyu Firmansyah",
            image: "image/Wahyu.jpg"
        },
        {
            name: "Afta Wildana Zacky",
            image: "image/Afta.jpg"
        },
        {
            name: "Risda Sifa Hasna",
            image: "image/Risda.jpg"
        }
    ];

    let currentCategory = 'coffee';

    /**
     * @param {string} menuKey
     */
    function openModal(menuKey) {
        const item = menuDetails[menuKey];
        if (!item) return; 

        const modal = document.getElementById("menuModal");
        const modalImg = document.getElementById("modalImage");
        const modalTitle = document.getElementById("modalTitle");
        const modalInfo = document.getElementById("modalInfo");
        if (!modal || !modalImg || !modalTitle || !modalInfo) return; 

        modalImg.src = item.image;
        modalImg.alt = item.title;
        modalTitle.textContent = item.title;

        modalInfo.innerHTML = "";
        item.info.forEach(text => {
            const li = document.createElement("li");
            li.textContent = text;
            modalInfo.appendChild(li);
        });

        // Tampilkan modal dan kunci scroll di background
        modal.style.display = "flex";
        document.body.classList.add('modal-open');
    }

    /**
     * Fungsi untuk membuka pop-up (modal) anggota tim.
     */
    function openMemberModal() {
        const modal = document.getElementById("memberModal");
        const grid = document.getElementById("memberGrid");
        if (!modal || !grid) return;

        grid.innerHTML = "";
        memberDetails.forEach(member => {
            const card = document.createElement("div");
            card.className = "member-card";
            // 'Template literal' (pakai backtick ``) untuk membuat HTML dengan mudah
            card.innerHTML = `
                <img src="${member.image}" alt="Foto ${member.name}" class="member-image">
                <p class="member-name">${member.name}</p>
                <p class="member-major">Manajemen Informatika</p>
            `;
            grid.appendChild(card);
        });

        modal.style.display = "flex";
        document.body.classList.add('modal-open');
    }

    /**
     * Fungsi PINTAR untuk menutup SEMUA jenis modal.
     * @param {string} modalId
     */
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        }
        document.body.classList.remove('modal-open');
    }

    /**
     * Fungsi untuk menggeser galeri menu ke kiri atau kanan.
     */
    function scrollMenu(direction) {
        const galleryId = currentCategory === 'coffee' ? 'coffeeMenu' : 'snackMenu';
        const gallery = document.getElementById(galleryId);
        if (gallery) {
            const scrollAmount = gallery.clientWidth * 0.8; // Geser sejauh 80% lebar layar
            gallery.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
        }
    }

    /**
     * Fungsi untuk mengganti kategori menu dengan animasi.
     */
    function showCategory(category) {
        if (currentCategory === category) return; // Jika kategori sama, tidak usah ganti.

        const coffeeMenu = document.getElementById("coffeeMenu");
        const snackMenu = document.getElementById("snackMenu");
        const btnCoffee = document.getElementById("btnCoffee");
        const btnSnacks = document.getElementById("btnSnacks");
        if (!coffeeMenu || !snackMenu || !btnCoffee || !btnSnacks) return;

        const activeMenu = (currentCategory === 'coffee') ? coffeeMenu : snackMenu;
        const targetMenu = (category === 'coffee') ? coffeeMenu : snackMenu;

        activeMenu.style.opacity = '0';
        activeMenu.style.transform = 'translateY(10px)';

        // setTimeout menunggu animasi fade-out selesai (400ms) sebelum lanjut
        setTimeout(() => {
            activeMenu.style.display = 'none';
            targetMenu.style.display = 'flex';
            targetMenu.style.opacity = '0';
            targetMenu.style.transform = 'translateY(10px)';
            
            // requestAnimationFrame memastikan browser siap sebelum memulai animasi fade-in
            requestAnimationFrame(() => {
                targetMenu.style.opacity = '1';
                targetMenu.style.transform = 'translateY(0)';
            });

            btnCoffee.classList.toggle('active', category === 'coffee');
            btnSnacks.classList.toggle('active', category === 'snacks');
            currentCategory = category; // Update state kategori aktif

        }, 400);
    }

    // ============================
    // C. INISIALISASI & EVENT LISTENERS
    // (Bagian ini 'menghidupkan' semua interaksi)
    // ============================

    // --- Logika untuk Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // --- Event Listeners untuk Menutup Modal ---
    // 1. Jika klik area gelap di luar modal
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });
    
    // 2. Jika menekan tombol 'Escape'
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.modal[style*="display: flex"]');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });

    // --- Membuat fungsi menjadi global ---
    // Agar bisa dipanggil oleh 'onclick' di file HTML
    window.openModal = openModal;
    window.openMemberModal = openMemberModal;
    window.closeModal = closeModal;
    window.scrollMenu = scrollMenu;
    window.showCategory = showCategory;
});