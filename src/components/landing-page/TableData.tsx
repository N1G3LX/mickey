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
    const { data, error, isLoading } = useSWR(`${BASE_URL}/getTopTokenHolders/${TOKEN_ADDRESS}?apiKey=${API_KEY}&limit=50`, fetcher)

    function formatTokenBalance(balanceString: any) {
        // 1. Convert string to number and handle potential errors
        const balance = parseFloat(balanceString);
        if (isNaN(balance)) {
            return 'Invalid balance format';
        }

        // 2. Adjust for decimals (consider rounding)
        const divisor = Math.pow(10, 18);
        const adjustedBalance = balance / divisor;

        // 3. Determine appropriate unit (billion, million, thousands, etc.)
        const suffixes = ['', 'k', 'm', 'b', 't'];
        const exponent = Math.floor(Math.log10(Math.abs(adjustedBalance)) / 3); // Find the exponent

        if (exponent < 0) {
            return adjustedBalance.toFixed(18 + 2); // Show all decimals for small numbers
        }

        const adjustedNumber = adjustedBalance / Math.pow(10, exponent * 3);
        const suffix = suffixes[exponent - 1];

        return adjustedNumber.toFixed(1) + suffix; // Round to 1 decimal place
    }


    function shortenAddress(address, maxLength = 12, mobileBreakpoint = 768) {
        // Check if on mobile based on screen width (adjust breakpoint if needed)
        const isMobile = window.innerWidth <= mobileBreakpoint;

        if (isMobile && address.length > maxLength) {
            const start = address.slice(0, 3);
            const end = address.slice(-4);
            return `${start}...${end}`;
        }

        // Return full address if not mobile or address is short
        return address;
    }
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
        <div className="w-[96%] md:w-[80%] mx-auto text-lg">
            <Table>
                <TableHeader>
                    <TableRow className=" rounded-lg font-bold text-balance md:text-lg">
                        <TableHead className="">Address</TableHead>
                        <TableHead >Balance</TableHead>
                        <TableHead>Share (%) </TableHead>
                        <TableHead >Tags</TableHead>
                        <TableHead>Notes </TableHead>


                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.holders.map((holder: Holder) => (
                            <TableRow className=" rounded-md" key={holder.address}>
                                <TableCell className="font-medium sticky break-words max-w-[200px]">{shortenAddress(holder.address)}</TableCell>
                                <TableCell className="font-bold">{formatTokenBalance(holder.balance)}</TableCell>

                                <TableCell>Share  {holder.share}</TableCell>
                                <TableCell className="font-medium break-words"></TableCell>

                                <TableCell>notes</TableCell>


                            </TableRow>

                        ))
                    }
                </TableBody>
            </Table>

        </div>
    )
}

export default TableData