import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "@/redux/slices/authSlice";
import api from "@/services/api";
import {
  Edit2,
  Save,
  Camera,
  X,
  User,
  Mail,
  Briefcase,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UserAvatar = ({ user, onImageChange, isEditing }) => {
  return (
    <div className="relative mx-auto w-32 h-32">
      <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
        <AvatarImage src={user.avatarUrl} />
        <AvatarFallback className="bg-primary/10 text-2xl">
          {user.username
            ?.split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      {isEditing && (
        <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer shadow-lg hover:bg-primary/90 transition-colors">
          <Camera className="h-5 w-5" />
          <input
            type="file"
            className="hidden"
            onChange={onImageChange}
            accept="image/*"
          />
        </label>
      )}
    </div>
  );
};

const ProfileForm = ({
  userProfile,
  handleProfileChange,
  isEditing,
  saveProfile,
  errors,
}) => {
  const inputClasses = "transition-all duration-200";
  const labelClasses = "text-sm font-medium text-gray-500 mb-1";

  const fields = [
    { icon: User, name: "username", label: "Nombre de usuario", type: "text" },
    { icon: Mail, name: "email", label: "Correo electrónico", type: "email" },
    { icon: Briefcase, name: "rol", label: "Rol", type: "text" },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveProfile();
      }}
      className="space-y-6 w-full"
    >
      {fields.map(({ icon: Icon, name, label, type }) => (
        <div key={name} className="space-y-1">
          <label className={labelClasses}>{label}</label>
          <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type={type}
              name={name}
              value={userProfile[name] || ""}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className={`pl-10 ${inputClasses} ${
                errors[name] ? "border-red-500" : ""
              }`}
            />
            {errors[name] && (
              <span className="text-xs text-red-500 mt-1">{errors[name]}</span>
            )}
          </div>
        </div>
      ))}
    </form>
  );
};

export default function ProfileSection() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState({});
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    rol: "",
    avatarUrl: "/api/placeholder/150/150",
    lastUpdated: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/auth/profile/");
        setUserProfile({
          ...response.data,
          avatarUrl: "/api/placeholder/150/150",
          lastUpdated: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!userProfile.username?.trim())
      newErrors.username = "El nombre de usuario es requerido";
    if (!userProfile.email?.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(userProfile.email)) {
      newErrors.email = "Correo electrónico inválido";
    }
    if (!userProfile.rol?.trim()) newErrors.rol = "El rol es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile((prev) => ({
          ...prev,
          avatarUrl: reader.result,
        }));
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const response = await api.patch(`/auth/update-profile/`, {
        username: userProfile.username,
        email: userProfile.email,
        rol: userProfile.rol,
      });

      dispatch(updateUser(response.data));
      setUserProfile((prev) => ({
        ...prev,
        lastUpdated: new Date().toISOString(),
      }));

      setIsEditing(false);
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEditing = () => {
    if (hasChanges) {
      if (
        window.confirm("¿Estás seguro de que deseas descartar los cambios?")
      ) {
        setIsEditing(false);
        setHasChanges(false);
        setErrors({});
        // Recargar los datos del perfil
        const fetchUserProfile = async () => {
          try {
            const response = await api.get("/auth/profile/");
            setUserProfile({
              ...response.data,
              avatarUrl: "/api/placeholder/150/150",
              lastUpdated: new Date().toISOString(),
            });
          } catch (error) {
            console.error("Error fetching profile:", error);
          }
        };
        fetchUserProfile();
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">
              Perfil de Usuario
            </CardTitle>
            <CardDescription>
              Gestiona tu información personal y preferencias
            </CardDescription>
          </div>
          <div className="space-x-2">
            {isEditing ? (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={cancelEditing}
                        disabled={isSaving}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cancelar edición</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button
                  variant="default"
                  size="icon"
                  onClick={saveProfile}
                  disabled={isSaving || !hasChanges}
                >
                  {isSaving ? (
                    <span className="animate-spin">
                      <Save className="h-4 w-4" />
                    </span>
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-8">
          <UserAvatar
            user={userProfile}
            onImageChange={handleImageChange}
            isEditing={isEditing}
          />

          {hasChanges && (
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertTitle>Cambios sin guardar</AlertTitle>
              <AlertDescription>
                Asegúrate de guardar los cambios antes de salir
              </AlertDescription>
            </Alert>
          )}

          <ProfileForm
            userProfile={userProfile}
            handleProfileChange={handleProfileChange}
            isEditing={isEditing}
            saveProfile={saveProfile}
            errors={errors}
          />
        </div>
      </CardContent>

      <CardFooter className="text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>
            Última actualización:{" "}
            {new Date(userProfile.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
