'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const avatarOptions = [
  'https://api.dicebear.com/7.x/adventurer/svg?seed=cat',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=dog',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=alien',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=ghost',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=duck',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=panda',
]

export default function AddUserPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: avatarOptions[0] // Default selected avatar
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      router.push('/users')
    } else {
      alert('Failed to add user')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          required
        />
        <input
          name="bio"
          placeholder="Bio (optional)"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
        />

        <div>
          <label className="block font-medium text-sm mb-1">Choose an Avatar</label>
          <div className="flex gap-3 flex-wrap">
            {avatarOptions.map((url) => (
              <img
                key={url}
                src={url}
                alt="avatar"
                className={`w-16 h-16 rounded-full border-2 cursor-pointer transition ${
                  form.avatar === url ? 'border-blue-500 ring-2 ring-blue-400' : 'border-gray-200'
                }`}
                onClick={() => setForm({ ...form, avatar: url })}
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
  )
}
