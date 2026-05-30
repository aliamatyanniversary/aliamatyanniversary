const btn = document.querySelector('.taskbar-button');

const wallpaper1 = "https://wallpaperaccess.com/full/2421274.jpg";
const wallpaper2 = "https://mrwallpaper.com/images/high/netflix-you-season-3-scene-of-joe-and-love-pdnfevdp5pu4um9d.webp";
let isOriginal = true;

btn.addEventListener('click', function() {
  isOriginal = !isOriginal;
  document.body.style.backgroundImage = `url("${isOriginal ? wallpaper1 : wallpaper2}")`;
});
