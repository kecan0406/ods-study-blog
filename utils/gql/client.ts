import { TypedDocumentNode } from '@urql/core/dist/urql-core-chunk'
import { cacheExchange, createClient, fetchExchange, gql } from '@urql/next'
import { registerUrql } from '@urql/next/rsc'
import { OperationDefinitionNode } from 'graphql/language/ast'

export const gqlClient = registerUrql(() =>
  createClient({
    url: 'https://api.github.com/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => ({ headers: { Authorization: `Bearer ${process.env.GITHUB_AUTH}` } })
  })
).getClient()

export const graphql = <T>(strings: TemplateStringsArray, ...frags: TypedDocumentNode[]) => {
  const combineFragments = frags.map((frag) => frag.loc?.source.body).join('')
  const query = strings
    .map((line, i) => {
      if (!!frags[i]) {
        const definition = frags[i].definitions.at(-1) as OperationDefinitionNode
        return line + `...${definition.name!.value}`
      }
      return line
    })
    .join('')

  return gql<T>`
        ${combineFragments}
        ${query}
    `
}
