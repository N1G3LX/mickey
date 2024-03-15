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
import {BigNumber} from "bignumber.js"
import useSWR from "swr"
import { API_KEY, BASE_URL, TOKEN_ADDRESS, fetcher } from "../../../utils/fetcher"
import { Skeleton } from "../ui/skeleton"
import { useState } from "react"
import {ethers} from "ethers"
import Link from "next/link"
type Holder = {
    address: string;
    balance: number;
    share: number;
}
const TableData = () => {
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [pageSize, setPageSize] = useState(10); // Items per page
    const { data, error, isLoading } = useSWR(`${BASE_URL}/getTopTokenHolders/${TOKEN_ADDRESS}?apiKey=${API_KEY}&limit=500`, fetcher)

    
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
    function addCommasToNumberString(numberString) {
        return numberString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
const formatBalance = (balance) =>{
    const new_balance = new BigNumber(balance).toFormat()

    const formatted=   ethers.formatUnits(new_balance, 18)
    const formattedWithCommas = addCommasToNumberString(formatted);
    return formattedWithCommas;
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
    if (error) return <div className="flex flex-col space-y-3 w-[95%] py-6 mx-auto text-center text-lg font-bold">Error fetching data: {error.message}</div>;

     // Function to calculate total pages
  const totalPages = Math.ceil(data?.holders.length / pageSize) || 1;

   // Function to handle page change
   const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  // Function to jump to the last page
  const jumpToLastPage = () => {
    setCurrentPage(totalPages);
  };

   // Function to check if next button is disabled
   const isNextDisabled = currentPage === totalPages;

   const slicedData = data.holders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  ); // Slice data for current page

    return (
        <div className="w-[96%] font-sans md:w-[80%] mx-auto text-lg">
            <Table>
                <TableHeader>
                    <TableRow className=" rounded-lg font-bold text-balance md:text-lg">
                        <TableHead className="">Address</TableHead>
                        <TableHead >Balance</TableHead>
                        <TableHead>Share (%) </TableHead>
                        {/* <TableHead >Tags</TableHead> */}
                        {/* <TableHead>Notes </TableHead> */}


                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        slicedData.map((holder: Holder) => (
                            <TableRow className=" rounded-md" key={holder.address}>
                                <TableCell className="font-medium sticky break-words max-w-[200px]">
                                    <Link href={`https://ethplorer.io/address/${holder.address}`} target="_blank">
                                    
                                    {shortenAddress(holder.address)}
                                    </Link>
                                    </TableCell>
                                <TableCell className="font-bold">
                                {formatBalance(`${holder.balance}`)}
                        
                                    </TableCell>

                                <TableCell>{holder.share}</TableCell>
                               

                               


                            </TableRow>

                        ))
                    }
                </TableBody>
            </Table>

             {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          className={`disabled:opacity-50 ${
            currentPage === 1 ? "disabled" : ""
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
        </div>

        </div>
    )
}

export default TableData