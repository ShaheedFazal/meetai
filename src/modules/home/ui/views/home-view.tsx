"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

    if (!session) {
        return (
            <div className="text-2xl font-bold">
                <p>Not logged in</p>
            </div>
        );
    }
    return (
      <div className="text-2xl font-bold">
        <p>Logged in as {session.user.name}</p>
        <Button
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in");
                },
              },
            })
          }
        >
          Sign Out
        </Button>
      </div>
    );
  
}
