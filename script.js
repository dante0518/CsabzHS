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

window.addEventListener('scroll', handleScroll);



