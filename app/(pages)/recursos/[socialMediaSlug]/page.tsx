import FAQ from '@/app/components/leadingPage/faq';
import Header from '@/app/components/leadingPage/header';
import Hero from '@/app/components/leadingPage/hero';
import Pricing from '@/app/components/leadingPage/pricing';
import VideoExplanation from '@/app/components/leadingPage/video-explanation';
import { getTextBySlug } from '@/app/server/get-texts-by-slug';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function LinkInBio({
    params
}: {
    params: Promise<{ socialMediaSlug: string }>
}) {

    const { socialMediaSlug } = await params;
    const texts = await getTextBySlug(socialMediaSlug);

    if (!texts) {
        return notFound();
    }

    return (
        <div className="max-w-7xl mx-auto">
            <Header />
            <Hero texts={texts} />
            <VideoExplanation />
            <Pricing />
            <FAQ />
        </div>
    );
}
