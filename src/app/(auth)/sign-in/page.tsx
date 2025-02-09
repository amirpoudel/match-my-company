import React, { useEffect, useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from 'next/link'
import {useDebounceValue} from 'usehooks-ts'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function page() {
  const [username,setUsername] = useState('')
  const [usernameMessage,setUsernameMessage]=useState('')
  const [isCheckingUsername,setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debouncedUsername = useDebounceValue(username,3000)
  const {toast} = useToast()
  const router = useRouter()

  //zod implementation
  const form = useForm({
    resolver: zodResolver(z.object({
      username: z.string().min(1, {
        message: "Username is required"
      }),
      password: z.string().min(1, {
        message: "Password is required"
      })
    }))
  })

  useEffect(()=>{
    const checkUsernameUnique = async()=>{
        if(debouncedUsername){
            setIsCheckingUsername(true)
            setUsernameMessage('')
            try {
               const response =  await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
               console.log(response)
            } catch (error) {
                
            }
        }
    }
  },[debouncedUsername])

  return (
    <div>page</div>
  )
}
