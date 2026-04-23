// localStorage.clear()

//חיצוני json הבאת המערך מקובץ  
// משתנה גלובלי – אפשר להשתמש בו מכל מקום אחר
let driversFullData = [];

// פונקציה שמביאה את המידע מהקובץ JSON
async function loadDriversData() {
    try {
        const response = await fetch("../JSON/Drivers.json");
        driversFullData = await response.json(); // כאן הנתונים נשמרים במשתנה הגלובלי
        console.log("✅ הנתונים נטענו:", driversFullData);
    } catch (error) {
        console.error("שגיאה בטעינת קובץ JSON:", error);
    }
}
// לקרוא לפונקציה ישר כשנטען הדף
async function initDrivers() {
    await loadDriversData();  // מחכה שהטעינה תסתיים
    const driversListFromStorage = JSON.parse(localStorage.getItem('driversList') || "[]");
    driversFullData.push(...driversListFromStorage);
    console.log("📦 כל הנהגים אחרי טעינה מה־localStorage:", driversFullData);

    // כאן אפשר לקרוא פונקציות שמציגות את הנתונים ב-HTML או עושות איתם כל פעולה אחרת
}
initDrivers();

let DriversCard = [];
document.querySelector("#submit").onclick = function (event) {
    event.preventDefault(); // מונע שליחה רגילה של הטופס

    const Fullname = document.querySelector("#fullname");
    const phone = document.querySelector("#phone");
    const fromLocation = document.querySelector("#fromLocation");
    const toLocation = document.querySelector("#toLocation");
    const seats = document.querySelector("#seats");
    const date = document.querySelector("#date");
    const time = document.querySelector("#time");

    // בדיקות אם שדות ריקים
    if (
        !Fullname.value.trim() ||
        !phone.value.trim() ||
        !fromLocation.value.trim() ||
        !toLocation.value.trim() ||
        !seats.value.trim() ||
        !date.value.trim() ||
        !time.value.trim()
    ) {
        Swal.fire({
            icon: 'warning',
            text: 'אנא מלא את כל השדות',
            confirmButtonText: 'אישור',
            confirmButtonColor: '#4fc3f7',
            background: '#ffffff',
            color: '#4fc3f7',
            width: 200,
            customClass: {
                popup: 'swal-custom-popup'
            }
        });
        return;
    }


    const inputDateStr = date.value; // בפורמט YYYY-MM-DD
    const inputTimeStr = time.value; // בפורמט HH:MM

    //  לאחד תאריך + שעה למחרוזת אחת
    const fullDateTimeStr = `${inputDateStr}T${inputTimeStr}`;

    //  להפוך את זה לאובייקט Date
    const inputDateTime = new Date(fullDateTimeStr);

    // להשוות לתאריך/שעה נוכחיים
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

    const user = {
        Fullname: Fullname.value.trim(),
        phone: phone.value.trim(),
        fromLocation: fromLocation.value.trim(),
        toLocation: toLocation.value.trim(),
        seats: seats.value.trim(),
        date: date.value.trim(),
        time: time.value.trim(),
    };

    sessionStorage.setItem("lastPassenger", JSON.stringify(user));
    console.log("המשתמש נשמר ב-sessionStorage:", user);

    const Seats = user.seats.match(/\d+/);
    let matchDrivers = [];
    driversFullData.forEach(driver => {

        //ביטוי רגולרי
        const normalizedDriverDate = driver.date.replace(/\//g, '-');
        //בדיקה האם העיר יציאה והיעד שווה ואם התאריך ומספר המקומות מתאים
        if (
            user.fromLocation === driver.fromLocation &&
            user.toLocation === driver.toLocation &&
            Seats <= driver.seats &&
            driver.date === user.date
        ) {
            driver.seats -= Seats;//עדכון מספר מקומות שנשארו
            // alert(driver.seats)
            // alert('מתאים');
            matchDrivers.push(driver);
            console.log(matchDrivers);

        }
    });
    InsertInformation(matchDrivers);

    function InsertInformation(matchDrivers) {
        if (matchDrivers.length === 0) {
            Swal.fire({
                title: '<span style="color:#4fc3f7;">אופססס 🤨</span>',
                html: '<span style="color:#4fc3f7;">לא נמצא נהג מתאים,<br>חפש נהג שונה</span>',
                confirmButtonText: 'אישור',
                confirmButtonColor: '#4fc3f7',
                background: '#ffffff',
                width: 300,
                padding: '1em',
                customClass: {
                    popup: 'swal-custom-popup'
                }
            });
        }
        else {
            const driversJson = JSON.stringify(matchDrivers);
            sessionStorage.setItem('matchedDrivers', driversJson);
            window.location.href = "../HTML/DriversCars.html";
        }
    }
}
