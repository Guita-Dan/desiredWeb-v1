import { useEffect, useState } from "react";

import { createClient } from "@/src/lib/supabase/component";

import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Product } from "../lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabase = createClient();

interface AddProductProps {
    id?: string; // Optional id for updating an existing product
}

const randomNameId = `name-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export function AddProduct({ id }: AddProductProps) {

    const [productInfo, setProductInfo] = useState<Product>({
        image: null,
        name: "",
        status: "",
        price: "",
        quantity: "",
        timestamp: new Date().toISOString(),

    });


    useEffect(() => {
        if (id) {
            // Fetch product data based on id
            const fetchProduct = async () => {
                const { data, error } = await supabase
                    .from("products")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) {
                    console.error("Error fetching product:", error);
                } else if (data) {
                    setProductInfo({
                        image: data.image,
                        name: data.name,
                        status: data.status,
                        price: data.price,
                        quantity: data.quantity,
                        timestamp: data.timestamp,
                    });
                }
            };

            fetchProduct();
        }
    }, [id]);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            const file = event.target.files?.[0];
            if (file) {
                const { data, error } = await supabase.storage
                    .from("images")
                    .upload(`/public/${randomNameId}`, file, {
                        cacheControl: "3600",
                        upsert: false,
                    });
                if (error) {
                    throw error;
                }
                setProductInfo((prev) => ({
                    ...prev,
                    image: `${supabaseUrl}/storage/v1/object/public/images/${data?.path}`,
                }));
            }
        } catch (error) {
            console.error("An error occurred while uploading the file:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductInfo({ ...productInfo, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleAddProduct(productInfo);
        setProductInfo({
            image: null,
            name: "",
            status: "",
            price: "",
            quantity: "",
            timestamp: new Date().toISOString(),

        });
    };

    const handleAddProduct = async (productInfo: Product) => {
        try {
            if (id) {
                // Update the existing product
                const { error } = await supabase
                    .from("products")
                    .update(productInfo)
                    .eq("id", id); // Update based on the provided id

                if (error) {
                    console.error("Update operation failed:", error.message);
                } else {
                    console.log("Product updated successfully");
                }
            } else {
                // Add new product (previous implementation)
                const { data, error: fetchError } = await supabase
                    .from("products")
                    .select("id")
                    .order("id", { ascending: false })
                    .limit(1);

                if (fetchError) {
                    throw new Error(fetchError.message);
                }

                const nextId = data && data[0] ? (parseInt(data[0].id, 10) + 1).toString() : "1";

                const productWithId = { ...productInfo, id: nextId };

                const { error: insertError } = await supabase
                    .from("products")
                    .insert([productWithId]);

                if (insertError) {
                    console.error("Insert operation failed:", insertError.message);
                } else {
                    console.log("Product added successfully");
                }
            }
        } catch (error) {
            console.error("Error in adding or updating product:", error);
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
        >
            <div className="space-y-4 w-full">
                <div className="grid items-center gap-1.5">
                    <Label className="text-sm">Edit product image</Label>
                    <Label htmlFor="file-upload" className="w-fit cursor-pointer">
                        <img
                            className="rounded-md size-16"
                            src={productInfo.image || "/placeholder.svg"}
                            alt="Product image"
                        />
                        <Input
                            className="hidden"
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </Label>
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Product name</Label>
                    <Input
                        id="name"
                        placeholder="Product name"
                        type="text"
                        value={productInfo.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="status">Status</Label>
                    <Input
                        id="status"
                        placeholder="Status"
                        type="text"
                        value={productInfo.status}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="price">Price</Label>
                    <Input
                        id="price"
                        placeholder="Price"
                        type="number"
                        value={productInfo.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                        id="quantity"
                        placeholder="Quantity"
                        type="number"
                        value={productInfo.quantity}
                        onChange={handleChange}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </div>
        </form>
    );
}
