import { CartContext } from '../../components/CartProvider.jsx'
import Navbar from '../../components/Navbar/Navbar'
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
          redirectTo: `${window.location.origin}/SignUp`
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
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-20 p-10 gap-10">
        <img
          src="/dl.beatsnoop 1.png"
          alt=""
          style={{ width: "30%", height: "30%", borderRadius: "10%" }}
        />

        <div className="sign flex flex-col items-center">
          {userEmail ? (
            <>
              <h1 className="text-2xl font-semibold mb-2">
                Welcome, {userEmail?.split("@")[0]}
              </h1>
              <p className="text-xs font-semibold mb-4">
                You are already signed in
              </p>
              <button
                className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600 bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleLogout}
              >
                Log Out
              </button>
              <NavLink
                to="/cart"
                className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600 mt-4"
              >
                Return To Shop
              </NavLink>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold mb-2">Create an Account</h1>
              <p className="text-xs font-semibold">
                sign up briskly with google
              </p>
              <button
                className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 flex justify-center mt-20 items-center gap-2 bg-gray-100 text-black px-4 py-2 rounded-md border-2 border-gray-300"
                onClick={handleGoogleSignUp}
              >
                <img src="/Icon-Google.png" alt="" />
                <span className="text-sm font-semibold">
                  Sign up with Google
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SignUp
