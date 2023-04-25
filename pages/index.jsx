// Nextjs
import Image from "next/image";
// Components
import Form from "@/components/Form";

export default function Home() {
	return (
		<main className={"flex flex-col lg:flex-row items-center gap-20 lg:gap-0 lg:bg-[#f19c1d] py-16 lg:py-0"}>
			<section className="flex flex-col items-center justify-center gap-10 lg:w-1/2 lg:h-screen lg:min-h-[45rem] px-5 sm:px-0">
				<div className="lazy-load-1">
					<Image className="mx-auto lg:w-full" src={"/form-image.webp?key=1"} width={440} height={440} priority={true} alt="Brand logo" />
				</div>
				<div className="flex flex-col gap-2 text-center lg:text-zinc-100 lazy-load-2">
					<span className="text-2xl font-semibold text-[#f19c1d] lg:text-white">Erstellen Sie Ihre digitale Signatur</span>
					<p className="w-2/3 mx-auto">Füllen Sie das Formular aus und erhalten Sie Ihre <span className="text-[#f19c1d] lg:text-[#855000] font-medium">E-Mail-Signatur.</span></p>
				</div>
			</section>
			<Form />
		</main>
	)
}