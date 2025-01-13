import UserProfile from '@/components/UserProfile';
import { currentUser } from '@clerk/nextjs/server';
interface User {
  id: string;
  emailAddress: string;
  fullName: string;
  primaryEmailAddress: {
    emailAddress: string;
  };
  primaryPhoneNumber: {
    phoneNumber: string;
  };
  createdAt: string;
  imageUrl: string;
}
export default async function ProfilePage() {
   const user =  await currentUser() as User | null;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading user information...</p>
      </div>
    );
  }
  return <UserProfile user={user} />;
}