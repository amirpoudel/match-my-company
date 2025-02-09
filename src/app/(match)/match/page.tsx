
"use client"

import React, { useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'

export default function Page() {
  const [username, setUsername] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [response, setResponse] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  // Zod form validation
  const form = useForm({
    resolver: zodResolver(z.object({
      username: z.string().min(1, {
        message: "Username is required"
      }),
      companyName: z.string().min(1, {
        message: "Company name is required"
      }),
    }))
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !companyName) {
      toast({ title: "Please enter both username and company name." })
      return
    }

    setIsSubmitting(true)
    setResponse('')

    try {
      // Hit API to get compatibility score
      const data = await axios.post(`/api/match`, {
        params: {
          userName: username,
          companyName
        }
      })
      console.log("Match Response: ", data.data.message)
      setResponse(data.data.message)
    
    } catch (error) {
      console.error('Error fetching compatibility:', error)
      setResponse('Oops! Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
      <div className="w-full sm:w-96 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Find Compatibility</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Your Name</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input 
              type="text" 
              id="companyName" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSubmitting ? 'Checking Compatibility...' : 'Check Compatibility'}
          </button>
        </form>
      </div>

      {response && (
        <div className="mt-8 w-full sm:w-96">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-center text-xl font-semibold">Compatibility</h3>
            <p className="mt-4 text-center text-lg">{response}</p>
          </div>
        </div>
      )}
    </div>
  )
}






// "use client"
// import React, { useState } from 'react'
// import * as z from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { useToast } from '@/hooks/use-toast'
// import axios from 'axios'

// export default function Page() {
//   const [username, setUsername] = useState('')
//   const [companyName, setCompanyName] = useState('')
//   const [response, setResponse] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const { toast } = useToast()

//   // Zod form validation
//   const form = useForm({
//     resolver: zodResolver(z.object({
//       username: z.string().min(1, {
//         message: "Username is required"
//       }),
//       companyName: z.string().min(1, {
//         message: "Company name is required"
//       }),
//     }))
//   })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!username || !companyName) {
//       toast({title:"Need User Name & Company Name Both"})
//       return
//     }

//     setIsSubmitting(true)
//     setResponse('')

//     try {
//       // Hit API to get compatibility score
//       const data = await axios.post(`/api/match`, {
//         params: {
//           userName:username,
//           companyName
//         }
//       })
//       console.log("Match Response: ",data.data.message)
//       setResponse(data.data.message)
    
//     } catch (error) {
//       console.error('Error fetching compatibility:', error)
//       setResponse('Oops! Something went wrong. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div>
//       <h1>Find Compatibility</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input 
//             type="text" 
//             id="username" 
//             value={username} 
//             onChange={(e) => setUsername(e.target.value)} 
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="companyName">Company Name</label>
//           <input 
//             type="text" 
//             id="companyName" 
//             value={companyName} 
//             onChange={(e) => setCompanyName(e.target.value)} 
//             required
//           />
//         </div>
//         <button type="submit" disabled={isSubmitting}>Check Compatibility</button>
//       </form>

//       {isSubmitting && <p>Checking compatibility...</p>}

//       {response && (
//         <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '20px' }}>
//           <h3>Compatibility Score:</h3>
//           <p>{response}</p>
//         </div>
//       )}
//     </div>
//   )
// }
