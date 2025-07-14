document.addEventListener('DOMContentLoaded', () => {

    /*
    =================================
      THEME TOGGLE LOGIC
      - Checks localStorage for a saved theme.
      - Sets the toggle switch to the correct position on page load.
      - Listens for clicks on the toggle to switch themes.
    =================================
    */
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /*
    =================================
      NAVBAR ACTIVE STATE LOGIC
      - Determines the current page (e.g., "work.html").
      - Adds the ".active" class to the corresponding link in the navbar.
    =================================
    */
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split("/").pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    /*
    =================================
      PAGE TRANSITION LOGIC
      - Intercepts clicks on main navigation links.
      - Fades the page out before loading the new page.
    =================================
    */
    const navLinksToFade = document.querySelectorAll('#nav-about, #nav-work, #nav-contact');

    navLinksToFade.forEach(link => {
        link.addEventListener('click', e => {
            const url = link.getAttribute('href');
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = url;
            }, 400);
        });
    });


    /*
    =================================
      EMAILJS CONTACT FORM LOGIC
    =================================
    */
    const contactForm = document.querySelector('.contact-form');

    // This checks if the contact form exists on the current page before running
    if (contactForm) {
        // 1. Replace with your actual keys from EmailJS
        const publicKey = 'VSn_iBbsNHA5-bhCt';
        const serviceID = 'service_9qwqjml';
        const templateID = 'template_hyiczy6';

        // 2. Initialize EmailJS with your Public Key
        emailjs.init(publicKey);

        // 3. Add the event listener to the form
        contactForm.addEventListener('submit', e => {
            e.preventDefault(); // Prevents the form from submitting the default way

            const submitBtn = contactForm.querySelector('.submit-button');
            submitBtn.innerText = 'Sending...'; // Give user feedback

            // 4. Send the form data
            emailjs.sendForm(serviceID, templateID, contactForm)
                .then(() => {
                    // On Success
                    submitBtn.innerText = 'Message Sent!';
                    contactForm.reset(); // Clear the form fields
                }, (err) => {
                    // On Error
                    submitBtn.innerText = 'Error! Try Again.';
                    alert('Failed to send message. Please try again. ' + JSON.stringify(err));
                });
        });
    }

    /*
    =================================
      3D LETTER ANIMATION LOGIC
      - Contains the function to animate text letter by letter.
      - Calls the function for various elements on the page.
    =================================
    */
    const animateText = (elementId, delay) => {
        const element = document.getElementById(elementId);
        if (!element) return;

        const originalHTML = element.innerHTML;
        element.innerHTML = '';
        let characterDelay = 0;

        const lines = originalHTML.split(/<br\s*\/?>/i);

        lines.forEach((line, lineIndex) => {
            const words = line.split(' ');

            words.forEach((word, wordIndex) => {
                if (word.length > 0) {
                    const wordWrapper = document.createElement('span');
                    wordWrapper.className = 'word-wrapper';

                    word.split('').forEach(char => {
                        const charSpan = document.createElement('span');
                        charSpan.innerText = char;
                        charSpan.style.animationDelay = `${characterDelay}ms`;
                        wordWrapper.appendChild(charSpan);
                        characterDelay += delay;
                    });
                    element.appendChild(wordWrapper);
                }

                if (wordIndex < words.length - 1) {
                    element.appendChild(document.createTextNode(' '));
                }
            });

            if (lineIndex < lines.length - 1) {
                element.appendChild(document.createElement('br'));
            }
        });
    };

    // Animate all target text elements on page load
    animateText('hero-title', 35);
    animateText('hero-subtitle', 15);
    animateText('nav-about', 25);
    animateText('nav-work', 25);
    animateText('nav-contact', 25);
    animateText('nav-resume', 25);
});
