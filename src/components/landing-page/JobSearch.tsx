import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { SearchIcon } from "lucide-react"

const JobSearch = () => {
    return (
        <div className="generalContainer flex flex-col space-y-5">
            <h3 className="font-semibold text-xl">Discover now 10,000+ best jobs on OneJobPortal</h3>
            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    type="text"
                    placeholder="Job Title, Positin you want"

                />

                <Select>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">All Location</SelectItem>
                        <SelectItem value="2">United Kingdom</SelectItem>
                        <SelectItem value="3">United States</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="">
                        <SelectValue placeholder="All functional " />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="4">All Functional Area</SelectItem>
                        <SelectItem value="5">Technology</SelectItem>
                        <SelectItem value="system">Architecture</SelectItem>
                    </SelectContent>
                </Select>

                <Button className="flex bg-brandBlue gap-2 items-center" >
                    <SearchIcon className="text-sm" />
                   <span> Search Job</span>
                </Button>
            </div>
        </div>
    )
}

export default JobSearch