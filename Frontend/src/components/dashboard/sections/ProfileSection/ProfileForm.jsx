
// src/components/dashboard/sections/ProfileSection/ProfileForm.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ProfileForm({
  userProfile,
  handleProfileChange,
  isEditing,
  saveProfile,
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          value={userProfile.name}
          onChange={handleProfileChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={userProfile.email}
          onChange={handleProfileChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="role">Rol</Label>
        <Input
          id="role"
          name="role"
          value={userProfile.role}
          onChange={handleProfileChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="bio">Biografía</Label>
        <Textarea
          id="bio"
          name="bio"
          value={userProfile.bio}
          onChange={handleProfileChange}
          disabled={!isEditing}
          rows={4}
        />
      </div>
      {isEditing && (
        <Button onClick={saveProfile} className="w-full">
          Guardar Cambios
        </Button>
      )}
    </div>
  );
}