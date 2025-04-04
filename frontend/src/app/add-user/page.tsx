'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layouts/MainLayout';
import Image from 'next/image';

// ✅ Generate more avatars dynamically
const avatarOptions = Array.from({ length: 24 }, (_, i) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=user${i + 1}`
);

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    bio: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.avatar) {
      alert('Please select an avatar!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(errorData);
        setSuccessMessage('');
        return;
      }

      const newUser = await res.json();
      setSuccessMessage(`🎉 ${newUser.firstName} ${newUser.lastName} created successfully!`);
      setFormData({ firstName: '', lastName: '', email: '', avatar: '', bio: '' });
    } catch (error) {
      console.error('Error creating user:', error);
      setSuccessMessage('');
    }
  };

  // ❗️ Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <MainLayout>
      <main className="max-w-xl mx-auto py-10 px-5 w-full">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-center">Add New User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="border rounded px-3 py-2" />
              <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="border rounded px-3 py-2" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border rounded px-3 py-2" />
              <textarea name="bio" placeholder="Short Bio (optional)" value={formData.bio} onChange={handleChange} rows={3} className="border rounded px-3 py-2" />

              {/* Avatar picker */}
              <div className="text-center mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      {formData.avatar ? 'Change Avatar' : 'Choose Avatar'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Select an Avatar</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 max-h-[300px] overflow-y-auto px-2 py-3">
                      {avatarOptions.map((url, index) => (
                        <Image
                          key={index}
                          src={url} // Image source URL
                          alt={`Avatar ${index}`} // Image alt text
                          width={64}  // Set width of the image
                          height={64} // Set height of the image
                          className={`rounded-full border-2 cursor-pointer transition hover:scale-110 ${
                            formData.avatar === url ? 'border-blue-500' : 'border-transparent'
                          }`}
                          onClick={() => setFormData({ ...formData, avatar: url })}
                        />

                      ))}
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Selected avatar preview */}
                {formData.avatar && (
                  <div className="mt-4">
                    <Image
                      src={formData.avatar}
                      alt="Selected avatar"
                      width={80}  // Set width for the avatar image
                      height={80} // Set height for the avatar image
                      className="mx-auto rounded-full border border-gray-300"
                    />

                  </div>
                )}
              </div>

              <Button type="submit" className="w-full mt-4">
                Create User
              </Button>

              {/* ✅ Animated Success Message */}
              {successMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-green-600 text-center mt-2 text-sm"
                >
                  {successMessage}
                </motion.p>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
};

export default AddUserPage;
