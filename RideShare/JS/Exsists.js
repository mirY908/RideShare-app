
//חיצוני JSON הבאה מקובץ  
let driversFullData = [];

fetch('../JSON/Drivers.json')
    .then(response => response.json())
    .then(data => {
        driversFullData = data;

        setupFormHandler();

    })
    .catch(error => console.error(error));

//פונקציה שמונעת שליחה רגילה של הקובץ וטעינה של הדף
function setupFormHandler() {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
    });
}

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = normalizePhone(document.getElementById('phone').value.trim());
    const localStorageDrivers = JSON.parse(localStorage.getItem('driversList')) || [];

    //מצרף למערך אחד גם את הנהגים השמורים וגם את הנהגים מהלוקל סטורייג
    const allDrivers = [...driversFullData, ...localStorageDrivers];

    let found = false;

    for (let i = 0; i < allDrivers.length && !found; i++) {
        const driver = allDrivers[i];
        const driverPhone = normalizePhone(driver.phone);
        if (
            driver.firstName === firstName &&
            driver.lastName === lastName &&
            driverPhone === phone
        ) {
            found = true;
        }
    }
    const name = document.getElementById("firstName").value;
    if (found)
        showToast(`🚗 היי, ${name}, כיף לראות אותך שוב! 😊`, "../HTML/Index.html");
    else
        showToast(`🎊 היי, ${name}, ברוך הבא למשפחת הנהגים שלנו!<br>מלא פרטים ונצא לדרך 🚗🤝`, "../HTML/AddDrivers.html");
});

//ביטוי רגולרי
//פונקצית עזר שהופכת את המספר למספר תקין ללא קווים או פורמטים שונים כדי שההשוואה תהיה תקינה
function normalizePhone(phone) {
    return phone.replace(/\D/g, '');
}

//הודעה קופצת
function showToast(message, redirectUrl) {
    const toast = document.querySelector('.toast');
    const overlay = document.getElementById('toastOverlay');

    toast.innerHTML = message;
    toast.classList.add('show');
    overlay.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        overlay.classList.remove('show');
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }, 2500);
}
















