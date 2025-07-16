import dynamic from "next/dynamic"

// Remove all the direct imports and useState/useEffect since this will be server-side
const EcoReportPlatformClient = dynamic(() => import("./eco-report-platform-client"), { ssr: false })

export default function EcoReportPlatform() {
  return <EcoReportPlatformClient />
}
