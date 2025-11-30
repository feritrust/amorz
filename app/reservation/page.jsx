import servicesData from "@/data/services.json"; // داده‌های خدمات

export default function ServicesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">خدمات بهشت زهرا</h1>

      <div className="space-y-6">
        {servicesData.services.map((service) => (
          <div key={service.id} className="border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold ">{service.name}</h2>
            <p className="text-gray-400 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
