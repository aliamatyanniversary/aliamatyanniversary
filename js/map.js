// js/map.js
// Handles the desktop Prague Map window: dragging, open/close, and Leaflet map initialization.

// Define global list of locations so birthday.html can share and read it directly!
window.pragueLocations = [
  {
    coords: [50.1013497910838, 14.389202390026476],
    iconType: "my-home",
    title: "Matýskovo vězení",
    desc: "Tady je můj internát, kde jsem držen jako zajatec, protože nemůžu spát u tebe nebo bydlet s tebou.",
    img: ""
  },
  {
    coords: [50.06884267211929, 14.464041522122304],
    iconType: "her-home",
    title: "Alisčin Domov 🌸",
    desc: "Tady bydlíš ty - moje princezna. Místo, kam tě vždycky chodím vyzvednout a máme bomb makeouts<3",
    img: "img/ali-doma.jpg"
  },
  {
    coords: [50.0805, 14.4428],
    iconType: "heart",
    title: "Riegrovy Sady",
    desc: "Náš spot kde jsme si poprvé spolu vybrali matching wallpapers, já papal tvůj koláč, hráli karty, měli deep throaths a tady jsem pochopil že máme stejné hodnoty.",
    img: "img/polaroid_sunset.jpg"
  },
  {
    coords: [50.08993636705294, 14.426566478787027],
    iconType: "heart",
    title: "MY coffee",
    desc: "Náš coffe/study date kde jsi se učila chemii a podle tebe jsi díky mně zvládla test. Potom jsme šli do divadla na hru 27 LITRŮ UMĚLÝ KRVE a potkala jsi mé kamarády. Taky to byl večer kde jsem se tě zeptal, jestli bys byla má holka <3",
    img: "img/mycoffe.jpg"
  },
  {
    coords: [50.0772495545386, 14.45305935774343],
    iconType: "cat",
    title: "Cats and coffee",
    desc: "Nejvíc cute kočičí kavárna, tady jsem si uvědomil že chci s tebou jakékoli domácí zvířátko.",
    img: "img/cats.jpg"
  },
  {
    coords: [50.03046760772012, 14.490519501701506],
    iconType: "heart",
    title: "Cinema City Chodov",
    desc: "NEJLEPŠÍ CINAME DATES S TEBOU. Společné filmy jako Project Hail Mary a Obsession, jedno z našich go-to kin.",
    img: "img/cinema.jpg"
  },
  {
    coords: [50.07200094698259, 14.445645950653947],
    iconType: "heart",
    title: "Kavárna Šlágr",
    desc: "Náš jeden z prvích dates, taky jsme tu hráli UNO a já ti dal prví love letter a taky sis uvědomila že mě asi už nikdy v ničem neporazíš :3",
    img: "img/slagr.jpg"
  },
  {
    coords: [50.09069316909392, 14.425874801932027],
    iconType: "heart",
    title: "NoD - ROXY Divadlo",
    desc: "Náš první divadlo date, taky jsi tady viděla mé kamarády. Zde jsem si uvědomil že chci abys byla má žena, protože jsi řekla 'zvedni se a zatleskej za nás oba', to mi přišlo strašně hot btw. A potom jak jsme čekali na Masarykově Náměstí na tramvaj a celkově jsme se cuddlovali a potom v tramvaji na sebe hezky koukali :3 A taky jsem se tě při odchodu zeptal, jestli budeš moje holka.",
    img: "img/slagr.jpg"
  },
  {
    coords: [50.07156933925069, 14.405947917969064],
    iconType: "heart",
    title: "Garage Billiard & Bowling",
    desc: "Nejvíc užitý date vůbec, bylo tady strašně moc fun a taky jsi poznala že jsem dost competetive a že proti mně asi nevyhraješ HEHEA.",
    img: "img/bowling.jpg"
  },
  {
    coords: [50.08888676811389, 14.409064236842566],
    iconType: "heart",
    title: "Vojanovy sady",
    desc: "Tady jsme byli před bowlingem, seděli jsme na lavičce a povídali si a já tě chtěl zkoušet z dejepisu a poté v tramvaji jsem taky zkoušel. Vedle těch pávů jsi byla jako princezna<3",
    img: "img/peacock.jpg"
  },
  {
    coords: [50.07518156003883, 14.445091116493144],
    iconType: "heart",
    title: "Altro Da Tony",
    desc: "Dinner!! Italian restaurant kde paní byla strašně moc příjemná a celkově ten personál byl úplně skbidi - jak ses zeptala na ty objednávky na to napichovátko a ten kuchař ti hnedka odpověděl :D<3",
    img: "img/italian.jpg"
  },
  {
    coords: [50.07144331084202, 14.493675850766403],
    iconType: "heart",
    title: "Gutovka - minigolf",
    desc: "MiniGolf datee!!! Měla jsi tady nejvíc cute outfit a taky to byla pěkná ragebait session tebe >:D Potom i jak jsem dal hole in one a ti Ukrajinci mi řekli 'хорошо'. Tvoje score mám pořád schováné. Chtěl bych si tohle zahrát s tvými rodiči.",
    img: "img/golf.jpg"
  },
  {
    coords: [50.07109544724174, 14.451263468888504],
    iconType: "heart",
    title: "The FLAT cafe",
    desc: "Tady jsme byli tolikrát že nevím co tu napsat:D Byli jsme tady když tvoji rodiče byli někde v baru, to jsme tady byli po tom kině, a ty jsi nakonec měla crashout z tvé třídy a celkově kvůli lidem. Potom jsme tady byli po tom golfu, taky náš nejlepší go-to spot pro kafé<3 Já jsem tady dal hodně lockin na HTB a ty jsi se učila a potom jsme si dali i něco yummy na papu. HM: Mají tu super a cool záchody!!!",
    img: "img/flatcafe.jpg"
  }

  
];

document.addEventListener('DOMContentLoaded', () => {
  const mapIcon = document.getElementById('map-icon');
  const mapWindow = document.getElementById('map-window');
  const mapClose = document.getElementById('map-close');
  const mapTitlebar = document.getElementById('map-titlebar');
  
  let placesMap = null;

  // Open/Close
  if (mapIcon && mapWindow) {
    mapIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mapWindow.style.display = mapWindow.style.display === 'block' ? 'none' : 'block';
      mapWindow.style.zIndex = 200; // bring to front

      // Initialize map if not already done
      if (mapWindow.style.display === 'block') {
        initPragueMap();
      }
    });
  }

  if (mapClose && mapWindow) {
    mapClose.addEventListener('click', () => {
      mapWindow.style.display = 'none';
    });
  }

  // Dragging logic
  let dragging = false;
  let offsetX = 0, offsetY = 0;

  const startDrag = (clientX, clientY) => {
    dragging = true;
    const rect = mapWindow.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
  };

  const moveDrag = (clientX, clientY) => {
    if (!dragging) return;
    mapWindow.style.left = (clientX - offsetX) + 'px';
    mapWindow.style.top = (clientY - offsetY) + 'px';
  };

  const endDrag = () => { dragging = false; };

  if (mapTitlebar && mapWindow) {
    mapTitlebar.addEventListener('mousedown', (e) => {
      startDrag(e.clientX, e.clientY);
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
    document.addEventListener('mouseup', endDrag);

    mapTitlebar.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener('touchend', endDrag);
  }

  function initPragueMap() {
    if (placesMap) {
      // Leaflet requires invalidating size when reopened to display tiles correctly
      setTimeout(() => {
        placesMap.invalidateSize();
      }, 50);
      return;
    }

    // Initialize Leaflet map
    placesMap = L.map('desktop-map-container', {
      zoomControl: true,
      scrollWheelZoom: true
    }).setView([50.083, 14.420], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CartoDB'
    }).addTo(placesMap);

    // Custom heart map pin
    const heartIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div class="heart-pin-wrapper"><span class="heart-pin-icon">❤️</span></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -32]
    });

    // Custom home pins (pink/blue hearts)
    const myHomeIcon = L.divIcon({
      className: 'custom-map-pin home-pin my-home',
      html: `<div class="heart-pin-wrapper"><span class="heart-pin-icon">💙</span></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -32]
    });

    const herHomeIcon = L.divIcon({
      className: 'custom-map-pin home-pin her-home',
      html: `<div class="heart-pin-wrapper"><span class="heart-pin-icon">💖</span></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -32]
    });

    const catEmoji = L.divIcon({
      className: 'custom-map-pin home-pin cat',
      html: `<div class="cat-wrapper"><span class="cat">🐱</span></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -32]
    });

    const iconMap = {
      'my-home': myHomeIcon,
      'her-home': herHomeIcon,
      'heart': heartIcon,
      'cat' : catEmoji
    };

    const locations = window.pragueLocations;

    locations.forEach((loc) => {
      let popupHTML = "";
      if (loc.img) {
        popupHTML = `
          <div class="map-polaroid">
            <div class="polaroid-img-frame">
              <img src="${loc.img}" alt="${loc.title}">
            </div>
            <div class="polaroid-caption">
              <h3>${loc.title}</h3>
              <p>${loc.desc}</p>
            </div>
          </div>
        `;
      } else {
        popupHTML = `
          <div class="map-polaroid no-img">
            <div class="polaroid-caption">
              <h3>${loc.title}</h3>
              <p>${loc.desc}</p>
            </div>
          </div>
        `;
      }

      L.marker(loc.coords, { icon: iconMap[loc.iconType] || heartIcon })
        .bindPopup(popupHTML, { maxWidth: 240, className: 'leaflet-polaroid-popup' })
        .addTo(placesMap);
    });

    setTimeout(() => {
      placesMap.invalidateSize();
    }, 150);
  }
});
