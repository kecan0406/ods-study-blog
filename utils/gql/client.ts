import { cacheExchange, createClient, fetchExchange } from '@urql/next'
import { registerUrql } from '@urql/next/rsc'

const gqlClient = registerUrql(() =>
  createClient({
    url: 'https://api.github.com/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => ({ headers: { Authorization: `Bearer ${process.env.GITHUB_AUTH}` } })
  })
).getClient()

export default gqlClient
