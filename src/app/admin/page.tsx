// app/components/DashboardServer.tsx
import { createClient } from "@/src/lib/supabase/server";


import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";
import { Product } from "@/src/lib/types";



export default async function DashboardServer() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();


    let isAdmin = false;
    if (supabase) {
        const { data: profile } = await supabase
            .from("profile")
            .select("is_admin")
            .eq("id", user?.id)
            .single();
        isAdmin = profile?.is_admin || false;
    }
    if (!isAdmin) {
        redirect("/my-account");
    }

    try {
        const products = await fetchProducts();

        return <DashboardClient products={products} />;
    } catch (error) {
        return <p>Error: {(error as Error).message}</p>;
    }



}


const fetchProducts = async (): Promise<Product[]> => {
    const supabase = await createClient();

    const { data: products, error } = await supabase.from('products').select();
    console.log(products, "here");
    if (error) {
        throw new Error(error.message);
    }

    return products;
};