import ServiceLayout from "@/components/layout/ServiceLayout";
import warehousingData from "@/data/warehousing-content.json";

export default function WarehousingPage() {
  return (
    <ServiceLayout
      data={warehousingData}
      layoutVariant="warehousing"
      bottomSectionVariant="warehousing"
    />
  );
}
