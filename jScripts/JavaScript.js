window.onload = function () {     // בדיקת תקינות הטופס עם הטענת הדף
    //מפעיל את הפוקנציות בטעינת הדף

    checkFormValidity(); //קורא לפונקציה של בדיקת הטופס
    updateLimitationImages(); //קורא לפונקציה לעדכון תמונות ההגבלות הדיאטטיות
    updateFoodImages();//קורא לפונקציה לעדכון תמונות המזון
};
function checkFormValidity() {
    var nameInput = document.getElementById('name').value; //מקבל את השם שהמשתמש מזין
    var workshopTypeRadios = document.getElementsByName('workshopType'); //מקבל את הבחירה של המשתמש לסוג סדנא
    var limitationTypeCheck = document.getElementsByName('dietPreference');//מקבל את הבחירה של המשתמש לסוג העדפות דיאטטיות
    var submitButton = document.getElementById('submitButton');
    var workshopSelected = 0; //מאפס את הבחירה ל-0
    var limitationSelected = 0;//מאפס את הבחירה ל-0

    //עובר על כל הבחירות של הקיימות, אם המשתמש לחץ על אחת מהן,המספר ישתנה ל1
    for (var i = 0; i < limitationTypeCheck.length; i++) { 
        if (limitationTypeCheck[i].checked) {
            limitationSelected = 1;
        }
    }


    //עובר על כל הבחירות של הקיימות, אם המשתמש לחץ על אחת מהן,המספר ישתנה ל1
    for (var i = 0; i < workshopTypeRadios.length; i++) {
        if (workshopTypeRadios[i].checked) {
            workshopSelected = 1;
        }
    }

    //בודק אם הוקלדו תווים
    if (nameInput.length == 0) {
        nameInput = 0;
        document.getElementById('numAlert').innerHTML = "";

    }
    else {
        for (var i = 0; i < nameInput.length; i++) {
            if (nameInput[i] >= '0' && nameInput[i] <= '9'){  //בודק אם התו הוא מספר
                nameInput = 0;
                document.getElementById('numAlert').innerHTML = "אין להכניס מספרים";
            }
        }
        if (nameInput != 0) { //אם לא נמצא מספר
            nameInput = 1;
            document.getElementById('numAlert').innerHTML = "";

        }
    }

    
    

    var enableButton = nameInput * workshopSelected * limitationSelected;//מכפיל בין כל שלושת הבחירות, אם יצא 1 זה אומר שהמשתמש בחר את כל הבחירות את כל הבחירות,אחרת יצא 0 ונדע שהוא לא בחר את כל הבחירות
    submitButton.disabled = !(enableButton == 1); //אם יוצא 1 ,תפעיל את כפתור , אם לא משאיר אותו לא פעיל
}

function submitForm() { //פונקציה שמראה למשתמש במה הוא בחר ונותנת לו הודעת אישור מתאימה
    var nameInput = document.getElementById('name'); //מקבלת את שם המשתמש
    var workshopInputs = document.getElementsByName('workshopType'); //מקבלת את כל אפשרויות הסדנה
    var limitationInputs = document.getElementsByName('dietPreference');//מקבלת את כל ההעדפות הדיאטטיות
    var selectedWorkshop = ''; //משתנה לשמירת הסדנה הנבחרת
    var selectedLimitations = ''; // משתנה לשמירת ההעדפות הדיאטטיות שנבחרו
    var hasLimitations = 0; // שמירת ערך הסדנה הנבחרת


    // לולאה לבדיקת הסדנה שנבחרה
    for (var i = 0; i < workshopInputs.length; i++) {
        if (workshopInputs[i].checked) { // אם כפתור רדיו נבחר
            selectedWorkshop = workshopInputs[i].value; // שמירת ערך הסדנה הנבחרת
        }
    }


    // לולאה לבדיקת ההעדפות הדיאטטיות שנבחרו
    for (var i = 0; i < limitationInputs.length; i++) { 
        if (limitationInputs[i].checked) { // אם צ'קבוקס נבחר
            if (hasLimitations) { // אם יש כבר העדפה שנבחרה, הוספת פסיק להפרדה
                selectedLimitations += ', '; //מוסיף פסיק בין לבין
            }
            selectedLimitations += limitationInputs[i].value; // הוספת הערך של ההעדפה הנבחרת
            hasLimitations = 1;  // קביעת משתנה שמציינת שיש לפחות העדפה דיאטטית אחת שנבחרה
        }
    }


    // יצירת הודעת האישור עם פרטי הבחירה
    document.getElementById('confirmationMessage').innerHTML = 'תודה, ' + nameInput.value + ', הטופס נשלח בהצלחה!<br>' +
        'הסדנא שבחרת היא: ' + selectedWorkshop + '<br>' +
        'העדפות דיאטטיות: ' + selectedLimitations;
    document.getElementById('confirmationMessage').style.display = 'block'; // הצגת הודעת האישור


    document.getElementById('name').value = ""; //מאפס את השם שהוקלד

    //מאפס את בחירת המשתמש בסוג הסדנה
    document.getElementById('bakery').checked = false;
    document.getElementById('mainDishes').checked = false;
    document.getElementById('desserts').checked = false;

    //מאפס את בחירת המשתמש בהגבלות הדיאטטיות
    document.getElementById('vegetarian').checked = false;
    document.getElementById('vegan').checked = false;
    document.getElementById('glutenFree').checked = false;
    document.getElementById('normal').checked = false;

    updateFoodImages();
    updateLimitationImages();
    submitButton.disabled = true;
 
    
}

function updateFoodImages() { //מעדכן את התמונות של האוכל
    var workshopTypeRadios = document.getElementsByName('workshopType'); //מקבל 
    var bakeryImage = document.getElementById('bakeryImage');
    var mainDishesImage = document.getElementById('mainDishesImage');
    var dessertsImage = document.getElementById('dessertsImage');

    // הסתרת כל התמונות בהתחלה
    bakeryImage.style.display = 'none';
    mainDishesImage.style.display = 'none';
    dessertsImage.style.display = 'none';


    // לולאה שעוברת על כל כפתורי הרדיו ובודקת איזה מהם נבחר
    for (var i = 0; i < workshopTypeRadios.length; i++) {
        if (workshopTypeRadios[i].checked) {
            // מציאת התמונה המתאימה לסדנה שנבחרה
            var selectedImage = document.getElementById(workshopTypeRadios[i].id + 'Image');

            // הצגת התמונה שנבחרה
            selectedImage.style.display = 'block';
            selectedImage.style.opacity = '1'; //משנה את השקיפות של התמונה
        }
    }
}

function updateLimitationImages() { //מעדכן את התמונות של ההגבלות
    var foodLimitations = document.getElementsByName('dietPreference');
    var vegetarianImage = document.getElementById('vegetarianImage');
    var veganImage = document.getElementById('veganImage');
    var glutenFreeImage = document.getElementById('glutenFreeImage');

    //משנה את השקיפות לחצי
    vegetarianImage.style.opacity = '0.5'; 
    veganImage.style.opacity = '0.5';
    glutenFreeImage.style.opacity = '0.5';

    //לא מראה את המסגרת את התמונה
    vegetarianImage.style.border = 'none';
    veganImage.style.border = 'none';
    glutenFreeImage.style.border = 'none';


    // לולאה שעוברת על כל הצ'קבוקס ובודקת איזה מהם נבחר
    for (var i = 0; i < foodLimitations.length; i++) {
        if (foodLimitations[i].checked) {
            var selectedImage = document.getElementById(foodLimitations[i].id + 'Image');
            selectedImage.style.display = 'flex'; //מציג את התמונה
            selectedImage.style.opacity = '1'; //שם את התמונה ללא שקיפות
            selectedImage.style.border = 'solid'; //מוסיף מסגרת לתמונה שנבחרה
        }
    }
}
