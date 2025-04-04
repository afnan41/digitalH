'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layouts/MainLayout';
import { Input } from '@/components/ui/input'; // Ensure Input component is available
import { Button } from '@/components/ui/button'; // Make sure Button is imported
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'; // Dialog components from Shadcn UI

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]); // Initial empty array for users
  const [searchId, setSearchId] = useState(''); // State for the search input
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Track selected user for delete
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users'); // Ensure this URL is correct
      if (!res.ok) throw new Error('Failed to fetch users');
      const allUsers = await res.json();
      setUsers(allUsers);
    } catch (err) {
      console.error('Error fetching users:', err);
      alert('Error fetching users');
    }
  };

  // Handle search logic when the user types
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
    if (e.target.value.trim() === '') {
      fetchUsers(); // Reset to show all users if search is empty
    } else {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${e.target.value}`); // Search by ID
        if (!res.ok) throw new Error('User not found');
        const user = await res.json();
        setUsers([user]); // Display only the user with the searched ID
      } catch (err) {
        console.error('User not found', err);
        setUsers([]); // Clear users if not found
      }
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!selectedUserId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${selectedUserId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('User deleted successfully');
        fetchUsers(); // Reset users to show all after deletion
      } else {
        alert('Failed to delete user');
      }
      setIsDialogOpen(false); // Close dialog after deletion
    } catch (err) {
      alert('Error deleting user');
      console.error(err);
      setIsDialogOpen(false); // Close dialog even if there's an error
    }
  };

  const funMessage = () => {
    if (users.length > 20) return '🚀 Huge user base!';
    if (users.length > 10) return '🔥 Great community!';
    return '👋 Small but mighty!';
  };

  return (
    <MainLayout>
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-semibold">All Users</h2>
        <p className="text-muted-foreground text-sm mt-1">{funMessage()}</p>

        {/* Search Input */}
        <Input
          placeholder="Search by ID"
          value={searchId}
          onChange={handleSearch} // Trigger search as the user types
          className="mt-4 mb-6"
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Card className="hover:scale-[1.03] transition-transform duration-300 text-center relative overflow-hidden">
              <CardHeader className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-20 h-20 rounded-full object-cover mb-2"
                  />
                </div>
                <CardTitle>{user.firstName} {user.lastName}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="mb-1">{user.email}</p>
                <p className="text-muted-foreground text-xs">{user.bio}</p>
                <Button
                  onClick={() => {
                    setSelectedUserId(user.id); // Set the user ID for deletion
                    setIsDialogOpen(true); // Open the confirmation dialog
                  }}
                  className="mt-4 w-full bg-red-600 text-white"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="p-4">
          <DialogHeader>
            <DialogTitle className="text-center">Are you sure you want to delete this user?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              className="w-full sm:w-[48%] bg-red-600 text-white"
              onClick={handleDelete} // Delete user
            >
              Confirm Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default UsersPage;
