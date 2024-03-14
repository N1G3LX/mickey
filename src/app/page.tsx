'use client'
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";


export default function Home() {
  const { toast } = useToast()
  const {setIsAuthenticated } = useAuthContext()

  const router = useRouter()
  const [inputPassword, setInputPassword] = useState('')
  const [showPassword, setShowPassword] = useState<boolean>()

  const handleLogin = () => {
    if (inputPassword === '') {
      toast({
        variant: "destructive",
        title: "Enter A password",
        description: "Make sure you enter a password",
      })
      return
    }
    if (inputPassword !== 'admin123') {
      toast({
        variant: "destructive",
        title: "Incorrect Password",
        description: "Make sure the password is correct",
      })
      return
    }
    if (inputPassword === 'admin123') {
      router.push('/portal')
      setIsAuthenticated(true)
      toast({

        title: "Login successful",
        description: "You're going to be directed to portal",
      })
    }

  }
  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <h3 className="font-bold py-3 ">Welcome to Mickey token watch</h3>
      <div className="flex flex-col space-y-5 w-[90%] max-w-[750px] border px-4 md:px-8 py-10 rounded-md shadow-lg mx-auto md:w-[60%]">
        <div className="relative">
          <Input className="w-full py-6" onChange={(e) => setInputPassword(e.target.value)} type={showPassword ? 'text' : 'password'} value={inputPassword} placeholder="Enter Admin password " />
          <button onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-[30%]">
            <EyeIcon />
          </button>


        </div>

        <Button
          onClick={handleLogin}
        >
          Log in
        </Button>
      </div>
    </main>
  );
}
