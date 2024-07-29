'use client';

import { useState } from 'react';

export function ShowPasswordToggle() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-2 dark:bg-white text-neutral-950 w-full"
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder="••••••••"
        required
      />
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          id="showPassword"
          className="mr-2"
          onChange={(e) => setShowPassword(e.target.checked)}
        />
        <label
          htmlFor="showPassword"
          className="text-sm text-neutral-950 dark:text-white"
        >
          Show Password
        </label>
      </div>
    </>
  );
}
