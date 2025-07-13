'use client';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  async function handleAddUser() {
    const { data, error } = await supabase.from('users').insert([{ name, email }]);
    if (error) alert('Error: ' + error.message);
    else alert('User added!');
  }

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}
