import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { useTranslation } from "@/lib/useTranslation";

export default function FeatureDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const idx = Number(id ?? 0);

  const feature = t("landing.features." + idx + ".title");
  const desc = t("landing.features." + idx + ".description");

  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c12] text-foreground">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9E77ED] to-[#6E59A5] bg-clip-text text-transparent">
            {feature}
          </h1>
          <p className="text-muted-foreground">{desc}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-[#12121B] border border-[#2a2540] p-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-sm text-muted-foreground">
              Learn how this feature helps reduce waste and improve your food
              management performance with modern tools and analytics.
            </p>
          </div>
          <div className="rounded-xl bg-[#12121B] border border-[#2a2540] p-6">
            <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-2">
              <li>Actionable insights tailored to your household</li>
              <li>Easy setup and seamless integration</li>
              <li>Cost and waste reduction guidance</li>
            </ul>
          </div>
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