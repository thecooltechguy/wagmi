import { GetProviderNetworkArgs } from '@wagmi/core'
import { providers } from 'ethers'

import { QueryFunctionArgs } from '../../types'

import { useProvider } from '../providers'
import { useQuery } from './useQuery'

export type UseChainIdArgs = {
  chainId?: number
}

export const queryKey = ({
  providerNetworkFn,
}: Partial<GetProviderNetworkArgs>) =>
  [{ entity: 'providerNetwork', providerNetworkFn }] as const

const queryFn = ({
  queryKey: [{ providerNetworkFn }],
}: QueryFunctionArgs<typeof queryKey>) => {
  if (!providerNetworkFn) {
    throw new Error("Provider's getNetwork() function is invalid")
  }
  return providerNetworkFn()
}

export function useChainId({ chainId }: UseChainIdArgs = {}) {
  const provider = useProvider({ chainId })

  if (!provider || !provider.getNetwork) {
    throw new Error('Invalid provider')
  }

  const providerNetworkFn = provider.getNetwork
  const { data } = useQuery(queryKey({ providerNetworkFn }), queryFn)
  return (data as providers.Network)?.chainId
}
