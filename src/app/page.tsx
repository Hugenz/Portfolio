"use client";

import { useEffect, useState } from "react";
import type { IkFile, Project } from "@/types/imagekit";
import { useFilterStore } from "@/store/filterStore";

const filters = [
    { label: "all", value: "" },
    { label: "photos", value: "photos" },
    { label: "motiondesign", value: "motiondesign" },
    { label: "graphisme", value: "graphisme" },
    { label: "3d", value: "3d" },
];

export default function HomePage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const { filter } = useFilterStore();

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

    const visibleProjects = filter
        ? projects.filter((p) => p.category === filter)
        : projects;

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
            {/*<div className="mb-4 text-sm text-gray-600">
                {loading
                    ? "Chargement en cours..."
                    : `${projects.length} projets trouvés${
                          filter
                              ? ` • ${visibleProjects.length} visible(s) pour "${filter}"`
                              : ""
                      }`}
            </div>
            8/}

            {/* Grille de projets */}
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
                <div className="flex flex-col md:flex-row gap-8">
                    {visibleProjects.map((proj) => (
                        <div
                            key={`${proj.category}-${proj.project}`}
                            className="flex flex-col items-center group cursor-pointer"
                        >
                            <div className="w-auto h-[400px] md:w-[240px] md:h-[320px] shadow-md overflow-hidden group-hover:shadow-lg transition-shadow">
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
                            {/*
                            <div className="mt-4 text-xl font-semibold capitalize text-center">
                                {proj.project
                                    .replace(
                                        /photos|motiondesign|graphisme|3d/gi,
                                        ""
                                    )
                                    .replace(/-/g, " ")
                                    .trim()}
                            </div>
                            <div className="text-sm text-gray-500 capitalize">
                                {proj.category}
                            </div>
                            */}
                        </div>
                    ))}
                </div>
            )}
            <span className="text-[10.5vw] md:text-[11.5vw] font-bold text-black-400 mb-[-1rem] justify-center font-clash">
                enzobeystudio*
            </span>
        </>
    );
}
