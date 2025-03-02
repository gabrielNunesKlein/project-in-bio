import { Facebook, Github, Instagram, Linkedin, Twitter, Plus } from 'lucide-react' 
import Button from '../../ui/button'
import EditSocialLinks from './edit-social-links'
import Link from 'next/link'
import { ProfileData } from '@/app/server/get-profile-data'
import AddCustomLink from './add-custom-link'
import { formatUrl } from '@/app/lib/utils'
import EditUserCard from './edit-user-card'
import { getDownloadUrlFromPath } from '@/app/lib/firebase'

const defaultSocialMedia = {
    github: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  };

export default async function UseCard({ profileData, isOwner }: { profileData?: ProfileData, isOwner: boolean }) {
    const icons = [
        Github, Instagram, Linkedin, Twitter   
    ]
    return (
        <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
            <div className="size-48 ">
                <img src={await getDownloadUrlFromPath(profileData!.imagePath) || "/me.webp"} alt="Imagem" className="rounded-full object-cover w-full h-full" />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-bold min-w-0 overflow-hidden">{profileData?.name}</h3>
                    {isOwner && (
                        <EditUserCard profileData={profileData} />
                    )}
                </div>
                <p className="opacity-40">
                    "{profileData?.description}"
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
                    
                    {isOwner && (
                        <EditSocialLinks socialMedia={profileData?.socialMedia ?? defaultSocialMedia} />
                    )}

                </div>
            </div>
            <div className='flex flex-col gap-3 w-full min-h-[172px]'>
                <div className='w-full flex flex-col items-center gap-3'>
                    {profileData?.link1 && (
                        <Link href={formatUrl(profileData.link1.url)} target='_blank' className='w-full'>
                            <Button className='w-full'>
                                {profileData.link1.title}
                            </Button>
                        </Link>
                    )}
                    
                    {profileData?.link2 && (
                        <Link href={formatUrl(profileData.link2.url)} target='_blank' className='w-full'>
                            <Button className='w-full'>
                                {profileData.link2.title}
                            </Button>
                        </Link>
                    )}
                    
                    {profileData?.link3 && (
                        <Link href={formatUrl(profileData.link3.url)} target='_blank' className='w-full'>
                            <Button className='w-full'>
                                {profileData.link3.title}
                            </Button>
                        </Link>
                    )}
                    {isOwner && (
                        <AddCustomLink />
                    )}
                </div>
            </div>
        </div>
    )
}