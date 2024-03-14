'use client'
import Header from "@/components/landing-page/Header";

import TableData from "@/components/landing-page/TableData";
import TokenInfo from "@/components/landing-page/TokenInfo";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Portal = () => {
  const {isAuthenticated} = useAuthContext()
  const router = useRouter()
 useEffect(() =>{
  if(isAuthenticated === false){
    return router.push('/')
  }
 })
  return (
    <main className="flex flex-col">
    <Header />
    <TokenInfo />
    <TableData />
    
   </main>
  )
}

export default Portal