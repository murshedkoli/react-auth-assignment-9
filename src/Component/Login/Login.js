import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import './Login.css'

import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router';


const firebaseConfig = {
    apiKey: "AIzaSyDimGZ8WzneziMLXnZwLhx8eNsc2IU9ux0",
    authDomain: "react-sign-in-m.firebaseapp.com",
    projectId: "react-sign-in-m",
    storageBucket: "react-sign-in-m.appspot.com",
    messagingSenderId: "1052825215922",
    appId: "1:1052825215922:web:1b8a05d66a9d351a837aab"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        isLoggedIn: false,
        user: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: ''
    });

    const [loggedInUser, setLoggedInUser] = useContext(userContext);


    const handlBlur = (event) => {
        const newUser = { ...user };
        newUser[event.target.name] = event.target.value;
        setUser(newUser);
    }


    const handleSubmit = (e) => {

       if(user.email && user.password && user.name) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            var user = userCredential.user;
            setLoggedInUser(user);
            
            var userForUpdate = firebase.auth().currentUser;
            userForUpdate.updateProfile({
              displayName: user.name,
            }).then(function() {
              // Update successful.
            }).catch(function(error) {
              // An error happened.
            });

            const newUser = {...user};
            newUser.success = 'Create Successfully New Account';
            newUser.error = '';
            setUser(newUser);
            history.replace(from);


        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)

            const newUser = {...user};
            newUser.error = errorMessage;
            newUser.success = '';
            setUser(newUser);
            // ..
        });

    
       }


       if(user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          setLoggedInUser(user);

          const newUser = {...user};
            newUser.success = 'Successfully Logged In';
            newUser.error = '';
            setUser(newUser);
            history.replace(from);
        })
        .catch((error) => {
          var errorMessage = error.message;
         

          const newUser = {...user};
            newUser.error = errorMessage;
            newUser.success = '';
            setUser(newUser);
        });
       }

        e.preventDefault();
    }

const handSignInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {

    var user = result.user;
    setLoggedInUser(user);

    const newUser = {...user};
            newUser.success = 'Successfully Logged In';
            newUser.error = '';
            setUser(newUser);
            history.replace(from);

  }).catch((error) => {
    var errorMessage = error.message;

    const newUser = {...user};
    newUser.error = errorMessage;
    newUser.success = '';
    setUser(newUser);
    // ...
  });
}
    
    


const handleSignInWithFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();


    firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {

    var user = result.user;

    setLoggedInUser(user);

    const newUser = {...user};
            newUser.success = 'Successfully Logged In';
            newUser.error = '';
            setUser(newUser);
            history.replace(from);


  })
  .catch((error) => {
    var errorMessage = error.message;
    const newUser = {...user};
    newUser.error = errorMessage;
    newUser.success = '';
    setUser(newUser);
    // ...
  });
}

    return (
        <div style={{height:'100vh'}}>
          {
            loggedInUser.email ? <h1 style={{color:'green', textAlign:'center'}}>Weldone,{loggedInUser.displayName} {user.success}.</h1> :
            <div style={{ border: '1px solid black', width:'25%', borderRadius: '10px', padding: '20px', margin:'auto', backgroundColor:'wheat' }} >

                <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>

                    {
                        newUser ? <h2>Sign Up</h2>:<h2>Login</h2>
                    }
                    
                    <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
                    <label htmlFor="newUser"> Are You New User?</label>
                   
                    
                    <br/>
                    <br/>
                    {
                        newUser && <input type="text" onBlur={handlBlur} name="name" placeholder="Enter Your Name"  />
                    }
                    <br />
                    <br />
                    <input type="email" onBlur={handlBlur} name="email" placeholder="Enter Your Mail" required />
                    <br />
                    <br />
                    <input type="password" onBlur={handlBlur} name="password" id="" placeholder="Enter Your Password" required />
                    <br />
                    <br />
                    <input style={{ width: '100%',color:'white', backgroundColor: 'green',fontWeight: 'bold'}} type="submit" value={newUser?'Sign Up':'Login'} />
                </form>
               
                <p style={{color:'red', textAlign:'center'}}>{user.error}</p>
               
            

                <div style={{ textAlign: 'center' }}>
                    <p>Or</p>

                    <div className="loginBtn">
                        <div><img src="" alt="" /></div>
                        <button onClick={handleSignInWithFacebook}>Continue with Facebook</button>
                    </div>

                    <div className="loginBtn">
                        <div><img src="" alt="" /></div>
                        <button onClick={handSignInWithGoogle}>Continue with google</button>
                    </div>
                </div>


            </div>
          }
        </div>
    );
};

export default Login;