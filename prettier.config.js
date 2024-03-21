const options = {
  printWidth: 120,
  arrowParens: 'always',
  jsxSingleQuote: true,
  singleQuote: true,
  bracketSpacing: true,
  endOfLine: 'crlf',
  semi: false,
  tabWidth: 2,
  trailingComma: 'none',
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports', 'prettier-plugin-organize-imports']
}

module.exports = options
