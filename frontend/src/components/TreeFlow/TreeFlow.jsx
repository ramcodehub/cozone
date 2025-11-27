import React from "react";
import "./TreeFlow.css";

const nodes = [
  { id: "parent", label: "Amenities", x: 50, y: 0, icon: "bi-grid-3x3-gap-fill" , details: "Our coworking space is packed with thoughtful amenities that make your workday smoother, easier, and more enjoyable."},

  {
    id: "c1",
    label: "High-Speed WiFi",
    icon: "bi-wifi",
    details:
      "Blazing-fast WiFi and wired internet for uninterrupted productivity and smooth video calls.",
    x: 10,
    y: 35,
  },
  {
    id: "c2",
    label: "Meeting Rooms",
    icon: "bi-people-fill",
    details:
      "Well-equipped, soundproof meeting rooms ideal for team discussions and presentations.",
    x: 50,
    y: 35,
  },
  {
    id: "c3",
    label: "Private Cabins",
    icon: "bi-door-closed-fill",
    details:
      "Secure and lockable private cabins designed for individuals and teams needing focused work.",
    x: 90,
    y: 35,
  },

  {
    id: "c4",
    label: "24/7 Access",
    icon: "bi-clock-history",
    details:
      "Work anytime with round-the-clock access including weekends and late nights.",
    x: 25,
    y: 65,
  },
  {
    id: "c5",
    label: "Printing & Scanning",
    icon: "bi-printer-fill",
    details:
      "High-quality printers and scanners available for all your documentation needs.",
    x: 75,
    y: 65,
  },

  {
    id: "c6",
    label: "Pantry & Coffee Bar",
    icon: "bi-cup-hot-fill",
    details:
      "A cozy pantry offering tea, coffee, snacks, and a relaxing space to recharge.",
    x: 10,
    y: 95,
  },
  {
    id: "c7",
    label: "Power Backup",
    icon: "bi-lightning-charge-fill",
    details:
      "Uninterrupted power supply ensures your work continues even during outages.",
    x: 50,
    y: 95,
  },
  {
    id: "c8",
    label: "Lounge Area",
    icon: "bi-sofa",
    details:
      "Comfortable lounge space for casual meetings, brainstorming, and relaxation.",
    x: 90,
    y: 95,
  },

  {
    id: "c9",
    label: "Parking Facility",
    icon: "bi-p-square-fill",
    details:
      "Safe and secure parking for both two-wheelers and four-wheelers.",
    x: 25,
    y: 125,
  },
  {
    id: "c10",
    label: "Security & CCTV",
    icon: "bi-shield-lock-fill",
    details:
      "24/7 security surveillance with CCTV monitoring for a safe working environment.",
    x: 75,
    y: 125,
  },
];

export default function TreeFlow() {
  return (
    <div className="tree-container">
      <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes
          .filter((n) => n.id !== "parent")
          .map((child) => {
           
            const startX = 50;
            const startY = 5;
            const endX = child.x;
            const endY = child.y;

            const d = `
              M ${startX},${startY}
              C ${startX},${(startY + endY) / 2}
                ${endX},${(startY + endY) / 2}
                ${endX},${endY}
            `;

            return (
              <>
              <path
                key={child.id}
                d={d}
                stroke="var(--muted-navy)"
                strokeDasharray="0.3 0.3"
                strokeWidth="0.1"
                fill="none"
              />
              <defs>
              <filter id="glow">
                <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="#5b9fff" />
              </filter>
            </defs>
            </>
            );
          })}
      </svg>

      {nodes.map((n) => (
        <div
          key={n.id}
          className="tree-node"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <i className={n.icon}></i>
          {n.label}

          <div className="popup"> {n.details}</div>
        </div>
      ))}
    </div>
  );
}