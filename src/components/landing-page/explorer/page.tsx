'use client'

import { useEffect, useState } from "react"
import { EXPLORER_DATA } from "../../../../utils/ethplorer"
import Link from "next/link"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import Header from "@/components/landing-page/Header"
import { Input } from "@/components/ui/input"
type ExploreData = {
    userTags: {
        items: {
            tagName: string;
        }[];
    };
    userAddresses: {
        items: {
            address: string;
            addressTags: string[];
            addressUserNote: string;
            isWatchingDisabled: boolean;
            watching: never[];
            watchingChannels: never[];
            createdTime: number;
            updatedTime: number;
        }[];
    };
    userInfo: {};
    userTxs: {

    };
}
const ExplorerPage = () => {
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [pageSize, setPageSize] = useState(10); // Items per page
    const [tableInfo, setTableInfo] = useState([])

    useEffect(() => setTableInfo(EXPLORER_DATA[0].userAddresses.items), [])

    const totalPages = Math.ceil(tableInfo.length / pageSize) || 1;

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const jumpToLastPage = () => {
        setCurrentPage(totalPages);
    };

    const isNextDisabled = currentPage === totalPages;

    const slicedData = tableInfo.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );
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

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            setTableInfo(data.userAddresses.items);
            setCurrentPage(1); // Reset to first page after data update
        };
        reader.readAsText(file);
    };
    return (
        <main className="flex flex-col">
            <Header />
            <div className="w-[90%] my-4 font-sans md:w-[70%] mx-auto text-lg">
                <Input type="file" className=" shadow-md  rounded-lg " onChange={handleFileUpload} accept=".json" />
            </div>
            <div className="w-[96%] pt-5 font-sans md:w-[80%] mx-auto text-lg">
                <Table>
                    <TableHeader>
                        <TableRow className=" rounded-lg font-bold text-balance md:text-lg">
                            <TableHead className="">Changed</TableHead>
                            <TableHead >Address /Txns</TableHead>
                            <TableHead>Tags/Note</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            slicedData.map((holder: any) => (
                                <TableRow className=" rounded-md" key={holder.address}>
                                    <TableCell className="font-bold">{format(holder.createdTime, 'yyyy-MM-dd')}</TableCell>

                                    <TableCell className="font-medium sticky break-words max-w-[200px]">
                                        <Link href={`https://ethplorer.io/address/${holder.address}`} target="_blank">
                                            {shortenAddress(holder.address)}
                                        </Link>
                                    </TableCell>

                                    <TableCell>{holder.addressTags[0]}</TableCell>



                                </TableRow>

                            ))
                        }
                    </TableBody>
                </Table>

                {/* Pagination controls */}
                <div className="flex justify-between mt-4">
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
                </div>

            </div>
        </main>
    )
}

export default ExplorerPage