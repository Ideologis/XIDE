import { CartContext } from '../../components/CartProvider.jsx'

import { NavLink } from "react-router-dom";
import supabase from '../../config/supabase.Client.js'
import { useContext, useEffect, useState } from 'react'

const SignUp = () => {
  const { dispatch } = useContext(CartContext)
  const [userEmail, setUserEmail] = useState(null)

  useEffect(() => {
    // Check for existing session on component mount
    const checkUser = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()
      if (session?.user?.email) {
        setUserEmail(session.user.email)
        dispatch({ type: 'SET_USER_EMAIL', payload: session.user.email })
        // console.log('User email set:', session.user.email)
      }
    }

    checkUser()

    // Subscribe to auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email)
        dispatch({ type: 'SET_USER_EMAIL', payload: session.user.email })
        console.log('Auth state changed, new email:', session.user.email)
      } else {
        setUserEmail(null)
        dispatch({ type: 'CLEAR_USER' })
        console.log('User logged out or session ended')
      }
    })

    return () => subscription?.unsubscribe()
  }, [dispatch])

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/cart`
        }
      })

      if (error) {
        console.error('Error signing in with Google:', error)
      }
    } catch (error) {
      console.error('Error during sign up:', error)
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error)
      } else {
        setUserEmail(null)
        dispatch({ type: 'CLEAR_USER' })

        dispatch({ type: 'REMOVE_PROFILE_FROM_NAVBAR' })
        console.log('User logged out successfully')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-20 max-sm:pt-16">
        {/* Container with glass effect */}
        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-sm:p-6">
          <div className="flex flex-row items-center justify-between gap-10 max-sm:flex-col max-sm:gap-6">
            {/* Image Section */}
            <div className="flex-1 max-sm:w-full max-sm:flex max-sm:justify-center">
              <img
                src="/dl.beatsnoop 1.png"
                alt="Welcome"
                className="w-full max-w-md rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-105 max-sm:w-3/4"
              />
            </div>

            {/* Sign Up Section */}
            <div className="flex-1 flex flex-col items-center justify-center max-sm:w-full">
              {userEmail ? (
                // Logged In State
                <div className="w-full space-y-6 text-center">
                  <div className="space-y-2">
                    <div className="h-20 w-20 mx-auto bg-purple-700 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                      {userEmail[0].toUpperCase()}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      Welcome back!
                    </h1>
                    <p className="text-purple-700 font-medium">
                      {userEmail?.split("@")[0]}
                    </p>
                  </div>

                  <div className="space-y-4 w-full max-w-xs mx-auto">
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                    >
                      Log Out
                    </button>
                    <NavLink
                      to="/cart"
                      className="block w-full bg-purple-700 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                    >
                      Return To Shop
                    </NavLink>
                  </div>
                </div>
              ) : (
                // Sign Up State
                <div className="w-full max-w-sm space-y-8 text-center">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-800 max-sm:text-2xl">
                      Create an Account
                    </h1>
                    <p className="text-gray-600 max-sm:text-sm">
                      Join our community today
                    </p>
                  </div>

                  <button
                    onClick={handleGoogleSignUp}
                    className="w-full group relative bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-gray-200 transition duration-300 ease-in-out transform hover:scale-105 shadow-md flex items-center justify-center gap-3"
                  >
                    <img 
                      src="/Icon-Google.png" 
                      alt="Google" 
                      className="w-6 h-6"
                    />
                    <span className="max-sm:text-sm">
                      Continue with Google
                    </span>
                  </button>

                  <div className="pt-4">
                    <p className="text-sm text-gray-500">
                      By signing up, you agree to our{" "}
                      <a href="#" className="text-purple-700 hover:underline">
                        Terms of Service
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
