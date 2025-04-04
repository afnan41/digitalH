'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/lib/ThemeContext';
import Link from 'next/link';

const HomePage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { darkMode, toggleDarkMode } = useTheme();
  const totalUsers = users.length;
  const recentUsers = [...users].slice(-3).reverse();
  const newUserPercentage = ((recentUsers.length / totalUsers) * 100).toFixed(0);

  // Fetch users data from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const funMessage = () => {
    if (users.length > 20) return '🚀 The community is growing fast!';
    if (users.length > 10) return '🔥 Awesome! Great engagement!';
    return '👋 Welcome to our early members!';
  };

  return (
    <div className={darkMode ? 'dark bg-[#111] text-white' : 'bg-[#f9f9f9] text-black'}>
      {/* NAVBAR */}
      <nav className={`w-full border-b ${darkMode ? 'bg-[#222]' : 'bg-blue-600'} text-white px-5 py-4`}>
        <div className="flex justify-between items-center flex-wrap gap-4 navbar-links">
          <Link href="/">
            <h1 className="text-lg font-bold cursor-pointer">User Management System</h1>
          </Link>
          <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/20">Home</Button>
            </Link>
            <Link href="/add-user">
              <Button variant="ghost" className="text-white hover:bg-white/20">Add User</Button>
            </Link>
            <Link href="/users">
              <Button variant="ghost" className="text-white hover:bg-white/20">View All</Button>
            </Link>
            <div className="flex items-center gap-2 order-10">
              <span className="hidden sm:inline text-sm font-medium">Dark Mode</span>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="px-5 py-10 max-w-6xl mx-auto">
        {/* Total Users Card */}
        <motion.section
          className="max-w-sm mx-auto mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`text-4xl font-bold ${darkMode ? 'text-green-400' : 'text-blue-600'}`}>
                {totalUsers}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {newUserPercentage}% were recently added
              </p>
              <p className="text-xs mt-2">{funMessage()}</p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Recently Added Users */}
        <section>
          <h2 className="text-center text-xl font-semibold mb-6">Recently Added Users</h2>
          {loading ? (
            <p className="text-center text-lg">Loading users...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {recentUsers.map((user, i) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Card className="text-center hover:scale-[1.03] transition-transform relative overflow-hidden">
                    <CardContent className="pt-6 pb-4 flex flex-col items-center">
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-[90px] h-[90px] rounded-full object-cover mb-3"
                        />
                        {i < 3 && (
                          <Badge className="absolute bottom-0 right-0 bg-green-500 text-white text-xs">New</Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">{user.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
