import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { getService } from "@/lib/content/services";

const service = getService("security");

export const metadata: Metadata = {
  title: `${service.name} · ${service.tagline}`,
  description: service.shortDescription,
};

export default function SecurityPage() {
  return <ServiceDetail service={service} />;
}
