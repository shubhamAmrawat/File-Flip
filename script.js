 

// hamburger


const hamburgerIcon = document.querySelector('.hamburger-icon');
const navLinks = document.querySelector('.links-container ul');

hamburgerIcon.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});


