// --- Animasi Angka (Counter) ---
        let counterHasRun = false; 
        
        function animateValue(obj, start, end, duration, isFloat = false, suffix = "") {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                
                let currentVal = progress * (end - start) + start;
                
                if (isFloat) {
                    obj.innerHTML = currentVal.toFixed(1) + suffix;
                } else {
                    obj.innerHTML = Math.floor(currentVal) + suffix;
                }
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    obj.innerHTML = (isFloat ? end.toFixed(1) : end) + suffix;
                }
            };
            window.requestAnimationFrame(step);
        }

        function runCounters() {
            if(counterHasRun) return; 
            
            const terjualEl = document.getElementById('count-terjual');
            const ratingEl = document.getElementById('count-rating');
            
            if (terjualEl && ratingEl) {
                animateValue(terjualEl, 0, 360, 1500, false, "+");
                animateValue(ratingEl, 0, 4.9, 1500, true, "");
                counterHasRun = true;
            }
        }

        // --- Logika Deteksi Scroll (Update Menu Otomatis & Trigger Animasi) ---
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-item");

        // Fitur ini mengamati posisi halaman ke sistem browser utama (bukan elemen buatan)
        const observerOptions = {
            root: null, 
            rootMargin: '-20% 0px -60% 0px', // Ini memastikan menu bawah menyala tepat saat judul dibaca
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    const id = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`.nav-item[href="#${id}"]`);
                    if(activeLink) activeLink.classList.add('active');

                    if(id === 'home') {
                        runCounters();
                    }
                }
            });
        }, observerOptions);

        sections.forEach(sec => observer.observe(sec));

        // --- Logika Dark Mode ---
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        if(localStorage.getItem('theme') === 'light') {
            body.classList.add('light-mode');
            themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const icon = themeToggle.querySelector('i');
            if(body.classList.contains('light-mode')) {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        });
            
            // --- Logika Kirim Pesan ke WhatsApp ---
document.getElementById('contactForm').addEventListener('submit', function(e) {
    // Mencegah form reload halaman
    e.preventDefault();

    // Mengambil nilai dari input
    var nama = document.getElementById('nama').value;
    var email = document.getElementById('email').value;
    var pesan = document.getElementById('pesan').value;

    // Nomor WhatsApp tujuan
    var nomorWA = "62895325028943"; 

    // Format pesan
    var text = "Halo Admin LIFZ STORE48, saya ingin bertanya." + "\n\n" +
               "*Nama* : " + nama + "\n" +
               "*Email* : " + email + "\n" +
               "*Pesan* : " + pesan;

    // Membuat URL API WhatsApp
    var url = "https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(text);

    // Membuka tab baru ke WhatsApp
    window.open(url, '_blank');
});