// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
//refrence database
var appointmentsDB = firebase.database().ref("appointments")

document.getElementById('appoint-form').addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal('name');
  var emailid = getElementVal('emailid');
  var phone = getElementVal('phone')
  var category = getElementVal('category')
  var date = getElementVal('date')
  var message = getElementVal('message')

  saveMessages(name, emailid, phone, category, date, message);

  //enable alert
  document.querySelector('.alert').style.display = "block";

  //remove the alert
  setTimeout(() => {
    document.querySelector('.alert').style.display = "none";
  }, 3000);

  //reset the form
  document.getElementById('appoint-form').reset();

}

const saveMessages = (name, emailid, phone, category,date, message) => {
  var newAppointment = appointmentsDB.push();

  newAppointment.set({
    name : name,
    emailid : emailid,
    phone : phone,
    category : category, 
    date : date,
    message : message,
  })
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
}
