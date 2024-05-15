
//     <div>
//       <Header />
//       <div className="absolute">
//         <img
//           src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
//           alt="logo"
//         />
//       </div>
//       <form onSubmit={(e)=> e.preventDefault()}className="w-4/12 absolute px-14 pt-5 pb-8 bg-black m-16 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
//         <h1 className="font-bold text-3xl py-2 my-4">
//           {isSignInForm ? "Sign In" : "Sign Up"}
//         </h1>

//         {!isSignInForm && (
//           <input 
//             type="text"
//             placeholder="Full Name"
//             className="p-4  my-2 w-full bg-gray-700 rounded-sm"
//           />
//         )}
//         <input
//         ref={email}
//           type="text"
//           placeholder="Email Address"
//           className="p-4 my-2 w-full bg-gray-700 rounded-sm"
//         />
//         <input
//         ref={password}
//           type="password"
//           placeholder="Password"
//           className="p-4 my-2 w-full bg-gray-700 rounded-sm"
//         />
        
//         <button  className="p-2 my-2 bg-red-600 hover:bg-red-700 w-full rounded-md ">
//           {isSignInForm ? "Sign In" : "Sign Up"}
//         </button>
//         <p className="py-4 cursor-pointer hover:underline" onClick={toggleSignInForm}>
//           {isSignInForm
//             ? "New to Netflix? Sign Up Now"
//             : "Already registered? Sign In Now."}
//         </p>
//       </form>
//     </div>
//   );
// };
// export default Login;
import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4",
            photoURL: USER_AVATAR,
          })
            .then(() => {
              navigate("/browse");
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="h-screen object-cover md:w-screen"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-full p-1  md:w-4/12 absolute px-14 pt-5 mt-28 pb-9 bg-black m-16 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-2 my-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700 rounded-sm"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-700 rounded-sm"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700 rounded-sm"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-2 mt-0 bg-red-600 hover:bg-red-700 w-full rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer hover:underline" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now."
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};
export default Login;