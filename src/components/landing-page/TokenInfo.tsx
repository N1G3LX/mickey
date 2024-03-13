'use client'
import useSWR from "swr";
import { API_KEY, BASE_URL, TOKEN_ADDRESS, fetcher } from "../../../utils/fetcher";
import { Skeleton } from "@/components/ui/skeleton"


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
    <div className="w-full md:w-[80%] py-6 mx-auto flex flex-col space-y-3 border  my-6 px-4 rounded-md shadow-md">
        <div>
            <h1 className="font-bold text-xl ">Token Information</h1>
        </div>
        <div className="flex gap-4 items-center">
            <h1 className="font-bold">Token Name: </h1>
            <p>{data.name}</p>
        </div>
        <div className="flex gap-4 items-center">
            <h1 className="font-bold">Holders Count: </h1>
            <p>{data.holdersCount}</p>
        </div>
        <div className="flex gap-4 items-center">
            <h1 className="font-bold text-break">Owner: </h1>
            <p>{data.owner}</p>
        </div>
        <div className="flex gap-4 items-center">
            <h1 className="font-bold">Transfer Count: </h1>
            <p>{data.transfersCount}
</p>
        </div>
    </div>
  )
}

export default TokenInfo