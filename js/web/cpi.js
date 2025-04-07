const cpiInputs = document.querySelectorAll('.cpi-input');

if (cpiInputs) {
    cpiInputs.forEach((cpiInput) => {
        let cpiInputDropItems = cpiInput.querySelectorAll('.dropdown-item');
        let cpiDropBtn = cpiInput.querySelector('.cpi-drop');
        let cpiExtTxt = cpiInput.querySelector('.cpi-ext-txt');
        let countryCodeInput = cpiInput.querySelector('.country-code-input');
        let phoneInput = cpiInput.querySelector('.phone-input');

        phoneInput.addEventListener('focus', () => {
            cpiInput.classList.add('cpi-input-focus');
        });

        phoneInput.addEventListener('blur', () => {
            cpiInput.classList.remove('cpi-input-focus');
        });

        if (cpiInputDropItems) {
            cpiInputDropItems.forEach((cpiInputDropItem) => {
                cpiInputDropItem.addEventListener('click', (event) => {
                    let dataSet = event.target.dataset;

                    cpiDropBtn.innerHTML = `<span class="me-1">${dataSet.cpiIcon}</span>`;
                    cpiExtTxt.innerHTML = dataSet.cpiExt;
                    countryCodeInput.value = dataSet.cpiId;

                    // reset to default to avoid error
                    phoneInput.minLength = 6;
                    phoneInput.maxLength = 30;

                    phoneInput.focus();
                });
            });
        }
    });
}
