window.onload = function () {
    const driversArray = [];

    document.querySelectorAll('.driver-card').forEach(card => {
        const inputs = card.querySelectorAll('input');

        if (inputs.length >= 4) {
            const driver = {
                name: inputs[0].value,
                lastName: inputs[1].value,
                phone: inputs[2].value,
                email: inputs[3].value
            };
            driversArray.push(driver);
        }
    });

    console.log(driversArray);

    // אם יש נהג חדש ב-localStorage – מוסיפים אותו
    const driversList = JSON.parse(localStorage.getItem('driversList')) || [];
    driversList.forEach(driver => {
        driversArray.push(driver);
        addDriverToDOM(driver);
    });
}

function addDriverToDOM(driver) {
    const container = document.querySelector('.container');
    const card = document.createElement('div');
    card.classList.add('driver-card');

    card.innerHTML = `
    <div class="header">
    <div class="status-indicator"></div>
    <div class="driver-name">${driver.firstName} ${driver.lastName}</div>
    <div class="profile-pic">
        <img src="${driver.profileImage}" alt="" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />
    </div>
    </div>

        <div class="form-group">
            <label class="form-label">שם פרטי</label>
            <input type="text" class="form-input" value="${driver.firstName}" readonly>
        </div>
 
        <div class="form-group">
            <label class="form-label">שם משפחה</label>
            <input type="text" class="form-input" value="${driver.lastName}" readonly>
        </div>

        <div class="form-group">
            <label class="form-label">טלפון</label>
            <input type="text" class="form-input" value="${driver.phone}" readonly>
        </div>

        <div class="form-group">
            <label class="form-label">מייל</label>
            <input type="text" class="form-input" value="${driver.email}" readonly>
        </div>

    <button class="action-button">${driver.buttonText || 'לאישור והזמנת הנסיעה'}</button>`;

    container.appendChild(card);
}
