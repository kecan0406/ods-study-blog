import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="w-full border-t">
      <div className="wrapper flex min-h-64 flex-col items-center justify-around">
        <Link href="/">
          <div className="flex flex-col items-center">
            <Image
              src="/assets/images/logo.svg"
              width={36}
              height={36}
              alt="ODS Logo"
              className="mb-2"
            />
            <span className="text-lg font-semibold">ODS Study</span>
          </div>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
