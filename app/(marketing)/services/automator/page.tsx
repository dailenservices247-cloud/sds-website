import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { getService } from "@/lib/content/services";

const service = getService("automator");

export const metadata: Metadata = {
  title: `${service.name} · ${service.tagline}`,
  description: service.shortDescription,
};

export default function AutomatorPage() {
  return <ServiceDetail service={service} />;
}
