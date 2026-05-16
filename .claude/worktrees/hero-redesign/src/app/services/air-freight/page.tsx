import ServiceLayout from "@/components/layout/ServiceLayout";
import airFreightData from "@/data/air-freight-content.json";

export default function AirFreightPage() {
  return <ServiceLayout data={airFreightData} layoutVariant="freight" bottomSectionVariant="air" />;
}
