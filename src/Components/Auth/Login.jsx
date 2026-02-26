// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import { useNavigate, Link } from "react-router-dom";
// import toast from "react-hot-toast";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       toast.success("Login Successful 🎉");

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (error) {
//       toast.error("Invalid email or password ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center
//                   bg-gradient-to-br from-emerald-200 via-green-300 to-emerald-400
//                   relative overflow-hidden"
//     >
//       {/* Soft Background Glow */}
//       <div className="absolute w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
//       <div className="absolute w-96 h-96 bg-green-400/30 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

//       {/* Glass Card */}
//       <div
//         className="relative backdrop-blur-xl bg-white/25
//                     border border-white/40
//                     shadow-xl rounded-3xl p-10 w-96"
//       >
//         {/* 🔥 Loader Overlay */}
//         {loading && (
//           <div
//             className="absolute inset-0 bg-white/40 backdrop-blur-sm
//                     flex items-center justify-center
//                     rounded-3xl z-50"
//           >
//             <div className="flex flex-col items-center gap-3">
//               <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
//               <p className="text-emerald-900 font-medium">Logging you in...</p>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleLogin}>
//           <h2 className="text-3xl font-semibold text-emerald-900 text-center mb-8">
//             Welcome Back 👋
//           </h2>

//           {/* Email */}
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="w-full mb-4 p-3 rounded-xl
//                      bg-white/80 text-gray-700
//                      placeholder-gray-400
//                      border border-white/50
//                      focus:outline-none focus:ring-2 focus:ring-emerald-400
//                      transition"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           {/* Password */}
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full mb-6 p-3 rounded-xl
//                      bg-white/80 text-gray-700
//                      placeholder-gray-400
//                      border border-white/50
//                      focus:outline-none focus:ring-2 focus:ring-emerald-400
//                      transition"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           {/* Button */}
//           <button
//             className="w-full bg-emerald-600 text-white
//                            font-semibold p-3 rounded-xl
//                            hover:bg-emerald-700
//                            transition duration-300 shadow-md"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center mt-6 text-emerald-900">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="font-semibold underline hover:text-emerald-700 transition"
//           >
//             Signup
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

//new upated login page 26/02

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userId = userCredential.user.uid;

      toast.success("Login Successful 🎉");

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate(`/dashboard/${userId}`);
      }, 1000);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("User not found ❌");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password ❌");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format ❌");
      } else {
        toast.error("Login failed. Try again ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
                  bg-gradient-to-br from-emerald-200 via-green-300 to-emerald-400
                  relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
      <div className="absolute w-96 h-96 bg-green-400/30 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

      <div
        className="relative backdrop-blur-xl bg-white/25 
                    border border-white/40 
                    shadow-xl rounded-3xl p-10 w-96"
      >
        {/* Loader */}
        {loading && (
          <div
            className="absolute inset-0 bg-white/40 backdrop-blur-sm 
                    flex items-center justify-center 
                    rounded-3xl z-50"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-emerald-900 font-medium">Logging you in...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <h2 className="text-3xl font-semibold text-emerald-900 text-center mb-8">
            Welcome Back 👋
          </h2>

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full mb-4 p-3 rounded-xl
                     bg-white/80 text-gray-700
                     placeholder-gray-400
                     border border-white/50
                     focus:outline-none focus:ring-2 focus:ring-emerald-400
                     transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-2 p-3 rounded-xl
                     bg-white/80 text-gray-700
                     placeholder-gray-400
                     border border-white/50
                     focus:outline-none focus:ring-2 focus:ring-emerald-400
                     transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Forgot Password */}
          <div className="text-right mb-5">
            <Link
              to="/forgot-password"
              className="text-sm text-emerald-800 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white 
                       font-semibold p-3 rounded-xl
                       hover:bg-emerald-700
                       transition duration-300 shadow-md
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-emerald-900">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold underline hover:text-emerald-700 transition"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
