import { ReactElement } from 'react'
import {
  FaCodepen,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaMastodon,
  FaNpm,
  FaReddit,
  FaTwitch,
  FaXTwitter,
  FaYoutube
} from 'react-icons/fa6'
import { getUserSocialList } from 'utils/db/querys'
import { SocialProvider } from 'utils/gql/query'

const SOCIAL_PROVIDER: { [key in SocialProvider]: (url: string) => ReactElement } = {
  TWITTER: () => <FaXTwitter className='hover:text-[#f29023]' />,
  INSTAGRAM: () => <FaInstagram className='hover:text-[#405de6]' />,
  LINKEDIN: () => <FaLinkedin className='hover:text-[#0e76a8]' />,
  FACEBOOK: () => <FaFacebook className='hover:text-[#4267B2]' />,
  MASTODON: () => <FaMastodon className='hover:text-[#6364FF]' />,
  NPM: () => <FaNpm className='hover:text-[#cb3837]' />,
  REDDIT: () => <FaReddit className='hover:text-[#ff4500]' />,
  YOUTUBE: () => <FaYoutube className='hover:text-[#ff0000]' />,
  TWITCH: () => <FaTwitch className='hover:text-[#6441a5]' />,
  GENERIC: (url) => {
    if (url.includes('codepen.io')) return <FaCodepen className='hover:text-[#0ebeff]' />
    return <FaLink />
  }
}

export default async function SocialList({ user }: { user: string }) {
  const socialList = await getUserSocialList(user)

  return (
    <ul className='flex justify-center gap-2 pt-2'>
      <li>
        <a href={`https://github.com/${user}`} target='_blank'>
          <FaGithub className='size-7 p-1 opacity-70 transition hover:opacity-100' />
        </a>
      </li>
      {socialList.map((social) => (
        <li key={social.url}>
          <a href={social.url} target='_blank' className='*:size-7 *:p-1 *:hover:opacity-100 *:opacity-70 *:transition'>
            {SOCIAL_PROVIDER[social.provider](social.url)}
          </a>
        </li>
      ))}
    </ul>
  )
}
