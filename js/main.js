// querySelector function
const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`Uverite se da li ovaj ${selector} postoji.`);
};

// element
const header = selectElement(".header");
const slides = document.querySelectorAll(".slide");
const slideText = document.querySelectorAll(".slide-text");
const nextBtn = selectElement("#next");
const prevBtn = selectElement("#prev");
const galleryFilter = selectElement(".gallery-filter");
const itemBox = document.querySelectorAll(".item-box");
const contactForm = selectElement("#contact-form");
const contactBtn = selectElement("#contact-btn");
const contactInput = selectElement("#email");
const date = selectElement("#date");

// activSlide
let activeSlide = 0;

// changeHeaderBg
function changeHeaderBg() {
  header.style.backgroundImage = slides[activeSlide].style.backgroundImage;
}

changeHeaderBg();

//remove/add activ class

function addActivSlide() {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slides[activeSlide].classList.add("active");
  slideText.forEach((text) => {
    text.classList.remove("active");
  });
  slideText[activeSlide].classList.add("active");
}
addActivSlide();
// nextSlide
nextBtn.addEventListener("click", () => {
  activeSlide++;
  if (activeSlide > slides.length - 1) {
    activeSlide = 0;
  }
  addActivSlide();
  changeHeaderBg();
});
// prevSlide
prevBtn.addEventListener("click", () => {
  activeSlide--;
  if (activeSlide < 0) {
    activeSlide = slides.length - 1;
  }
  addActivSlide();
  changeHeaderBg();
});

// galleryFilter event

galleryFilter.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter")) {
    galleryFilter.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");

    const filterValue = e.target.getAttribute("data-filter");

    itemBox.forEach((item) => {
      if (item.classList.contains(filterValue) || filterValue === "all") {
        item.classList.add("show");
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  }
});

// options for submint btn

const contactBtnOptions = {
  pending: `
    <svg xmlns="http://www.w3.org/2000/svg" class="animate-rotate" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="128" y1="32" x2="128" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="224" y1="128" x2="192" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="195.9" y1="195.9" x2="173.3" y2="173.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="128" y1="224" x2="128" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="195.9" x2="82.7" y2="173.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="32" y1="128" x2="64" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="60.1" x2="82.7" y2="82.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
    <span >
    Sending...
    </span>
  `,
  success: `
  <span class="uppercase tracking-wide">
    Thank you!
    </span>
    <span class="uppercase tracking-wide">
    ??????
    </span>`,
};

// addDisabledAtribute
const addDisabledAtribute = (els) => {
  els.forEach((el) => el.setAttribute("disabled", true));
};
// postEmaliToDataBase

function postEmaliToDataBase(userEmail) {
  console.log(`Your email address is ${userEmail}`);
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

// handleSubmintForm

async function handleFormSubmint(e) {
  e.preventDefault();
  contactBtn.innerHTML = contactBtnOptions.pending;
  addDisabledAtribute([contactBtn, contactForm]);
  const userEmail = contactInput.value;
  contactInput.style.display = "none";
  await postEmaliToDataBase(userEmail);
  contactBtn.innerHTML = contactBtnOptions.success;
}
contactForm.addEventListener("submit", handleFormSubmint);

// display date

date.textContent = new Date().getFullYear();

// interseption observer

const fadeUp = new IntersectionObserver(
  (itemToWatch) => {
    itemToWatch.forEach((item) => {
      if (item.isIntersecting) {
        item.target.classList.add("faded");
        fadeUp.unobserve(item.target);
        item.target.addEventListener(
          "transitionend",
          () => {
            item.target.classList.remove("fade-up");
          },
          { once: true }
        );
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll(".fade-up").forEach((item) => {
  fadeUp.observe(item);
});
