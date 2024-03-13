'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useSWR from "swr"
import { API_KEY, BASE_URL, TOKEN_ADDRESS, fetcher } from "../../../utils/fetcher"
import { Skeleton } from "../ui/skeleton"

type Holder = {
    address: string;
    balance: number;
    share: number;
}
const TableData = () => {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/getTopTokenHolders/${TOKEN_ADDRESS}?apiKey=${API_KEY}&limit=100`, fetcher)
   
    
    if (isLoading) {
        return (
            <div className="flex flex-col space-y-3 w-[95%] py-6 mx-auto">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        )
    }
    return (
        <div className="w-[90%] md:w-[80%] mx-auto text-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Address</TableHead>

                        <TableHead >Balance</TableHead>
                        <TableHead>Share (%) </TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                {
                        data?.holders.map((holder: Holder) => (
                            <TableRow key={holder.address}>
                                <TableCell className="font-medium">{holder.address}</TableCell>
                                <TableCell>{holder.balance}</TableCell>
                                <TableCell>{holder.share}</TableCell>

                            </TableRow>

                        ))
                    }
                </TableBody>
            </Table>

        </div>
    )
}

export default TableData