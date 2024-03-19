'use client'
import useSWR from "swr";
import { API_KEY, BASE_URL, TOKEN_ADDRESS, fetcher } from "../../../utils/fetcher";
import { Skeleton } from "@/components/ui/skeleton"

import {ethers} from "ethers"

const TokenInfo = () => {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/getTokenInfo/${TOKEN_ADDRESS}?apiKey=${API_KEY}`, fetcher)
   
    if(isLoading){
        return(
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
    <div className="w-[95%] font-serif md:w-[87%] py-6 mx-auto flex flex-col space-y-3 border-slate-500 border  my-6 px-4 rounded-md shadow-lg">
        <div>
            <h1 className="font-semibold text-xl  ">Token Information</h1>
        </div>
        <div className="flex gap-3 items-center">
            <h1 className="font-semibold">Token Name: </h1>
            <p>{data.name}</p>
        </div>
        <div className="flex gap-3 items-center">
            <h1 className="font-semibold">Holders Count: </h1>
            <p>{data.holdersCount}</p>
        </div>
        <div className="flex gap-3 items-start md:items-center md:flex-row
        flex-col
        break-words">
            <h1 className="font-semibold text-break">Owner: </h1>
            <p className="break-words md:text-sm text-xs">{data.owner}</p>
        </div>
        <div className="flex gap-3 items-center">
            <h1 className="font-semibold">Total Supply: </h1>
            <p>{ethers.formatUnits(data.totalSupply, 18)} MICKEY
</p>
        </div>
    </div>
  )
}

export default TokenInfo