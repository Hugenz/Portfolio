import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function About() {
    return (
        <div className="flex flex-col md:px-32">
            <p className="uppercase text-[8px] pb-4 md:pb-20 md:text-[19px]">
                Je m'appelle Enzo, photographe passionné et étudiant en design
                graphique à Lyon.<br></br>Mon parcours dans le graphisme, l'UI
                design et la 3D m'a offert bien plus que des compétences
                créatives : il m'a appris à voir différemment. C'est en
                explorant ces disciplines que j'ai découvert ma véritable
                passion — la photographie, notamment dans les univers sportifs
                et outdoor. Aujourd'hui, je combine ces savoir-faire pour créer
                des images fortes, composées avec intention, et sublimées en
                post-production. Chaque prise de vue est pour moi une manière de
                raconter une histoire visuelle, en jouant avec la lumière, le
                rythme et l'émotion.<br></br> Déterminé, curieux et toujours en
                quête de progression, je me forme constamment pour affiner mon
                style et élargir ma polyvalence. Mon objectif ? Créer des
                projets qui me ressemblent, à la croisée du design et de
                l'image, en capturant l'intensité du réel avec un regard
                graphique.
            </p>
            <Image
                src="/images/about.webp"
                alt="About"
                width={600}
                height={384}
                className="w-full objet-cover aspect-auto shadow-lg"
            />
            <Link
                href="/files/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 text-black-400 hover:text-black-200 transition-colors pt-4 pb-6"
            >
                <span className="font-clash font-semibold uppercase md:text-[3rem]">
                    télécharge mon cv
                </span>
                <ArrowUpRight className="md:h-12 md:w-12" />
            </Link>
        </div>
    );
}
