
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import { API_KEY, BASE_URL, TOKEN_ADDRESS, fetcher } from "../../utils/fetcher";
import useSWR from "swr";
import TableData from "@/components/landing-page/TableData";
import TokenInfo from "@/components/landing-page/TokenInfo";

export default function Home() {
 
  return (
   <main className="flex flex-col">
    <Header />
    <TokenInfo />
    <TableData />
    
   </main>
  );
}
