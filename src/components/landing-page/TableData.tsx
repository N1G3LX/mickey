'use client'
export const fetchCache = 'force-no-store'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { BigNumber } from "bignumber.js"
import useSWR from "swr"
import { API_KEY, BASE_URL, TOKEN_ADDRESS, fetcher } from "../../../utils/fetcher"
import { Skeleton } from "../ui/skeleton"
import { useMemo, useState } from "react"
import { ethers } from "ethers"
import Link from "next/link"
type Holder = {
    address: string;
    balance: number;
    share: number;
}
import { DATA_ACCOUNTS } from "../../../utils/data_account"
const DECIMALS = 18;
const format = {
    decimalSeparator: '.',
    groupSeparator: '',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: '',
    fractionGroupSize: 0
}
BigNumber.config({ FORMAT: format })
const TableData = () => {
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [pageSize, setPageSize] = useState(10); // Items per page
  const {data: Wallets, isLoading: fetchWallets} = useSWR('/api/data', fetcher, {
    revalidateOnMount: true,
        refreshInterval: 5000,
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true
      
  
})
// console.log(DATA_ACCOUNTS)
    const { data, error, isLoading } = useSWR(`${BASE_URL}/getTopTokenHolders/${TOKEN_ADDRESS}?apiKey=${API_KEY}&limit=500`, fetcher)
    const mergedData = useMemo(() => {
        if(!Wallets) return
        const mergedData =Wallets?.wallets?.map(item => {
            const matchingAddress = data?.holders.find((data: any) => data.address.toLowerCase() === item.Address.toLowerCase());
            return {
                ...item,
                balance: matchingAddress ? matchingAddress.balance : "0"
            };
        });
        return mergedData;
    }, [data?.holders, Wallets]);

    
   
    function addCommasToNumberString(numberString) {
        return numberString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const formatBalance = (balance) => {
        const units = ["", "K", "M", "B", "T"]; // Units: "", Thousand, Million, Billion, Trillion
        const decimals = [0, 3, 6, 9, 12]; // Decimal places for each unit
      
        const new_balance = new BigNumber(balance).toFormat();
        const formatted = ethers.formatUnits(new_balance, 18);
        let balanceNumber = parseFloat(formatted);
        const formattedWithCommas = addCommasToNumberString(formatted);
        let unitIndex = 0;
      
        while (balanceNumber >= 1000 && unitIndex < units.length - 1) {
          balanceNumber /= 1000;
          unitIndex++;
        }
      
        // Check if balance is in the "M" range but should be displayed in "B"
        if (unitIndex === 2 && balanceNumber >= 1000) {
          balanceNumber /= 1000;
          unitIndex++;
        }
      
        const formattedWithUnit = balanceNumber.toFixed(2) + units[unitIndex];
        if(formattedWithUnit === '1000.00M'){
            return '999.99 M'
        }
        return formattedWithUnit;
    };
    
      const acc = new BigNumber('9.99999999e+26').toFormat();
      const ac = ethers.formatUnits(acc, 18);
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
    if (isLoading || fetchWallets) {
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
    if (error) return <div className="flex flex-col space-y-3 w-[95%] py-6 mx-auto text-center text-lg font-bold">Error fetching data: {error.message}</div>;

   

    return (
        <div className="w-[98%] font-sans md:w-[87%] mx-auto text-lg">
            <Table>
                <TableHeader>
                    <TableRow className=" rounded-lg font-bold text-balance md:text-lg">
                        <TableHead className="">Wallet</TableHead>
                        <TableHead>Balance </TableHead>
                        <TableHead >Address</TableHead>
                        {/* <TableHead >Tags</TableHead> */}
                        {/* <TableHead>Notes </TableHead> */}


                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        mergedData?.map((account) => (
                            <TableRow key={account.Address}>
                            
                                <TableCell className="font-semibold">
                                    {/* {formatBalance(`${account.wallet}`)} */}
                                    {account.Wallet}

                                </TableCell>
                                <TableCell className="font-semibold gap-2 flex items-center ">
                                <span >{formatBalance(`${account.balance}`)}</span> 
                                
                                <span className="md:inline-block hidden">MICKEY</span>
                        
                                    </TableCell>
                                <TableCell className="font-medium cursor-pointer text-[10px ] lg:text-sm max-w-[200px]">
                                    <Link href={`https://ethplorer.io/address/${account.Address}`} target="_blank">

                                        {shortenAddress(account.Address)}
                                    </Link>
                                </TableCell>
                                


                            </TableRow>
                        ))
                    }
                    {/* {
                        slicedData.map((holder: Holder) => (
                            <TableRow className=" rounded-md" key={holder.address}>
                                <TableCell className="font-medium sticky break-words max-w-[200px]">
                                    <Link href={`https://ethplorer.io/address/${holder.address}`} target="_blank">
                                    
                                    {shortenAddress(holder.address)}
                                    </Link>
                                    </TableCell>
                                <TableCell className="font-semibold">
                                {formatBalance(`${holder.balance}`)} MICKEY
                        
                                    </TableCell>

                                <TableCell>{holder.share}</TableCell>
                               

                               


                            </TableRow>

                        ))
                    } */}
                </TableBody>
            </Table>

            {/* Pagination controls */}
            {/* <div className="flex justify-between mt-4">
                <button
                    className={`disabled:opacity-50 ${currentPage === 1 ? "disabled" : ""
                        } px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    className={`disabled:opacity-50 ${isNextDisabled ? "disabled" : ""} px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={isNextDisabled}
                >
                    Next
                </button>

                <button
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded"
                    onClick={jumpToLastPage}
                >
                    Last
                </button>
            </div> */}

        </div>
    )
}

export default TableData