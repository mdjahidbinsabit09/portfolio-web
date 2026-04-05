"use client";
import { personalData } from "@/utils/data/personal-data";
import { FaAddressCard } from "react-icons/fa";

export default function VCardButton() {
  const handleDownload = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${personalData.name}
TITLE:${personalData.designation}
TEL;TYPE=CELL:${personalData.phone}
EMAIL:${personalData.email}
ADR;TYPE=HOME:;;${personalData.address}
URL:${personalData.github}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "md-jahid-bin-sabit.vcf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-sm font-medium transition-all hover:opacity-80"
      style={{ color: 'var(--accent-blue)' }}
    >
      <FaAddressCard size={16} />
      Download vCard
    </button>
  );
}
