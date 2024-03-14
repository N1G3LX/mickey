'use client'
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import useSWR from "swr";
import TableData from "@/components/landing-page/TableData";
import TokenInfo from "@/components/landing-page/TokenInfo";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Portal = () => {
  const {isAuthenticated} = useAuthContext()
  const router = useRouter()
  if(isAuthenticated === false){
    return router.push('/')
  }
  return (
    <main className="flex flex-col">
    <Header />
    <TokenInfo />
    <TableData />
    
   </main>
  )
}

export default Portal