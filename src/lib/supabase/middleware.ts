import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refresh session if expired
    const user = await supabase.auth.getUser();
    // Check if the user is logged in
    if (user.error) {
      return {
        supabase,
        response: NextResponse.redirect(new URL("/sign-in", request.url)),
      };
    }

    // Fetch profile to check admin status
    const { data: profile, error } = await supabase
      .from("profile")
      .select("is_admin")
      .eq("id", user.data.user.id)
      .single();

    // Redirect non-admin users attempting to access the admin dashboard
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      !profile
    ) {
      return {
        isAdmin: false,
        supabase,
        response: NextResponse.redirect(new URL("/my-account", request.url)),
      };
    }

    // Protected route logic
    if (request.nextUrl.pathname.startsWith("/my-account") && user.error) {
      return {
        isAdmin: false,
        supabase,
        response: NextResponse.redirect(new URL("/sign-in", request.url)),
      };
    }

    if (request.nextUrl.pathname === "/" && !user.error) {
      return {
        supabase,
        response: NextResponse.redirect(new URL("/my-account", request.url)),
      };
    }

    // Return both `supabase` and `response` objects
    return { isAdmin: profile.is_admin, supabase, response };
  } catch (e) {
    console.error("Error in updateSession:", e);

    // Fallback response in case of error
    response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    return { isAdmin: false, supabase: null, response };
  }
};
