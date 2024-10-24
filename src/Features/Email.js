import emailjs from '@emailjs/browser'

const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID
const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY

export const useEmailSender = () => {
  const sendEmail = async data => {
    const { userEmail } = data
    console.log(userEmail)
    if (!userEmail) {
      throw new Error('User email not provided')
    }

    const templateParams = {
      from_name: 'XIDE',
      to_name: userEmail.split('@')[0], // Use the part before @ as the name
      to_email: userEmail,
      message: `**Your purchase is just the beginning of an unforgettable journey with us! Get ready to dive deeper into the world of your new product!, Welcome to the XIDE family!  shoppers. 🌟🛍️🌟💬**`
    }

    try {
      const result = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        PUBLIC_KEY
      )
      console.log('Email sent successfully:', result.text)
      return result
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  }
  return sendEmail
}
