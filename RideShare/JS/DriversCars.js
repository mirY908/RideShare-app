
function InsertDetails() {
  const driversJsonString = sessionStorage.getItem('matchedDrivers');
  if (!driversJsonString) {
    console.error('No matchedDrivers data found in sessionStorage');
    return;
  }

  const matchedDrivers = JSON.parse(driversJsonString);

  const container = document.querySelector('.container');
  if (!container) {
    console.error('Container element not found');
    return;
  }

  matchedDrivers.forEach(driver => {
    // **הוספה: משתנה imagePath כדי להשתמש בנתיב התמונה מהגייסון, עם trim להסרת רווחים**
    const imagePath = driver.profileImage ? driver.profileImage.trim() : '../Pictures/default.jpg';

    const AddCard = document.createElement('div');
    AddCard.classList.add('driver-card');
    AddCard.innerHTML = `
      <div class="header">
        <div class="status-indicator"></div>
        <div class="driver-name">${driver.firstName} ${driver.lastName}</div>
        <div class="profile-pic">
<div style="display: flex; justify-content: center; align-items: center;">
  <img 
    src="${imagePath}" 
    alt="תמונת פרופיל של ${driver.firstName}" 
    style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #4fc3f7;" 
  />
</div>

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
      <button class="action-button">לאישור והזמנת הנסיעה</button>
    `;

    const button = AddCard.querySelector('.action-button');
    button.addEventListener('click', () => {
      window.location.href = 'SaveInfromation.html';
    });

    container.appendChild(AddCard);
  });
}

// קרא את הפונקציה ברגע שהדום מוכן
document.addEventListener('DOMContentLoaded', InsertDetails);
