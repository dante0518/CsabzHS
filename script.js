const acerImg = document.getElementById('acerImg');
const description = document.querySelector('.description');
const sponsorImg = document.querySelector('.sponsor-logo');
const achievements = document.querySelector('.table');
const achiImg = document.querySelector('.hs-stats');


function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}

function isInViewport1(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight);
}

function handleScroll() {
    if (isInViewport(acerImg, description)) {
        acerImg.classList.add('slide-in');
        description.classList.add('reveal-description');
        sponsorImg.classList.add('reveal-description');
        window.removeEventListener('scroll', handleScroll);
    }
}
window.onbeforeunload = () => {window.scrollTo(0,0)};
window.addEventListener('scroll', handleScroll);

const counter = document.querySelector('.counter');
const loadingBar = document.querySelector('.loading-bar-front');
const container = document.querySelector('.loading-container');

let idx = 0;
updatenum();

function updatenum() {
    counter.innerHTML = idx + "%";
    loadingBar.style.width = idx + "%";
    idx+=2;

    if (idx <= 100) {
        setTimeout(updatenum, 30);
    } else {
        console.log("loaded");
        setTimeout(fadeOutContainer, 1000);
    }
}

function fadeOutContainer() {
    container.classList.add('fade-out');
    setTimeout(hideLoading, 1000); 
}

function hideLoading() {
    container.style.display = "none";
    console.log("Container hidden");
}



