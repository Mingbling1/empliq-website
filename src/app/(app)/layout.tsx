import { AppHeader } from "@/components/AppHeader"
import { EditorialFooter } from "@/components/editorial/EditorialFooter"
import { ContributionPrompt } from "@/components/ContributionPrompt"
import { getProfileAvatar } from "@/lib/profile-server"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const avatarUrl = await getProfileAvatar()

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col overflow-x-hidden">
      <AppHeader initialAvatarUrl={avatarUrl} />
      <main className="flex-1">{children}</main>
      <EditorialFooter />
      <ContributionPrompt />
    </div>
  )
}
