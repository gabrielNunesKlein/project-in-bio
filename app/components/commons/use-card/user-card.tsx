import { Facebook, Github, Instagram, Linkedin, Twitter, Plus } from 'lucide-react' 
import Button from '../../ui/button'
import EditSocialLinks from './edit-social-links'
import Link from 'next/link'
import { ProfileData } from '@/app/server/get-profile-data'

const defaultSocialMedia = {
    github: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  };

export default function UseCard({ profileData }: { profileData?: ProfileData }) {
    const icons = [
        Github, Instagram, Linkedin, Twitter   
    ]
    return (
        <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
            <div className="size-48 ">
                <img src="/me.webp" alt="Imagem" className="rounded-full object-cover w-full h-full" />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-bold min-w-0 overflow-hidden">André Dev</h3>
                </div>
                <p className="opacity-40">
                    "Eu faço produtos para Internet"
                </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <span className="uppercase text-sm font-medium">
                    Links
                </span>
                <div className="flex gap-3">
                    {profileData?.socialMedia?.github && (
                        <Link href={profileData.socialMedia.github} target='_blank' className='p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]'>
                            <Github />
                        </Link>
                    )}

                    {profileData?.socialMedia?.instagram && (
                        <Link href={profileData.socialMedia.instagram} target='_blank' className='p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]'>
                            <Instagram />
                        </Link>
                    )}

                    {profileData?.socialMedia?.linkedin && (
                        <Link href={profileData.socialMedia.linkedin} target='_blank' className='p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]'>
                            <Linkedin />
                        </Link>
                    )}

                    {profileData?.socialMedia?.twitter && (
                        <Link href={profileData.socialMedia.twitter} target='_blank' className='p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]'>
                            <Twitter />
                        </Link>
                    )}
                    {/* {icons.map((Icon, index) => (
                        <button key={index} className='p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]'>
                            <Icon />
                    </button>
                    ))} */}

                    <EditSocialLinks socialMedia={profileData?.socialMedia ?? defaultSocialMedia} />

                </div>
            </div>
            <div className='flex flex-col gap-3 w-full h-[172px]'>
                <div className='w-full flex flex-col items-center gap-3'>
                    <Button className='w-full'>
                        Template Saas - Compre Agora
                    </Button>
                    <button className='p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]'>
                        <Plus />
                    </button>
                </div>
            </div>
        </div>
    )
}