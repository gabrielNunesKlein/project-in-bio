"use client"

import { ProjectData } from "@/app/server/get-profile-data";
import Link from "next/link";


export default function ProjectCard({
  project,
  isOwner,
  img
}: {
  project: ProjectData,
  isOwner: boolean,
  img: string | undefined
}) {

  const projectUrl = project.url
  const fomattedUrl = projectUrl.startsWith("http") ? projectUrl : `https://${projectUrl}`

  const handleClick = () => {
    console.log("CLICK")
  }

  return (
    <Link href={fomattedUrl.toString()} target="_blank" onClick={handleClick}>
      <div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
        <div className="size-24 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={img}
            alt="Projeto"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          {isOwner && (
            <span className="uppercase text-xs font-bold text-accent-green">
              {project?.totalVisits || 0} cliques
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-white font-bold">{project.name}</span>
            <span className="text-content-body text-sm">
              {project.description}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
