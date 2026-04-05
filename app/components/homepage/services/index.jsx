import { servicesData } from "@/utils/data/services-data";
import { FaWordpress, FaPlug, FaCode, FaShoppingCart, FaServer, FaPaintBrush } from "react-icons/fa";
import SectionReveal from "../../helper/section-reveal";

const iconMap = {
  FaWordpress, FaPlug, FaCode, FaShoppingCart, FaServer, FaPaintBrush
};

export default function Services({ services = servicesData }) {
  return (
    <SectionReveal>
      <div id="services" className="my-12 lg:my-24 mesh-gradient-1">
        <div className="flex justify-center my-5 lg:py-8">
          <div className="flex items-center">
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, var(--accent-blue))' }}></span>
            <span className="glass-card p-2 px-5 text-xl rounded-md" style={{ color: 'var(--text-primary)' }}>
              Services
            </span>
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent-blue))' }}></span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service._id || service.id || i}
                className="glass-card p-6 rounded-xl group hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="mb-4 p-3 w-fit rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: 'rgba(0,212,255,0.1)', color: 'var(--accent-blue)' }}
                >
                  {Icon && <Icon size={28} />}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{service.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
