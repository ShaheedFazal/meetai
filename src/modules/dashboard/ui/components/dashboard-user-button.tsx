import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import{
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDown, CreditCard, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
  
export const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  // Helper to extract initials from name
  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };
  const { data, isPending } = authClient.useSession();
  if (isPending || !data?.user) {
    return null;
  }
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        {data.user.image ? (
          <Avatar className="mr-3">
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={getInitials(data.user.name)}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="truncate text-sm w-full">{data.user.name}</p>
          <p className="truncate text-xs w-full">{data.user.email}</p>
        </div>
        <ChevronDown className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="outline"
              onClick={() => {}}
            >
              <CreditCardIcon className="size-4 text-black" />
              Billing
            </Button>
          <Button
            variant="outline"
              onClick={handleLogout}
          >
            <LogOutIcon className="size-4 text-black" />
            Logout
          </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        {data.user.image ? (
          <Avatar className="mr-3">
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={getInitials(data.user.name)}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="truncate text-sm w-full">{data.user.name}</p>
          <p className="truncate text-xs w-full">{data.user.email}</p>
        </div>
        <ChevronDown className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1 ">
            <span className="truncate font-medium">{data.user.name}</span>
            <span className="truncate text-sm font-normal text-muted-foreground">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCard className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer flex items-center justify-between"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
