import ProjectCard from '@/app/components/commons/project-card';
import TotalVisit from '@/app/components/commons/total-visit';
import UseCard from '@/app/components/commons/use-card/user-card';
import { auth } from '@/app/lib/auth';
import { getProfileData, getProjectesPrifile } from '@/app/server/get-profile-data';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React from 'react'
import NewProject from './new-project';
import { getDownloadUrlFromPath } from '@/app/lib/firebase';
import { increaseProfileVisits } from '@/app/actions/increase-profile-visits';
import { Metadata } from "next";
 
 export const metadata: Metadata = {
   title: "ProjectInBio - Perfil",
   description: "ProjectInBio - A plataforma de gestão de projetos em biologia.",
 };

export default async function ProfilePage({ params }: { params: Promise<{ profileId: string }>}) {
    const { profileId } = await params;

    const profileData = await getProfileData(profileId)

    if(!profileData) return notFound()

    const projects = await getProjectesPrifile(profileId)

    const session = await auth()
    const isOwner = profileData.userId === session?.user?.id

    if(!isOwner){
        await increaseProfileVisits(profileId)
    }

    if(isOwner && !session.user?.isSubscribed && !session.user?.isTrial){
        redirect(`/${profileId}/upgrade`)
    }

    return (
        <div className='relative h-screen flex p-20 overflow-hidden'>
            {session?.user?.isTrial && session.user.isSubscribed && (
                <div className='fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary'>
                    <p>Você está usando a versão trial.</p>
                    <Link href={`/${profileId}/upgrade`}>
                        <button className='text-accent-green font-bold'>Faça o upgrade agora!</button>
                    </Link>
                </div>
            )}
            <div className='w-1/2 flex justify-center h-min'>
                <UseCard profileData={profileData} isOwner={isOwner} />
            </div>
            <div className='w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto'>
                {projects.map(async (project) => (
                    <ProjectCard key={project.id} project={project} isOwner={isOwner} img={await getDownloadUrlFromPath(project.imagePath)} />
                ))}
                {isOwner && (
                    <NewProject profileId={profileId} />
                )}
            </div>
            {isOwner && (
                <div className='absolute bottom-4 right-0 left-0 w-min mx-auto'>
                    <TotalVisit totalVisit={profileData.totalVisit} showBar={true} />
                </div>
            )}
        </div>
    )
}
