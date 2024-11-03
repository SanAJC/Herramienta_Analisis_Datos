// src/components/dashboard/sections/ProfileSection/index.jsx
import { useState } from "react";
import { Edit2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserAvatar from "./UserAvatar";
import ProfileForm from "./ProfileForm";

export default function ProfileSection({ showNotification }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    role: "Investigador",
    bio: "Investigador apasionado por el análisis de datos y la interpretación estadística.",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    setIsEditing(false);
    showNotification("Perfil actualizado con éxito");
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Perfil de Usuario</CardTitle>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <Edit2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <UserAvatar user={userProfile} />
          <ProfileForm
            userProfile={userProfile}
            handleProfileChange={handleProfileChange}
            isEditing={isEditing}
            saveProfile={saveProfile}
          />
        </div>
      </CardContent>
    </Card>
  );
}