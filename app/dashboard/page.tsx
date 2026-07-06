import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import UploadBox from '@/components/UploadBox'
import SearchBox from '@/components/SearchBox'
import MemoryList from '@/components/MemoryList'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/')

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs text-amber-400 font-semibold tracking-widest uppercase">HiveMemorySpace</span>
            <h1 className="text-xl font-bold text-zinc-100 mt-1">Your memories</h1>
          </div>
          <form action={async () => { 'use server'; await signOut({ redirectTo: '/' }) }}>
            <button type="submit" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">
              Sign out
            </button>
          </form>
        </header>

        <div className="space-y-6">
          <UploadBox />
          <SearchBox />
          <MemoryList />
        </div>
      </div>
    </main>
  )
}



<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/6oU00lb2L6F37bIazv0RG0J" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>
