// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import { useNavigate, Link } from "react-router-dom";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [passwordError, setPasswordError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }

//     setLoading(true);
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       toast.success("Login Successful 🎉");

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center
//   bg-gradient-to-br from-blue-200 via-sky-100 to-blue-300"
//     >
//       {/* Glass Card */}
//       <div
//         className="relative backdrop-blur-2xl bg-white/40
//     border border-white/50
//     shadow-[0_8px_32px_rgba(31,38,135,0.15)]
//     rounded-3xl p-10 w-96"
//       >
//         {/* 🔥 Loader Overlay */}
//         {loading && (
//           <div
//             className="absolute inset-0 bg-white/40 backdrop-blur-sm
//                flex items-center justify-center
//                rounded-3xl z-50"
//           >
//             <div className="flex flex-col items-center gap-3">
//               <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>

//               <p className="text-blue-700 font-medium">
//                 Creating your account...
//               </p>

//               <span className="text-blue-500 text-sm">
//                 Please wait a moment
//               </span>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSignup}>
//           <h2 className="text-3xl font-semibold mb-8 text-center text-blue-700">
//             Create Account
//           </h2>

//           {/* Email */}
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full mb-5 p-3 rounded-xl
//           bg-white/50
//           border border-blue-200
//           placeholder-blue-400/70
//           text-blue-700
//           focus:outline-none
//           focus:ring-2 focus:ring-blue-300/60
//           transition duration-300"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           {/* Password */}
//           <input
//             type="password"
//             placeholder="Password"
//             className={`w-full mb-6 p-3 rounded-xl
//     bg-white/50
//     border ${
//       password.length > 0 && password.length < 6
//         ? "border-red-300"
//         : password.length >= 6
//           ? "border-green-300"
//           : "border-blue-200"
//     }
//     placeholder-blue-400/70
//     text-blue-700
//     focus:outline-none
//     focus:ring-2 focus:ring-blue-300/60
//     transition duration-300`}
//             value={password}
//             onChange={(e) => {
//               const value = e.target.value;
//               setPassword(value);

//               if (value.length < 6) {
//                 setPasswordError("Password must be at least 6 characters");
//               } else {
//                 setPasswordError("");
//               }
//             }}
//             required
//           />
//           {password.length > 0 && (
//             <p
//               className={`text-sm mb-4 ${
//                 passwordError ? "text-red-500" : "text-green-600"
//               }`}
//             >
//               {passwordError ? passwordError : "Password looks good ✔"}
//             </p>
//           )}

//           {/* Button */}
//           <button
//             className="w-full bg-blue-400/70
//           hover:bg-blue-500/80
//           text-white
//           py-3 rounded-xl font-semibold
//           shadow-md shadow-blue-300/40
//           transition duration-300"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="text-center mt-6 text-blue-600">
//           Already have account?{" "}
//           <Link to="/" className="text-blue-700 font-medium hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

//New Update code 26/02

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ Added this

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      toast.success("Account Created Successfully 🎉"); // ✅ Message improved

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
  bg-gradient-to-br from-blue-200 via-sky-100 to-blue-300"
    >
      <div
        className="relative backdrop-blur-2xl bg-white/40 
    border border-white/50 
    shadow-[0_8px_32px_rgba(31,38,135,0.15)]
    rounded-3xl p-10 w-96"
      >
        {loading && (
          <div
            className="absolute inset-0 bg-white/40 backdrop-blur-sm 
               flex items-center justify-center 
               rounded-3xl z-50"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>

              <p className="text-blue-700 font-medium">
                Creating your account...
              </p>

              <span className="text-blue-500 text-sm">
                Please wait a moment
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSignup}>
          <h2 className="text-3xl font-semibold mb-8 text-center text-blue-700">
            Create Account
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-5 p-3 rounded-xl 
          bg-white/50 
          border border-blue-200
          placeholder-blue-400/70 
          text-blue-700
          focus:outline-none 
          focus:ring-2 focus:ring-blue-300/60
          transition duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className={`w-full mb-6 p-3 rounded-xl 
    bg-white/50 
    border ${
      password.length > 0 && password.length < 6
        ? "border-red-300"
        : password.length >= 6
          ? "border-green-300"
          : "border-blue-200"
    }
    placeholder-blue-400/70 
    text-blue-700
    focus:outline-none 
    focus:ring-2 focus:ring-blue-300/60
    transition duration-300`}
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);

              if (value.length < 6) {
                setPasswordError("Password must be at least 6 characters");
              } else {
                setPasswordError("");
              }
            }}
            required
          />

          {password.length > 0 && (
            <p
              className={`text-sm mb-4 ${
                passwordError ? "text-red-500" : "text-green-600"
              }`}
            >
              {passwordError ? passwordError : "Password looks good ✔"}
            </p>
          )}

          <button
            className="w-full bg-blue-400/70 
          hover:bg-blue-500/80
          text-white
          py-3 rounded-xl font-semibold
          shadow-md shadow-blue-300/40
          transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-blue-600">
          Already have account?{" "}
          <Link to="/" className="text-blue-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
