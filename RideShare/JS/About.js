let count = 0;
let first = document.getElementById('first');
timer(count);

function timer() {
    if (count < 50) {
        count++;
        first.innerText = count.toString();
    }
    else
        first.innerText = " +K50"
}

let timerId = setInterval(timer, 80);

count = 0;
let second = document.getElementById('second');
function timer2() {
    if (count < 99) {
        count++;
        second.innerText = count.toString();
    }

    else
        second.innerText = "  99.9%"
}

let timerId2 = setInterval(timer2, 60);

document.addEventListener('DOMContentLoaded', () => {

    const testimonialsGrid = document.querySelector('.testimonials-grid'); // נאתר את המיכל פעם אחת
    const addFeedbackBtn = document.getElementById('addFeedbackBtn'); // נאתר את הכפתור פעם אחת


    // פונקציה ליצירת כרטיס משוב (גם לטעינה וגם לכרטיס חדש)
    function createAndAppendTestimonial(text, author, isNewCard = false) {
        const card = document.createElement('div');
        card.classList.add('testimonial');

        if (isNewCard) {
            // אם זה כרטיס חדש, נכיל שדות קלט וכפתור שליחה
            card.innerHTML = `
            <textarea class="testimonial-text" placeholder="כתוב את המשוב שלך כאן...">${text || ''}</textarea>
            <input type="text" class="testimonial-author" placeholder="שם, עיר" value="${author || ''}">
            <button class="submit-feedback-btn">לחץ לשליחה</button>
        `;

            // נאזין ללחיצה על הכפתור הפנימי של השליחה
            const submitBtn = card.querySelector('.submit-feedback-btn');
            const textArea = card.querySelector('.testimonial-text');
            const authorInput = card.querySelector('.testimonial-author');

            if (submitBtn && textArea || authorInput) { // וודא שהאלמנטים נמצאו בתוך הכרטיס
                submitBtn.addEventListener('click', () => {
                    const submittedText = textArea.value;
                    const submittedAuthor = authorInput.value;

                    // שמור את המשוב בלוקל סטורייג'
                    saveFeedbackToLocalStorage(submittedText, submittedAuthor);

                    // עדכן את תוכן הכרטיס כדי להציג את המשוב כטקסט קבוע
                    // זה מסיר את שדות הקלט ואת הכפתור
                    card.innerHTML = `
                    <p class="testimonial-text">"${submittedText}"</p>
                    <p class="testimonial-author">- ${submittedAuthor}</p>
                `;
                });
            }

        } else {
            // אם זה כרטיס שנטען (או קיים מראש), נציג רק את הטקסט והמחבר
            card.innerHTML = `
            <p class="testimonial-text">"${text}"</p>
            <p class="testimonial-author">- ${author}</p>
        `;
        }

        // הוסף את הכרטיס ל-DOM (לפני הכפתור הראשי אם קיים)
        if (addFeedbackBtn && testimonialsGrid) {
            testimonialsGrid.insertBefore(card, addFeedbackBtn);
        } else if (testimonialsGrid) { // אם הכפתור הראשי לא קיים, פשוט הוסף בסוף המיכל
            testimonialsGrid.appendChild(card);
        }

        return card; // חשוב להחזיר את האלמנט של הכרטיס
    }

    function createTestimonialCard(text, author, isEditable = false) {
        const card = document.createElement('div');
        card.classList.add('testimonial');
        const submitBtn = card.querySelector('.submit-feedback-btn');
        const textArea = card.querySelector('.testimonial-text');
        const authorInput = card.querySelector('.testimonial-author-input');

        submitBtn.addEventListener('click', () => {
            const newText = textArea.value;
            const newAuthor = authorInput.value;
            saveFeedbackToLocalStorage(newText, newAuthor);

            // עדכון תוכן הכרטיס להצגה קבועה (מסתיר את שדות הקלט והכפתור)
            card.innerHTML = `
                    <p class="testimonial-text">"${newText}"</p>
                    <p class="testimonial-author">- ${newAuthor}</p>
                `;
        });

        saveFeedbackToLocalStorage(submittedText, submittedAuthor);

        // עדכן את תוכן הכרטיס כדי להציג את המשוב ולמחוק את שדות הקלט והכפתור
        card.innerHTML = `
                        <p class="testimonial-text">"${submittedText}"</p>
                        <p class="testimonial-author">- ${submittedAuthor}</p>
                    `;
    };


    // פונקציה לשמירת משוב חדש בלוקל סטורייג'
    function saveFeedbackToLocalStorage(text, author) {
        const existingFeedbacks = JSON.parse(localStorage.getItem('userFeedbacks')) || [];
        existingFeedbacks.push({ text: text, author: author });
        localStorage.setItem('userFeedbacks', JSON.stringify(existingFeedbacks));
    }

    // פונקציה לטעינת משובים קיימים מהלוקל סטורייג'
    function loadExistingFeedbacks() {
        const storedFeedbacks = JSON.parse(localStorage.getItem('userFeedbacks')) || [];
        storedFeedbacks.forEach(feedback => {
            // ניצור כרטיס עבור כל משוב שמור, כרטיס שאינו ניתן לעריכה
            createAndAppendTestimonial(feedback.text, feedback.author, false);
        });
    }

    // --- קריאות ראשוניות ואירועים ---

    // 1. טען את כל המשובים השמורים כאשר הדף נטען
    loadExistingFeedbacks();

    // 2. טיפול בלחיצה על כפתור "הוסף את המשוב שלך" (ה-addFeedbackBtn)
    if (addFeedbackBtn) { // וודא שהכפתור קיים
        addFeedbackBtn.addEventListener('click', (event) => { // עדיף addEventListener
            event.preventDefault(); // מונע שליחה רגילה של הטופס

            // צור כרטיס חדש שניתן לעריכה
            createAndAppendTestimonial('', '', true);
        });
    } else {
        console.error("הכפתור '#addFeedbackBtn' לא נמצא. וודא שה-HTML תקין.");
    }
});

