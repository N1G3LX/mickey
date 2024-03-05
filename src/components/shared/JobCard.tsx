import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CalendarClock, CalendarDaysIcon, CurrencyIcon, LocateIcon } from "lucide-react"


const JobCard = () => {
  return (
    <Card className="hover:border-l-[3px] border border-slate-400 flex py-4 gap-4 hover:border-brandBlue p-3  cursor-pointer">
 <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
          J
        </div>

        
        <div className="flex flex-col space-y-5">
          <h3>Job title</h3>
          <div className="flex gap-3 items-center">
            <div className="flex gap-2 items-center font-medium">
              <CalendarClock height={18} width={18} />
              <p className="font-medium">Accounting</p>

            </div>

            <div className="flex gap-2 items-center font-medium">
              <LocateIcon />
              <p>Colorado</p>

            </div>
          </div>
          <div className="flex gap-2 items-center">
            <CalendarDaysIcon />
            <p>01/12/2023</p>
          </div>
          <div className="flex gap-2 items-center">
            <CurrencyIcon />
            <p>$10,000 - $20,000</p>
          </div>
        </div>
      <CardContent className="flex gap-3 font-medium">
       
      </CardContent>

    </Card>

  )
}

export default JobCard