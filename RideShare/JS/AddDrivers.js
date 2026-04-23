
// localStorage.clear();

const dom = {
    preview: document.getElementById('profilePreview')
}

//בעת לחיצה על המצלמה נפתח לך קובץ לבחירת תמונה
document.querySelector('.profile-image-upload').addEventListener('click', function () {
    document.getElementById('profileImage').click();
});

// טיפול בהעלאת תמונת פרופיל
document.getElementById('profileImage').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            profileImageData = event.target.result;
            dom.preview.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;

            // אנימציה של תמונה חדשה
            dom.preview.style.transform = 'scale(0.8)';
            setTimeout(() => {
                dom.preview.style.transform = 'scale(1)';
            }, 100);
        };
        reader.readAsDataURL(file);
    }
});

let profileImageData = '';

function addDriver(event) {
    event.preventDefault();

    const form = document.getElementById('driverForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }


    //בדיקה של שעה ותאריך האם הם תקינים
    const inputDateStr = date.value; // בפורמט YYYY-MM-DD
    const inputTimeStr = time.value; // בפורמט HH:MM

    // שלב 1: לאחד תאריך + שעה למחרוזת אחת
    const fullDateTimeStr = `${inputDateStr}T${inputTimeStr}`;

    // שלב 2: להפוך את זה לאובייקט Date
    const inputDateTime = new Date(fullDateTimeStr);

    // שלב 3: להשוות לתאריך/שעה נוכחיים
    const now = new Date();

    if (inputDateTime < now) {
        Swal.fire({
            text: ' ⌛התאריך או השעה שהוזנו כבר עברו!',
            confirmButtonText: 'אישור',
            confirmButtonColor: '#4fc3f7',
            background: '#ffffff',
            color: '#4fc3f7',
            width: 280,
            padding: '1em'
        });
        return;
    }

    const typeSelected = document.querySelector('input[name="tripType"]:checked');

    if (
        document.getElementById('firstName').value.trim() !== '' &&
        document.getElementById('lastName').value.trim() !== '' &&
        document.getElementById('email').value.trim() !== '' &&
        document.getElementById('phone').value.trim() !== '' &&
        document.getElementById('fromLocation').value.trim() !== '' &&
        document.getElementById('toLocation').value.trim() !== '' &&
        document.getElementById('date').value.trim() !== '' &&
        document.getElementById('time').value.trim() !== ''

    ) {
        const img = profileImageData;
        const name = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const fromLocation = document.getElementById('fromLocation').value.trim();
        const toLocation = document.getElementById('toLocation').value.trim();
        const date = document.getElementById('date').value.trim();
        const time = document.getElementById('time').value.trim();
        const seats = document.getElementById('seats').value.trim();


        const profileData = {
            profileImage: img,    
            firstName: name,      
            lastName: lastName,
            phone: phone,
            email: email,
            fromLocation: fromLocation,
            toLocation: toLocation,       
            date: date,
            time: time,
            seats: seats,
        };

        let driversList = JSON.parse(localStorage.getItem('driversList')) || [];
        driversList.push(profileData);
        localStorage.setItem('driversList', JSON.stringify(driversList));

        const modal = document.getElementById('success-modal');
        modal.style.display = 'block';

        setTimeout(() => {
            closeModal();
        }, 1500);
    }
}

function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
}



