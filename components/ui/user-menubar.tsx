// user can check profile and logout

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { redis } from "@/lib/redis";

  
const UserMenubar: React.FC = () => {

    const logout =async () => {
      await redis.del('token');
       
      };
      const handleLogout=()=>{
        logout();
        window.location.href = '/';
      }
    return(
        <div>
        <DropdownMenu>
  <DropdownMenuTrigger className="mt-5">
  <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="cursor-pointer hover:underline">Profile</DropdownMenuItem>
    <DropdownMenuItem className="cursor-pointer hover:underline" onClick={handleLogout}>Logout</DropdownMenuItem>
  </DropdownMenuContent>
    </DropdownMenu>

        </div>
    )
};
export default UserMenubar;