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
