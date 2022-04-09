import { Signer } from 'ethers/lib/ethers'

import { getMockConnector, getSigners, setupWagmiClient } from '../../../test'
import { connect } from './connect'
import { getNetwork } from './getNetwork'

describe('getNetwork', () => {
  let signer: Signer
  beforeEach(() => {
    const signers = getSigners()
    signer = signers[0]
  })

  it('not connected', async () => {
    setupWagmiClient()
    expect(getNetwork()).toMatchInlineSnapshot(`
      {
        "chain": undefined,
        "chains": [],
      }
    `)
  })

  it('connected', async () => {
    const client = setupWagmiClient()
    await connect({ connector: client.connectors[0] })
    expect(getNetwork()).toMatchInlineSnapshot(`
      {
        "chain": {
          "blockExplorers": {
            "default": {
              "name": "Etherscan",
              "url": "https://etherscan.io",
            },
            "etherscan": {
              "name": "Etherscan",
              "url": "https://etherscan.io",
            },
          },
          "id": 1,
          "name": "Ethereum",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Ether",
            "symbol": "ETH",
          },
          "rpcUrls": {
            "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
            "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
            "infura": "https://mainnet.infura.io/v3",
          },
          "unsupported": false,
        },
        "chains": [
          {
            "blockExplorers": {
              "default": {
                "name": "Etherscan",
                "url": "https://etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://etherscan.io",
              },
            },
            "id": 1,
            "name": "Ethereum",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ether",
              "symbol": "ETH",
            },
            "rpcUrls": {
              "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
              "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://mainnet.infura.io/v3",
            },
          },
          {
            "blockExplorers": {
              "default": {
                "name": "Etherscan",
                "url": "https://ropsten.etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://ropsten.etherscan.io",
              },
            },
            "id": 3,
            "name": "Ropsten",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ropsten Ether",
              "symbol": "ropETH",
            },
            "rpcUrls": {
              "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
              "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://ropsten.infura.io/v3",
            },
            "testnet": true,
          },
          {
            "blockExplorers": {
              "default": {
                "name": "Etherscan",
                "url": "https://rinkeby.etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://rinkeby.etherscan.io",
              },
            },
            "id": 4,
            "name": "Rinkeby",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Rinkeby Ether",
              "symbol": "rETH",
            },
            "rpcUrls": {
              "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
              "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://rinkeby.infura.io/v3",
            },
            "testnet": true,
          },
          {
            "blockExplorers": {
              "default": {
                "name": "Etherscan",
                "url": "https://goerli.etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://goerli.etherscan.io",
              },
            },
            "id": 5,
            "name": "Goerli",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Goerli Ether",
              "symbol": "gETH",
            },
            "rpcUrls": {
              "alchemy": "https://eth-goerli.alchemyapi.io/v2",
              "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://goerli.infura.io/v3",
            },
            "testnet": true,
          },
          {
            "blockExplorers": {
              "default": {
                "name": "Etherscan",
                "url": "https://kovan.etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://kovan.etherscan.io",
              },
            },
            "id": 42,
            "name": "Kovan",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Kovan Ether",
              "symbol": "kETH",
            },
            "rpcUrls": {
              "alchemy": "https://eth-kovan.alchemyapi.io/v2",
              "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://kovan.infura.io/v3",
            },
            "testnet": true,
          },
        ],
      }
    `)
  })

  it('unsupported chain', async () => {
    const client = setupWagmiClient({
      connectors: [
        getMockConnector({
          network: 69,
          signer,
        }),
      ],
    })
    await connect({ connector: client.connectors[0] })
    expect(getNetwork()).toMatchInlineSnapshot(`
      {
        "chain": {
          "blockExplorers": {
            "default": {
              "name": "Etherscan",
              "url": "https://kovan-optimistic.etherscan.io",
            },
            "etherscan": {
              "name": "Etherscan",
              "url": "https://kovan-optimistic.etherscan.io",
            },
          },
          "id": 69,
          "name": "Optimism Kovan",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Kovan Ether",
            "symbol": "KOR",
          },
          "rpcUrls": {
            "alchemy": "https://opt-kovan.g.alchemy.com/v2",
            "default": [
              "https://kovan.optimism.io",
            ],
            "infura": "https://optimism-kovan.infura.io/v3",
          },
          "testnet": true,
          "unsupported": true,
        },
        "chains": [
          {
            "blockExplorers": {
              "default": {
                "name": "Etherscan",
                "url": "https://etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://etherscan.io",
              },
            },
            "id": 1,
            "name": "Ethereum",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ether",
              "symbol": "ETH",
            },
            "rpcUrls": {
              "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
              "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://mainnet.infura.io/v3",
            },
          },
          {
            "blockExplorers": {
              "default": {
                "name": "Etherscan",
                "url": "https://ropsten.etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://ropsten.etherscan.io",
              },
            },
            "id": 3,
            "name": "Ropsten",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ropsten Ether",
              "symbol": "ropETH",
            },
            "rpcUrls": {
              "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
              "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://ropsten.infura.io/v3",
            },
            "testnet": true,
          },
          {
            "blockExplorers": {
              "default": {
                "name": "Etherscan",
                "url": "https://rinkeby.etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://rinkeby.etherscan.io",
              },
            },
            "id": 4,
            "name": "Rinkeby",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Rinkeby Ether",
              "symbol": "rETH",
            },
            "rpcUrls": {
              "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
              "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://rinkeby.infura.io/v3",
            },
            "testnet": true,
          },
          {
            "blockExplorers": {
              "default": {
                "name": "Etherscan",
                "url": "https://goerli.etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://goerli.etherscan.io",
              },
            },
            "id": 5,
            "name": "Goerli",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Goerli Ether",
              "symbol": "gETH",
            },
            "rpcUrls": {
              "alchemy": "https://eth-goerli.alchemyapi.io/v2",
              "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://goerli.infura.io/v3",
            },
            "testnet": true,
          },
          {
            "blockExplorers": {
              "default": {
                "name": "Etherscan",
                "url": "https://kovan.etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://kovan.etherscan.io",
              },
            },
            "id": 42,
            "name": "Kovan",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Kovan Ether",
              "symbol": "kETH",
            },
            "rpcUrls": {
              "alchemy": "https://eth-kovan.alchemyapi.io/v2",
              "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://kovan.infura.io/v3",
            },
            "testnet": true,
          },
        ],
      }
    `)
  })
})