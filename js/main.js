const toggle = document.getElementById('theme-toggle');
const body = document.body;

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
});

var elem = document.querySelector('.carousel');
var flkty = new Flickity(elem, {
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    prevNextButtons: true,
    pageDots: true
    });

const menus = document.querySelectorAll('.menu-txt .txt');

function showMenu(index) {
  menus.forEach((menu, i) => {
    if (i === index) {
      menu.classList.add('active');
    } else {
      menu.classList.remove('active');
    }
  });
}

showMenu(0);

flkty.on('select', function() {
  showMenu(flkty.selectedIndex);
});

const btn = document.querySelector('#send');
const form = document.querySelector('.feedback form');
const preference = document.querySelector('.preference-added');
const error = document.querySelector('.feedback .error');

btn.addEventListener('click', (event) => {
    event.preventDefault();

    const inputs = form.querySelectorAll('input');
    const textareas = form.querySelectorAll('textarea');

    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            allFilled = false;
        }
    });

    textareas.forEach(textarea => {
        if (textarea.value.trim() === '') {
            allFilled = false;
        }
    });

    if (allFilled) {
        error.classList.remove('show');
        preference.classList.add('show');

        inputs.forEach(input => input.value = '');
        textareas.forEach(textarea => textarea.value = '');

        setTimeout(() => {
            preference.classList.remove('show');
        }, 3000);
    } else {
        error.classList.add('show');

        inputs.forEach(input => input.value = '');
        textareas.forEach(textarea => textarea.value = '');

        setTimeout(() => {
            error.classList.remove('show');
        }, 3000);
    }
});