(function() {
  "use strict";

  /**
   * Menambahkan class .scrolled ke elemen body saat halaman digulir ke bawah.
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Tombol navigasi mobile (untuk buka/tutup menu)
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * "Sembunyikan menu navigasi mobile jika link yang diklik adalah tautan dalam halaman
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Membuka atau menutup dropdown pada menu navigasi mobile.
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   *Tombol untuk kembali ke atas halaman (scroll ke atas)
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Menginisialisasi animasi scroll saat halaman dimuat.
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   *Menjalankan/menyiapkan slider Swiper
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Mengaktifkan fitur popup
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Memastikan scrolling otomatis ke elemen dengan hash di URL berjalan dengan benar
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Scrollspy untuk menu navigasi
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/* Diagram */
const ctx = document.getElementById('mentalHealthChart').getContext('2d');

const mentalHealthChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [
      'Mood Swing',
      'Gangguan Tidur',
      'Impulse Control',
      'Kecemasan (Anxiety)',
      'Trauma',
      'PTSD',
      'OCD'
    ],
    datasets: [{
      label: 'Persentase Responden (%)',
      data: [61, 54, 38, 37, 29, 24, 19],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#C9CBCF'
      ],
      borderRadius: 8
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: context => `${context.parsed.y}% dari Gen Z`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 70,
        title: {
          display: true,
          text: 'Persentase (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: ''
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 8.5
          }
        }
      }
    }
  }
});

  /**
   * Q-Checker.
   */
function setMoodActive(el, mood, event) {
  event.stopPropagation();
  const alreadyActive = el.classList.contains('active');

  // Reset semua tampilan
  document.querySelectorAll('.mood-option').forEach(opt => opt.classList.remove('active'));
  document.getElementById('mood-suboptions').innerHTML = '';
  document.getElementById('response-section').style.display = 'none';
  ['quran', 'hadits', 'quotes'].forEach(id => document.getElementById(id).classList.remove('show'));

  // Jika sebelumnya belum aktif, tampilkan mood options
  if (!alreadyActive) {
    el.classList.add('active');
    showMoodOptions(mood);
  }
}

    function showMoodOptions(mood) {
  const sub = document.getElementById('mood-suboptions');
  const response = document.getElementById('response-section');
  response.style.display = 'none';

  let options = '';
  const moodClass = mood === 'good' ? 'bubble-good' : 'bubble-bad';

  if (mood === 'good') {
    options = `
      <div>
        <div class="bubble-option ${moodClass}" onclick="showResponses(event, '${mood}', 'Senang')">Senang</div>
        <div class="bubble-option ${moodClass}" onclick="showResponses(event, '${mood}', 'Bahagia')">Bahagia</div>
        <div class="bubble-option ${moodClass}" onclick="showResponses(event, '${mood}', 'Tenang')">Tenang</div>
      </div>`;
  } else {
    options = `
      <div>
        <div class="bubble-option ${moodClass}" onclick="showResponses(event, '${mood}', 'Kecewa')">Kecewa</div>
        <div class="bubble-option ${moodClass}" onclick="showResponses(event, '${mood}', 'Marah')">Marah</div>
        <div class="bubble-option ${moodClass}" onclick="showResponses(event, '${mood}', 'Sedih')">Sedih</div>
      </div>`;
  }

  sub.innerHTML = options;
}

    function showResponses(event, mood, submood) {
  event.stopPropagation();
  const responseSection = document.getElementById('response-section');
  responseSection.style.display = 'block';

  const moodClass = mood === 'good' ? 'bubble-good' : 'bubble-bad';

  document.querySelectorAll('#response-section .bubble-option').forEach(el => {
    el.classList.remove('bubble-good', 'bubble-bad');
    el.classList.add(moodClass);
  });

  // Set konten berdasarkan submood
  const quran = document.querySelector('#quran .dropdown-inner');
  const hadits = document.querySelector('#hadits .dropdown-inner');
  const quotes = document.querySelector('#quotes .dropdown-inner');

  if (submood === 'Senang') {
  quran.innerHTML = `
    <strong>QS. An-Najm: 43</strong><br><br>
    <span style="font-size: 1.4rem; direction: rtl; display: block;">وَأَنَّهُۥ هُوَ أَضْحَكَ وَأَبْكَىٰ</span>
    "Dan Dia-lah yang menjadikan orang tertawa dan menangis."<br><em>(Allah menciptakan keceriaan dalam hati)</em>
  `;
  hadits.innerHTML = `
    <strong>HR. Muslim</strong><br><br>
    <span style="font-size: 1.4rem; direction: rtl; display: block;">مَنْ أَدْخَلَ السُّرُورَ عَلَى قَلْبِ مُؤْمِنٍ، فَقَدْ أَسْعَدَهُ ٱللَّهُ يَوْمَ ٱلْقِيَامَةِ</span>
    "Orang yang memberi kebahagiaan kepada saudaranya,<br>Allah akan memberinya kebahagiaan pada hari kiamat."<br><em>(Kebahagiaan itu berkah)</em>
  `;
  quotes.innerHTML = `<strong>Ustadz Adi Hidayat</strong><br><br>"Bahagia itu sederhana, ketika hati bersyukur dan jiwa tenang."`;
}
else if (submood === 'Bahagia') {
  quran.innerHTML = `
    <strong>QS. Yunus: 58</strong><br><br>
    <span style="font-size: 1.4rem; direction: rtl; display: block;">قُلْ بِفَضْلِ ٱللَّهِ وَبِرَحْمَتِهِۦ فَبِذَٰلِكَ فَلْيَفْرَحُوا۟</span>
    "Katakanlah: Dengan karunia Allah dan rahmat-Nya,<br>hendaklah dengan itu mereka bergembira."<br><em>(Bahagia karena rahmat-Nya)</em>
  `;
  hadits.innerHTML = `
    <strong>HR. Ahmad</strong><br><br>
    <span style="font-size: 1.4rem; direction: rtl; display: block;">إِنَّ ٱللَّهَ يُحِبُّ ٱلْعَبْدَ ٱلشَّكُورَ</span>
    "Sesungguhnya Allah menyukai hamba yang selalu bersyukur."<br><em>(Kebahagiaan lahir dari syukur)</em>
  `;
  quotes.innerHTML = `<strong>Ustadz Hanan Attaki</strong><br><br>"Jangan tunggu bahagia baru bersyukur.<br>Tapi bersyukurlah, maka kamu akan bahagia."`;
}
else if (submood === 'Tenang') {
  quran.innerHTML = `
    <strong>QS. Ar-Ra’d: 28</strong><br><br>
    <span style="font-size: 1.4rem; direction: rtl; display: block;">أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ</span>
    "Ingatlah, hanya dengan mengingat Allah hati menjadi tenang."<br><em>(Sumber ketenangan sejati)</em>
  `;
  hadits.innerHTML = `
    <strong>HR. Bukhari</strong><br><br>
    <span style="font-size: 1.4rem; direction: rtl; display: block;">إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ</span>
    "Sesungguhnya kelembutan itu tidak berada pada sesuatu kecuali akan menghiasinya."<br><em>(Tenang dan lembut adalah bagian dari iman)</em>
  `;
  quotes.innerHTML = `<strong>Ustadz Salim A. Fillah</strong><br><br>"Tenanglah, karena takdir Allah selalu indah pada waktunya."`;
}
else if (submood === 'Kecewa') {
  quran.innerHTML = `
    <strong>QS. Al-Baqarah: 286</strong><br><br>
    <span style="font-size: 1.4rem; direction: rtl; display: block;">لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا</span>
    "Allah tidak membebani seseorang melainkan sesuai kesanggupannya."<br><em>(Kekecewaan juga punya batas dan makna)</em>
  `;
  hadits.innerHTML = `
    <strong>HR. Muslim</strong><br><br>
    <span style="font-size: 1.4rem; direction: rtl; display: block;">إِنَّ الشَّيْطَانَ يَحْضُرُ أَحَدَكُمْ عِنْدَ كُلِّ شَيْءٍ مِنْ شَأْنِهِ، حَتَّى يَحْضُرَهُ عِنْدَ طَعَامِهِ</span>
    "Sesungguhnya setan mendatangi kalian dalam setiap keadaan kalian.<br>Sampai setan ikut hadir di makanan kalian"<br><em>(Jaga hati meski kecewa)</em>
  `;
  quotes.innerHTML = `<strong>Ustadz Felix Siauw</strong><br><br>"Allah tidak pernah mengecewakan hamba-Nya<br>yang berharap penuh kepada-Nya."`;
}
else if (submood === 'Marah') {
  quran.innerHTML = `
    <strong>QS. Ali Imran: 134</strong><br><br>
    <span style="font-size: 1.4rem; direction: rtl; display: block;">وَٱلْكَٰظِمِينَ ٱلْغَيْظَ وَٱلْعَافِينَ عَنِ ٱلنَّاسِ</span>
    "Dan orang-orang yang menahan amarahnya dan memaafkan (kesalahan) orang lain."<br><em>(Kendalikan amarah dengan iman)</em>
  `;
  hadits.innerHTML = `
    <strong>HR. Bukhari</strong><br><br>
    <span style="font-size: 1.4rem; direction: rtl; display: block;">لَيْسَ ٱلشَّدِيدُ بِٱلصُّرَعَةِ، إِنَّمَا ٱلشَّدِيدُ ٱلَّذِي يَمْلِكُ نَفْسَهُ عِندَ ٱلْغَضَبِ</span>
    "Bukanlah orang kuat itu yang menang dalam pergulatan,<br>tapi yang mampu menahan amarahnya."<br><em>(Marah itu ujian kekuatan jiwa)</em>
  `;
  quotes.innerHTML = `<strong>Ustadz Abdul Somad</strong><br><br>"Marah bukan tanda kekuatan, tapi kelemahan yang tak terkontrol."`;
}
else if (submood === 'Sedih') {
  quran.innerHTML = `
    <strong>QS. Ali Imran: 139</strong><br><br>
    <span style="font-size: 1.4rem; direction: rtl; display: block;">وَلَا تَهِنُوۡا وَ لَا تَحۡزَنُوۡا وَاَنۡتُمُ الۡاَعۡلَوۡنَ اِنۡ كُنۡتُمۡ مُّؤۡمِنِيۡنَ</span>
    "Janganlah kamu bersikap lemah dan janganlah pula kamu bersedih hati,<br>padahal kamulah orang orang yang paling tinggi derajatnya jika kamu beriman."<br><em>(Kesedihan tak berarti akhir)</em>
  `;
  hadits.innerHTML = `
    <strong>HR. Bukhari</strong><br><br>
    <span style="font-size: 1.4rem; direction: rtl; display: block;">إِذَا أَحَبَّ ٱللَّهُ قَوْمًا ٱبْتَلَاهُمْ</span>
    "Jika Allah mencintai suatu kaum, maka Dia mengujinya."<br><em>(Kesedihan adalah bentuk cinta Allah)</em>
  `;
  quotes.innerHTML = `<strong>Ustadz Badrussalam</strong><br><br>"Kesedihan hari ini adalah pelajaran untuk bahagia esok hari."`;
}

  // Tutup semua dropdown
  ['quran', 'hadits', 'quotes'].forEach(id => document.getElementById(id).classList.remove('show'));
}

    function toggleDropdown(id) {
      const el = document.getElementById(id);
      const isOpen = el.classList.contains('show');
      ['quran', 'hadits', 'quotes'].forEach(sec => document.getElementById(sec).classList.remove('show'));
      if (!isOpen) el.classList.add('show');
    }

    function resetMood(event) {
      const trackq = document.getElementById('mood');
      if (!trackq.contains(event.target)) return;
      if (event.target.closest('.mood-option') || event.target.closest('.bubble-option') || event.target.closest('.dropdown-content')) return;

      document.querySelectorAll('.mood-option').forEach(opt => opt.classList.remove('active'));
      document.getElementById('mood-suboptions').innerHTML = '';
      document.getElementById('response-section').style.display = 'none';
      ['quran', 'hadits', 'quotes'].forEach(id => document.getElementById(id).classList.remove('show'));
    }