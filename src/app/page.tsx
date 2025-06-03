"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { IkFile, Project } from "@/types/imagekit";
import { useFilterStore } from "@/store/filterStore";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function HomePage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const { filter } = useFilterStore();

    // Filtrage
    const visibleProjects = filter
        ? projects.filter((p) => p.category === filter)
        : projects;

    // Ref pour le scroll à la molette (en plus de keen-slider)
    const keenRef = useRef<HTMLDivElement | null>(null);

    // Keen-slider : une seule instance !
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: "free-snap",
        renderMode: "performance",
        slides: { perView: "auto", spacing: 24 }, // spacing un peu plus large
    });

    // Scroll horizontal à la molette (desktop only)
    useEffect(() => {
        const el = keenRef.current;
        if (!el) return;
        const onWheel = (e: WheelEvent) => {
            // Empêche le scroll vertical, autorise le scroll horizontal
            if (e.deltaY !== 0) {
                el.scrollLeft += e.deltaY;
                e.preventDefault();
            }
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [visibleProjects.length]);

    // Chargement data
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError("");
                const res = await fetch("/api/list-projects");
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || "Erreur inconnue");
                }
                const response = await res.json();
                const data: IkFile[] =
                    response.files && Array.isArray(response.files)
                        ? response.files
                        : Array.isArray(response)
                        ? response
                        : [];
                const map = new Map<string, Project>();
                data.forEach((file) => {
                    let pathParts = file.filePath.split("/").filter(Boolean);
                    if (
                        pathParts.length < 4 ||
                        pathParts[0].toLowerCase() !== "portfolio"
                    )
                        return;
                    const category = pathParts[1];
                    const project = pathParts[2];
                    const key = `${category}/${project}`;
                    if (!map.has(key)) {
                        map.set(key, { category, project, cover: file });
                    }
                });
                setProjects(Array.from(map.values()));
            } catch (error) {
                setError(
                    error instanceof Error ? error.message : "Erreur inconnue"
                );
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // --- CAS PARTICULIER : une seule image, on centre avec un padding automatique ---
    const singleSlidePadding =
        visibleProjects.length === 1
            ? "md:px-[calc(50vw-120px)]" // centrer la seule image (240px/2)
            : "";

    if (error) {
        return (
            <div className="px-10 md:px-32 mt-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Erreur :</strong> {error}
                </div>
            </div>
        );
    }

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            ) : visibleProjects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    {filter
                        ? `Aucun projet trouvé pour la catégorie "${filter}"`
                        : "Aucun projet trouvé"}
                </div>
            ) : (
                <>
                    {/* --- Desktop: keen-slider horizontal, sans hacks flex --- */}
                    <div className={`hidden md:block w-full h-[340px]`}>
                        <div
                            ref={(node) => {
                                sliderRef(node); // keen-slider callback
                                keenRef.current = node; // pour molette
                            }}
                            className={`keen-slider h-full ${singleSlidePadding}`}
                            style={{
                                cursor: "grab",
                                width: "100%",
                                height: "100%",
                                // overflowX: "auto", // keen-slider s'en occupe !
                            }}
                        >
                            {visibleProjects.map((proj, idx) => (
                                <div
                                    key={idx + proj.project}
                                    className="keen-slider__slide flex flex-col items-center group cursor-pointer"
                                    style={{
                                        width: 240,
                                        minWidth: 240,
                                        maxWidth: 240,
                                        height: 320,
                                    }}
                                >
                                    <Link
                                        href={`/project/${proj.category}/${proj.project}`}
                                        className="block w-full h-full"
                                    >
                                        <div className="w-[240px] h-[320px] rounded-xl shadow-md overflow-hidden group-hover:shadow-lg transition-shadow relative">
                                            <img
                                                src={proj.cover.url}
                                                alt={proj.project}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='320'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280'%3EImage non disponible%3C/text%3E%3C/svg%3E";
                                                }}
                                            />
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end">
                                                <div className="flex items-center justify-between w-full px-4 pb-4">
                                                    <span className="text-white font-normal text-lg">
                                                        VIEW MORE
                                                    </span>
                                                    <ArrowUpRight className="text-white w-6 h-6" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* --- Mobile: vertical classique --- */}
                    <div className="flex flex-col gap-8 md:hidden">
                        {visibleProjects.map((proj) => (
                            <div
                                key={`${proj.category}-${proj.project}`}
                                className="flex flex-col items-center group cursor-pointer"
                            >
                                <div className="w-auto h-[400px] shadow-md overflow-hidden group-hover:shadow-lg transition-shadow">
                                    <img
                                        src={proj.cover.url}
                                        alt={proj.project}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='320'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280'%3EImage non disponible%3C/text%3E%3C/svg%3E";
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <span className="text-[10.5vw] md:text-[11.5vw] font-bold text-black-400 mb-[-1rem] justify-center font-clash block text-center">
                enzobeystudio*
            </span>
        </>
    );
}
