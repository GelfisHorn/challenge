// Nextjs
import Image from "next/image";
// Components
import Form from "@/components/Form";

export default function Home() {
	return (
		<main className={"flex items-center h-screen min-h-[65rem]"}>
			<section className="flex flex-col items-center justify-center gap-10 w-1/2 h-full bg-[#075B4D]">
				<div className="lazy-load-1">
					<Image className="mx-auto" src={"/form-image.webp"} width={440} height={440} priority={true} alt="Brand logo" />
				</div>
				<div className="flex flex-col gap-2 text-center text-zinc-100 lazy-load-2">
					<span className="text-2xl font-semibold">Erstellen Sie Ihre digitale Signatur</span>
					<p className="w-2/3 mx-auto">Füllen Sie das Formular aus und erhalten Sie Ihre <span className="text-[#f2a42d] font-medium">E-Mail-Signatur</span></p>
				</div>
			</section>
			<Form />
		</main>
	)
}