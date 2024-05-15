
    // <div className="absolute px-32 py-2 bg-gradient-to-b from-black z-10">
    //   <img
    //     className="w-48"
    //     src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
    //     alt="logo"
    //   />
    // </div>

    import { onAuthStateChanged, signOut } from "firebase/auth";
    import { useEffect } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { useNavigate } from "react-router-dom";
    import { LOGO } from "../utils/constants";
    import { auth } from "../utils/firebase";
    import { addUser, removeUser } from "../utils/userSlice";
    
    const Header = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const user = useSelector((store) => store.user);
      const handleSignOut = () => {
        signOut(auth)
          .then(() => {
            navigate("/");
          })
          .then(() => {})
          .catch((error) => {
            navigate("/error");
          });
      };
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const { uid, email, displayName, photoURL } = user;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
            navigate("/browse");
          } else {
            dispatch(removeUser());
            navigate("/");
          }
        });
    
        // Unsiubscribe when component unmounts
        return () => unsubscribe();
      }, []);
    
      return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between ">
          {/* <img
            className="w-44"
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="logo"
          /> */}
          <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
          {user && (
            <div className="flex p-2 justify-between">
              <img className="hidden md:block w-12 h-12" alt="usericon" src={user?.photoURL} />
              <button onClick={handleSignOut} className="font-bold text-white mx-2 ">
                (Sign Out)
              </button>
            </div>
          )}
        </div>
      );
    };
    export default Header;