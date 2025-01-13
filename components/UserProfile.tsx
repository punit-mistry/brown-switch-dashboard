import React from 'react';
import { currentUser  } from '@clerk/nextjs/server';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone,  Calendar } from 'lucide-react';
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
const UserProfile = async() => {
  const user = await currentUser() as User | null;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading user information...</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">
                {user.fullName}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-1/3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>Email</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.primaryEmailAddress?.emailAddress}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>Phone</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.primaryPhoneNumber?.phoneNumber || 'Not provided'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Created</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Account Status</h3>
              <div className="flex space-x-2">
                <Badge variant={user.id ? "secondary" : "destructive"}>
                  {user.id ? "Verified" : "Unverified"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;