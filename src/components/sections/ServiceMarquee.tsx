import React from 'react';
import { Film, PenTool, Monitor, Megaphone, Compass, RotateCw, LayoutTemplate } from 'lucide-react';
import './ServiceMarquee.css';

const services = [
  { icon: LayoutTemplate, title: "ADVERTISING POSTERS", desc: "Bold and Impactful" },
  { icon: Film, title: "BRAND FILMS", desc: "Stories that Connect" },
  { icon: PenTool, title: "VISUAL IDENTITY", desc: "Brands People Remember" },
  { icon: Monitor, title: "WEB DESIGN", desc: "Built to Perform" },
  { icon: Megaphone, title: "DIGITAL MARKETING", desc: "Grow with Purpose" },
  { icon: Compass, title: "CREATIVE DIRECTION", desc: "Ideas into Impact" },
  { icon: RotateCw, title: "MOTION GRAPHICS", desc: "Bringing Ideas to Life" }
];

const ServiceMarquee: React.FC = () => {
  // 3 copies for seamless infinite loop
  const marqueeContent = [...services, ...services, ...services];

  return (
    <section className="service-marquee">
      <div className="service-marquee__track">
        {marqueeContent.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <React.Fragment key={index}>
              <div className="service-marquee__cell">
                <div className="service-marquee__icon">
                  <IconComponent strokeWidth={1.2} size={22} />
                </div>
                <div className="service-marquee__text">
                  <div className="service-marquee__title">{service.title}</div>
                  <div className="service-marquee__desc">{service.desc}</div>
                </div>
              </div>
              <span className="service-marquee__separator">◆</span>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceMarquee;
