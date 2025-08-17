import { ChannelView } from "@/components/channel-view"

interface ChannelPageProps {
  params: {
    channelId: string
  }
}

export default function ChannelPage({ params }: ChannelPageProps) {
  return <ChannelView channelId={params.channelId} />
}
