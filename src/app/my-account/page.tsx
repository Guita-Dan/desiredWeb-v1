
import { createClient } from "@/src/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import AccountSettings from "./accountSettings";
import { updateSession } from "@/src/lib/supabase/middleware";

import { NextRequest } from "next/server";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }


  let isAdmin = false;

  if (supabase) {
    const { data: profile } = await supabase
      .from("profile")
      .select("is_admin")
      .eq("id", user.id)
      .single();
    isAdmin = profile?.is_admin || false;
  }

  console.log(isAdmin, "here");
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-bold text-4xl mb-4">My Account</h1>

      </div>
      <div>
        <AccountSettings user={user} isAdmin={isAdmin} />
      </div>
    </div>
  );
}
