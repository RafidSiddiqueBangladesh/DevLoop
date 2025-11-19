import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { useTranslation } from "@/lib/useTranslation";

export default function HowItWorksDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const idx = Number(id ?? 0);

  const title = t("landing.steps." + idx + ".title");
  const desc = t("landing.steps." + idx + ".description");

  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c12] text-foreground">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9E77ED] to-[#6E59A5] bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-muted-foreground">{desc}</p>
        </div>

        <div className="rounded-xl bg-[#12121B] border border-[#2a2540] p-6 space-y-4">
          <h2 className="text-xl font-semibold">Detailed Guide</h2>
          <p className="text-sm text-muted-foreground">
            Follow these recommendations to get the most out of this step. We
            include practical tips, examples, and links to helpful resources.
          </p>
          <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-2">
            <li>Set up the basics and verify configuration</li>
            <li>Use our tools to track progress and results</li>
            <li>Iterate weekly for best outcomes</li>
          </ul>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6E59A5] to-[#9E77ED] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}