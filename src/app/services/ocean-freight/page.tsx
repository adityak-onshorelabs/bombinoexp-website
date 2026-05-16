import ServiceLayout from "@/components/layout/ServiceLayout";
import oceanFreightData from "@/data/ocean-freight-content.json";

export default function OceanFreightPage() {
  return <ServiceLayout data={oceanFreightData} layoutVariant="ocean" bottomSectionVariant="ocean" />;
}
