  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()

  const resetPassword = document.getElementById('reset-password')

  const resetPasswordFunction = () => {
    const email = document.getElementById('emailR').value;

    auth.sendPasswordResetEmail(email)
    .then(() => {
        alert('Password reset email sent successfully!')
    })
    .catch(error => {
        console.error(error);
    })
  }

  

  //Set up our register function
  function register() {
    //get all out input fields
    uname = document.getElementById('uname').value
    usurname = document.getElementById('usurname').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    //validate input
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!')
        return
        //don`t continue running the code 
    }     
    
    // move on with auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        // declare user variable
        var user = auth.currentUser
        
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        //add this user to Firebase Database
        var database_ref = database.ref()

        //create user data
        var user_data = {
            name : uname,
            surname : usurname,
            email : email,
            last_login : dateTime
        }

        database_ref.child('users/' + user.uid).set(user_data) 


        alert('User Created!')

    })
    .catch(function(error) {
        var error_code = error.code
        var error_message = error.message

        alert(error_message)
    })
  }

  //set up our login function
  function login() {
    //get all out input
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    //validate input
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!')
        return
        //don`t continue running the code 
    }  

    auth.signInWithEmailAndPassword(email, password)
    .then(async function() {
                // declare user variable
                var user = auth.currentUser

                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;

                //add this user to Firebase Database
                var database_ref = database.ref()
        
                //create user data
                var user_data = {
                    last_login : dateTime
                }
        
                await database_ref.child('users/' + user.uid).update(user_data) ;
        
        
                alert('User Logged In!');
                window.location.replace("index.html")



    })
    .catch(function(error) {
        var error_code = error.code
        var error_message = error.message

        alert(error_message)
    })
  }




  //validate functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        //emaill is good
        return true
    } else {
        //email is not good
        return false
    }
  }


  function validate_password(password) {
    //firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
  }
