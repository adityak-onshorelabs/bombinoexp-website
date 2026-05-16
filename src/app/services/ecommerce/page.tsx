import ServiceLayout from "@/components/layout/ServiceLayout";
import ecommerceData from "../../../../services-content.json";

export default function EcommercePage() {
  return <ServiceLayout data={ecommerceData} bottomSectionVariant="ecommerce" />;
}
