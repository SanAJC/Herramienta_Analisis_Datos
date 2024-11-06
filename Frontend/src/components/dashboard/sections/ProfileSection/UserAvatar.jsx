// src/components/dashboard/sections/ProfileSection/UserAvatar.jsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({ user }) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="w-20 h-20">
        <AvatarImage
          src="/placeholder.svg?height=80&width=80"
          alt={user.name}
        />
        <AvatarFallback>
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-2xl font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.role}</p>
      </div>
    </div>
  );
}