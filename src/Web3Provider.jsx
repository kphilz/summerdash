import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { avalanche, avalancheFuji } from '@reown/appkit/networks'

// 1. Get projectId
const projectId = '809cd54a4116a440b4f28d282bd98563'

// 2. Set networks
const networks = [avalanche, avalancheFuji]

// 3. Create a metadata object - optional
const metadata = {
    name: 'Summer Dash',
    description: 'Escape the Glitch. Run Forever.',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://summerdash.com',
    icons: ['/favicon.png']
}

// 4. Create a AppKit instance
createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    features: {
        analytics: true // Optional - defaults to your Cloud configuration
    }
})

export function Web3Provider({ children }) {
    return children
}
