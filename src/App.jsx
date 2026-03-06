import { useState, useEffect, useRef } from "react";

// ─── Brand Tokens ───
const BRAND = {
  blue: "#22B8FF",
  blueDark: "#062D4C",
  blueMid: "#0A4A7A",
  blueLight: "#E8F7FF",
  blueAccent: "#1A9FE0",
  gray: "#EDEDED",
  grayMid: "#9CA3AF",
  grayDark: "#6B7280",
  white: "#FFFFFF",
  orange: "#F97316",
  green: "#10B981",
  red: "#EF4444",
};

// ─── Icons (inline SVG) ───
const Icons = {
  home: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  clipboard: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  list: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  chart: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  search: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  bell: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  plus: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  back: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  upload: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  link: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  send: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  clock: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  filter: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  eye: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  menu: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  x: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

// ─── Case type config ───
const CASE_TYPES = {
  GAC: {
    label: "Garantías",
    short: "GAC",
    color: BRAND.orange,
    bgLight: "#FFF7ED",
    borderColor: "#FDBA74",
    assignee: "Geraldine Sarmiento",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={BRAND.orange} strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  NOC: {
    label: "Novedades de Clientes",
    short: "NOC",
    color: "#3B82F6",
    bgLight: "#EFF6FF",
    borderColor: "#93C5FD",
    assignee: "Geraldine Sarmiento",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#3B82F6" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  NVP: {
    label: "Novedades de Proveedores",
    short: "NVP",
    color: BRAND.green,
    bgLight: "#ECFDF5",
    borderColor: "#6EE7B7",
    assignee: "Pipe Ardila; Juan David Ardila",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={BRAND.green} strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
};

const NOC_MOTIVOS = [
  "Devolución por error del cliente",
  "Error de despacho",
  "Error de facturación",
  "Productos trocados",
  "Cantidades incorrectas",
  "Productos rechazados por el cliente",
];

const NVP_MOTIVOS = ["Inconsistencia en precio", "Inconsistencia en inventario"];

const ESTADOS_COLOR = {
  "Reportado por el vendedor": { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
  Reportado: { bg: "#DBEAFE", text: "#1E40AF", border: "#93C5FD" },
  "Reportada por el vendedor": { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
  Aprobada: { bg: "#D1FAE5", text: "#065F46", border: "#6EE7B7" },
  "No aprobada": { bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" },
  "Recibido en bodega": { bg: "#E0E7FF", text: "#3730A3", border: "#A5B4FC" },
  "Gestión con proveedor": { bg: "#FFF7ED", text: "#9A3412", border: "#FDBA74" },
  "Pdte por nota crédito": { bg: "#FCE7F3", text: "#9D174D", border: "#F9A8D4" },
  "Nota crédito realizada": { bg: "#D1FAE5", text: "#065F46", border: "#6EE7B7" },
  Completada: { bg: "#D1FAE5", text: "#065F46", border: "#6EE7B7" },
  "Pdte respuesta proveedor": { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
  Cerrado: { bg: "#F3F4F6", text: "#374151", border: "#D1D5DB" },
};

// ─── Sample records ───
const INITIAL_RECORDS = [];

// ─── Utilities ───
function Badge({ estado }) {
  const style = ESTADOS_COLOR[estado] || { bg: "#F3F4F6", text: "#374151", border: "#D1D5DB" };
  return (
    <span
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
        padding: "4px 12px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        letterSpacing: "0.01em",
      }}
    >
      {estado}
    </span>
  );
}

function TypeBadge({ type }) {
  const cfg = CASE_TYPES[type];
  return (
    <span
      style={{
        backgroundColor: cfg.bgLight,
        color: cfg.color,
        border: `1.5px solid ${cfg.borderColor}`,
        padding: "3px 10px",
        borderRadius: "8px",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.03em",
      }}
    >
      {cfg.short}
    </span>
  );
}

function SelectDropdown({ label, value, onChange, options, placeholder, required }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: BRAND.blueDark, marginBottom: 6 }}>
        {label} {required && <span style={{ color: BRAND.red }}>*</span>}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: `1.5px solid ${open ? BRAND.blue : "#E5E7EB"}`,
          borderRadius: 10,
          background: BRAND.white,
          fontSize: "14px",
          color: value ? BRAND.blueDark : BRAND.grayMid,
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "border-color 0.2s",
          outline: "none",
        }}
      >
        <span>{value || placeholder}</span>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: BRAND.white,
            border: `1.5px solid ${BRAND.blue}`,
            borderRadius: 10,
            boxShadow: "0 10px 40px rgba(6,45,76,0.12)",
            zIndex: 50,
            overflow: "hidden",
            animation: "fadeIn 0.15s ease",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "none",
                background: value === opt ? BRAND.blueLight : "transparent",
                color: value === opt ? BRAND.blue : BRAND.blueDark,
                fontSize: "14px",
                textAlign: "left",
                cursor: "pointer",
                fontWeight: value === opt ? 600 : 400,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (value !== opt) e.target.style.background = "#F8FAFC"; }}
              onMouseLeave={(e) => { if (value !== opt) e.target.style.background = "transparent"; }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Reusable Form Components (outside main to prevent re-mount) ───
function InputField({ label, placeholder, value, onChange, required, type = "text", half }) {
  return (
    <div style={{ flex: half ? "1 1 48%" : "1 1 100%", minWidth: half ? 200 : "100%" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: BRAND.blueDark, marginBottom: 6 }}>
        {label} {required && <span style={{ color: BRAND.red }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "1.5px solid #E5E7EB",
          borderRadius: 10,
          fontSize: "14px",
          color: BRAND.blueDark,
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = BRAND.blue;
          e.target.style.boxShadow = `0 0 0 3px ${BRAND.blue}22`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#E5E7EB";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function TextArea({ label, placeholder, value, onChange, required, rows = 4 }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: BRAND.blueDark, marginBottom: 6 }}>
        {label} {required && <span style={{ color: BRAND.red }}>*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "1.5px solid #E5E7EB",
          borderRadius: 10,
          fontSize: "14px",
          color: BRAND.blueDark,
          outline: "none",
          resize: "vertical",
          fontFamily: "inherit",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = BRAND.blue;
          e.target.style.boxShadow = `0 0 0 3px ${BRAND.blue}22`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#E5E7EB";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

// ─── Main App ───
export default function GestionCasosApp() {
  const [page, setPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [archivedRecords, setArchivedRecords] = useState([]);
  const [registrosTab, setRegistrosTab] = useState("activos");
  const [searchTerm, setSearchTerm] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [filterType, setFilterType] = useState("Todos");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [lightboxImage, setLightboxImage] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 30);
    return () => clearTimeout(t);
  }, [page]);

  const counters = {
    total: records.length + archivedRecords.length,
    active: records.length,
    archived: archivedRecords.length,
    GAC: records.filter((r) => r.type === "GAC").length,
    NOC: records.filter((r) => r.type === "NOC").length,
    NVP: records.filter((r) => r.type === "NVP").length,
    open: records.length,
  };

  function handleSubmit(type) {
    const now = new Date();
    const allRecords = [...records, ...archivedRecords];
    const id = `${type}-${String(allRecords.filter((r) => r.type === type).length + 1).padStart(3, "0")}`;
    let desc = "";
    let name = "";
    let estado = "";

    if (type === "GAC") {
      name = formData.clienteNombre || "";
      desc = `NIT: ${formData.nit || ""}\nFactura: ${formData.factura || ""}\nMotivo: ${formData.motivo || ""}\n${formData.descripcion || ""}`;
      estado = "Reportado por el vendedor";
    } else if (type === "NOC") {
      name = formData.clienteNombre || "";
      desc = `NIT: ${formData.nit || ""}\nFactura: ${formData.factura || ""}\nMotivo: ${formData.motivo || ""}\n${formData.descripcion || ""}${formData.observaciones ? "\nObs: " + formData.observaciones : ""}`;
      estado = "Reportada por el vendedor";
    } else {
      name = formData.proveedor || "";
      desc = `Factura proveedor: ${formData.factura || ""}\nMotivo: ${formData.motivo || ""}\n${formData.descripcion || ""}`;
      estado = "Reportado";
    }

    // Add evidence info to description
    const evidenceCount = formData.archivos?.length || 0;
    const driveLink = formData.driveLink || "";
    if (evidenceCount > 0 || driveLink) {
      desc += "\n--- Evidencia ---";
      if (evidenceCount > 0) {
        desc += `\nArchivos: ${formData.archivos.map((f) => f.name).join(", ")}`;
      }
      if (driveLink) {
        desc += `\nLink Drive: ${driveLink}`;
      }
    }

    const limit = new Date(now);
    limit.setDate(limit.getDate() + (type === "NVP" && formData.motivo === "Inconsistencia en inventario" ? 20 : type === "NVP" ? 5 : 7));

    const newRec = {
      id,
      type,
      name,
      description: desc,
      assignee: CASE_TYPES[type].assignee,
      estado,
      fechaLimite: limit.toISOString().split("T")[0],
      fechaInicio: now.toISOString().split("T")[0],
      fechaCreacion: now.toISOString().replace("T", " ").slice(0, 19),
      archivos: formData.archivos || [],
      driveLink: driveLink,
    };

    setRecords([newRec, ...records]);
    setFormData({});
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setPage("registros");
    }, 2000);
  }

  // ─── Sidebar ───
  const sidebarItems = [
    { id: "home", icon: Icons.home, label: "Inicio" },
    { id: "registros", icon: Icons.list, label: "Registros" },
    { id: "metricas", icon: Icons.chart, label: "Métricas" },
  ];

  function Sidebar({ mobile }) {
    const isVisible = mobile ? mobileSidebar : sidebarOpen;
    return (
      <>
        {mobile && mobileSidebar && (
          <div
            onClick={() => setMobileSidebar(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(6,45,76,0.4)",
              zIndex: 998,
              backdropFilter: "blur(2px)",
            }}
          />
        )}
        <aside
          style={{
            position: mobile ? "fixed" : "sticky",
            top: 0,
            left: 0,
            height: "100vh",
            width: isVisible ? 260 : mobile ? 0 : 72,
            background: `linear-gradient(180deg, ${BRAND.blueDark} 0%, #0A3D5C 100%)`,
            transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
            overflow: "hidden",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          {/* Logo */}
          <div style={{
            padding: isVisible ? "24px 20px 20px" : "24px 12px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            minHeight: 72,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: BRAND.blue,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.27 7.5 12 11.82 4.73 7.5 12 4.18z" />
              </svg>
            </div>
            {isVisible && (
              <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                <div style={{ color: BRAND.white, fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>Suministros</div>
                <div style={{ color: BRAND.blue, fontWeight: 600, fontSize: 13, marginTop: -2 }}>Ardila S.A.S.</div>
              </div>
            )}
          </div>

          {/* Nav items */}
          <nav style={{ padding: "16px 8px", flex: 1 }}>
            {sidebarItems.map((item) => {
              const active = page === item.id || (item.id === "home" && ["form-GAC", "form-NOC", "form-NVP"].includes(page));
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id);
                    if (mobile) setMobileSidebar(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: isVisible ? "11px 16px" : "11px 0",
                    justifyContent: isVisible ? "flex-start" : "center",
                    border: "none",
                    borderRadius: 10,
                    background: active ? "rgba(34,184,255,0.15)" : "transparent",
                    color: active ? BRAND.blue : "rgba(255,255,255,0.65)",
                    fontSize: "14px",
                    fontWeight: active ? 600 : 400,
                    cursor: "pointer",
                    marginBottom: 4,
                    transition: "all 0.2s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {active && (
                    <div style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 3,
                      height: 20,
                      borderRadius: 4,
                      background: BRAND.blue,
                    }} />
                  )}
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  {isVisible && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Collapse button (desktop) */}
          {!mobile && (
            <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  gap: 12,
                  padding: sidebarOpen ? "10px 16px" : "10px 0",
                  border: "none",
                  borderRadius: 10,
                  background: "transparent",
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                  style={{ transform: sidebarOpen ? "rotate(0)" : "rotate(180deg)", transition: "transform 0.3s" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
                {sidebarOpen && <span>Colapsar</span>}
              </button>
            </div>
          )}
        </aside>
      </>
    );
  }

  // ─── Navbar ───
  function Navbar() {
    return (
      <header style={{
        height: 64,
        background: BRAND.white,
        borderBottom: "1px solid #F0F0F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => setMobileSidebar(!mobileSidebar)}
            style={{
              display: "none",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: BRAND.blueDark,
              padding: 4,
            }}
            className="mobile-menu-btn"
          >
            {Icons.menu}
          </button>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: BRAND.blueDark, margin: 0, letterSpacing: "-0.02em" }}>
              Gestión de Casos
            </h1>
            <p style={{ fontSize: 12, color: BRAND.grayDark, margin: 0 }}>
              Plataforma de novedades y garantías
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}>
            <span style={{ position: "absolute", left: 12, color: BRAND.grayMid }}>{Icons.search}</span>
            <input
              placeholder="Buscar caso..."
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
                if (e.target.value.length > 0 && page !== "registros") {
                  setSearchTerm(e.target.value);
                  setPage("registros");
                } else {
                  setSearchTerm(e.target.value);
                }
              }}
              style={{
                padding: "8px 12px 8px 38px",
                border: "1.5px solid #E5E7EB",
                borderRadius: 10,
                fontSize: 13,
                width: 260,
                outline: "none",
                transition: "border-color 0.2s",
                color: BRAND.blueDark,
              }}
              onFocus={(e) => (e.target.style.borderColor = BRAND.blue)}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
          </div>
        </div>
      </header>
    );
  }

  // ─── Home Page ───
  function HomePage() {
    return (
      <div style={{ padding: "32px 28px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Metrics */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 40,
        }}>
          {[
            { label: "Casos Activos", value: counters.active, icon: Icons.clipboard, color: BRAND.blueDark },
            { label: "Archivados", value: counters.archived, icon: Icons.check, color: BRAND.green },
            { label: "Garantías", value: counters.GAC, icon: CASE_TYPES.GAC.icon, color: BRAND.orange },
            { label: "Novedades", value: counters.NOC + counters.NVP, icon: Icons.list, color: "#3B82F6" },
          ].map((m, i) => (
            <div key={i} style={{
              background: BRAND.white,
              borderRadius: 14,
              padding: "22px 24px",
              border: "1px solid #F0F0F0",
              boxShadow: "0 1px 3px rgba(6,45,76,0.04)",
              display: "flex",
              alignItems: "center",
              gap: 16,
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "default",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(6,45,76,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(6,45,76,0.04)";
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `${m.color}10`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: m.color,
              }}>
                {m.icon}
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: BRAND.blueDark, lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: BRAND.grayDark, marginTop: 2, fontWeight: 500 }}>{m.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Case type selector */}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: BRAND.blueDark, marginBottom: 4 }}>Reportar nuevo caso</h2>
          <p style={{ fontSize: 14, color: BRAND.grayDark, margin: 0 }}>Selecciona el tipo de novedad que deseas registrar</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
          marginBottom: 32,
        }}>
          {Object.entries(CASE_TYPES).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => { setFormData({}); setPage(`form-${key}`); }}
              style={{
                background: BRAND.white,
                border: `2px solid #F0F0F0`,
                borderRadius: 16,
                padding: "32px 24px 28px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = cfg.color;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 32px ${cfg.color}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#F0F0F0";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: cfg.bgLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {cfg.icon}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: BRAND.blueDark }}>{cfg.label}</div>
                <div style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: cfg.color,
                  marginTop: 4,
                  letterSpacing: "0.05em",
                }}>
                  {cfg.short}
                </div>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: cfg.color,
                fontSize: 13,
                fontWeight: 600,
                marginTop: 4,
              }}>
                Crear caso {Icons.arrow}
              </div>
            </button>
          ))}
        </div>

        {/* Quick access to records */}
        <button
          onClick={() => setPage("registros")}
          style={{
            width: "100%",
            padding: "16px 24px",
            background: BRAND.white,
            border: "1.5px solid #E5E7EB",
            borderRadius: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            color: BRAND.blueDark,
            fontSize: 15,
            fontWeight: 600,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = BRAND.blue;
            e.currentTarget.style.background = BRAND.blueLight;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#E5E7EB";
            e.currentTarget.style.background = BRAND.white;
          }}
        >
          {Icons.list}
          <span>Ver todos los registros</span>
          <span style={{ color: BRAND.grayMid, fontSize: 13, fontWeight: 400 }}>({counters.total})</span>
        </button>
      </div>
    );
  }

  // ─── Form Pages ───
  function FormPage({ type }) {
    const cfg = CASE_TYPES[type];
    const isGAC = type === "GAC";
    const isNOC = type === "NOC";
    const isNVP = type === "NVP";

    return (
      <div style={{ padding: "32px 28px", maxWidth: 720, margin: "0 auto" }}>
        {/* Back */}
        <button
          onClick={() => setPage("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            border: "none",
            background: "transparent",
            color: BRAND.grayDark,
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 24,
            padding: 0,
            fontWeight: 500,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.blue)}
          onMouseLeave={(e) => (e.currentTarget.style.color = BRAND.grayDark)}
        >
          {Icons.back} Volver al inicio
        </button>

        {/* Success overlay */}
        {showSuccess && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(6,45,76,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}>
            <div style={{
              background: BRAND.white,
              borderRadius: 20,
              padding: "48px 40px",
              textAlign: "center",
              boxShadow: "0 24px 64px rgba(6,45,76,0.2)",
              animation: "scaleIn 0.3s ease",
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#D1FAE5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: BRAND.green,
              }}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: BRAND.blueDark, margin: "0 0 8px" }}>
                Caso registrado exitosamente
              </h3>
              <p style={{ fontSize: 14, color: BRAND.grayDark, margin: 0 }}>
                Redirigiendo a registros...
              </p>
            </div>
          </div>
        )}

        {/* Form card */}
        <div style={{
          background: BRAND.white,
          borderRadius: 18,
          border: "1px solid #F0F0F0",
          boxShadow: "0 4px 16px rgba(6,45,76,0.05)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            padding: "24px 28px",
            borderBottom: "1px solid #F0F0F0",
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: `linear-gradient(135deg, ${cfg.bgLight}, ${BRAND.white})`,
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: cfg.bgLight,
              border: `2px solid ${cfg.borderColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {cfg.icon}
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: BRAND.blueDark, margin: 0 }}>{cfg.label}</h2>
              <p style={{ fontSize: 13, color: BRAND.grayDark, margin: "2px 0 0" }}>
                Asignado a: <strong>{cfg.assignee}</strong>
              </p>
            </div>
          </div>

          {/* Fields */}
          <div style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
            {(isGAC || isNOC) && (
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <InputField
                  label="Nombre del cliente"
                  placeholder="Ej: Distribuidora ABC"
                  value={formData.clienteNombre}
                  onChange={(v) => setFormData({ ...formData, clienteNombre: v })}
                  required
                  half
                />
                <InputField
                  label="NIT o Cédula"
                  placeholder="Ej: 900123456-7"
                  value={formData.nit}
                  onChange={(v) => setFormData({ ...formData, nit: v })}
                  required
                  half
                />
              </div>
            )}

            {isNVP && (
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <InputField
                  label="Nombre del proveedor"
                  placeholder="Ej: Pavco S.A."
                  value={formData.proveedor}
                  onChange={(v) => setFormData({ ...formData, proveedor: v })}
                  required
                  half
                />
                <InputField
                  label="Nro. factura del proveedor"
                  placeholder="Ej: PROV-00456"
                  value={formData.factura}
                  onChange={(v) => setFormData({ ...formData, factura: v })}
                  required
                  half
                />
              </div>
            )}

            {(isGAC || isNOC) && (
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 48%", minWidth: 200 }}>
                  <InputField
                    label="Número de factura"
                    placeholder="Ej: FAC-00789"
                    value={formData.factura}
                    onChange={(v) => setFormData({ ...formData, factura: v })}
                    required
                    half
                  />
                </div>
                <div style={{ flex: "1 1 48%", minWidth: 200 }}>
                  {isGAC ? (
                    <InputField
                      label="Motivo"
                      placeholder="Ej: Producto defectuoso"
                      value={formData.motivo}
                      onChange={(v) => setFormData({ ...formData, motivo: v })}
                      required
                      half
                    />
                  ) : (
                    <SelectDropdown
                      label="Motivo"
                      value={formData.motivo}
                      onChange={(v) => setFormData({ ...formData, motivo: v })}
                      options={NOC_MOTIVOS}
                      placeholder="Seleccionar motivo"
                      required
                    />
                  )}
                </div>
              </div>
            )}

            {isNVP && (
              <SelectDropdown
                label="Motivo"
                value={formData.motivo}
                onChange={(v) => setFormData({ ...formData, motivo: v })}
                options={NVP_MOTIVOS}
                placeholder="Seleccionar motivo"
                required
              />
            )}

            <TextArea
              label={isGAC ? "Descripción detallada del caso" : "Descripción del caso"}
              placeholder={isGAC ? "Describa el caso de garantía en detalle..." : "Describa el caso en detalle..."}
              value={formData.descripcion}
              onChange={(v) => setFormData({ ...formData, descripcion: v })}
              required
            />

            {isNOC && (
              <TextArea
                label="Observaciones"
                placeholder="Observaciones adicionales..."
                value={formData.observaciones}
                onChange={(v) => setFormData({ ...formData, observaciones: v })}
                rows={3}
              />
            )}

            {/* Evidence */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: BRAND.blueDark, marginBottom: 8 }}>
                Evidencia fotográfica <span style={{ color: BRAND.red }}>*</span>
              </label>

              {/* Preview uploaded files */}
              {formData.archivos && formData.archivos.length > 0 && (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                  {formData.archivos.map((file, idx) => (
                    <div key={idx} style={{
                      position: "relative",
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      overflow: "hidden",
                      border: "2px solid #E5E7EB",
                      background: "#F9FAFB",
                      cursor: file.preview ? "zoom-in" : "default",
                      transition: "transform 0.15s, box-shadow 0.15s",
                    }}
                      onClick={() => { if (file.preview) setLightboxImage(file.preview); }}
                      onMouseEnter={(e) => {
                        if (file.preview) {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {file.preview ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 6,
                        }}>
                          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={BRAND.grayMid} strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span style={{ fontSize: 9, color: BRAND.grayMid, marginTop: 4, textAlign: "center", wordBreak: "break-all", lineHeight: 1.2 }}>
                            {file.name.length > 18 ? file.name.slice(0, 15) + "..." : file.name}
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const updated = formData.archivos.filter((_, i) => i !== idx);
                          setFormData({ ...formData, archivos: updated });
                        }}
                        style={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "rgba(0,0,0,0.55)",
                          border: "none",
                          color: "#fff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          lineHeight: 1,
                          padding: 0,
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Drop zone / click to upload */}
              <div
                style={{
                  border: `2px dashed ${formData.archivos?.length > 0 ? BRAND.green : "#D1D5DB"}`,
                  borderRadius: 14,
                  padding: "28px 24px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                  background: formData.archivos?.length > 0 ? "#F0FDF4" : "#FAFAFA",
                  position: "relative",
                }}
                onClick={() => document.getElementById(`file-input-${type}`).click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = BRAND.blue;
                  e.currentTarget.style.background = BRAND.blueLight;
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.borderColor = formData.archivos?.length > 0 ? BRAND.green : "#D1D5DB";
                  e.currentTarget.style.background = formData.archivos?.length > 0 ? "#F0FDF4" : "#FAFAFA";
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = BRAND.green;
                  e.currentTarget.style.background = "#F0FDF4";
                  const files = Array.from(e.dataTransfer.files);
                  const newFiles = files.map((f) => ({
                    name: f.name,
                    size: f.size,
                    preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : null,
                  }));
                  setFormData({ ...formData, archivos: [...(formData.archivos || []), ...newFiles] });
                }}
                onMouseEnter={(e) => {
                  if (!formData.archivos?.length) {
                    e.currentTarget.style.borderColor = BRAND.blue;
                    e.currentTarget.style.background = BRAND.blueLight;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = formData.archivos?.length > 0 ? BRAND.green : "#D1D5DB";
                  e.currentTarget.style.background = formData.archivos?.length > 0 ? "#F0FDF4" : "#FAFAFA";
                }}
              >
                <input
                  id={`file-input-${type}`}
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const newFiles = files.map((f) => ({
                      name: f.name,
                      size: f.size,
                      preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : null,
                    }));
                    setFormData({ ...formData, archivos: [...(formData.archivos || []), ...newFiles] });
                    e.target.value = "";
                  }}
                />
                {formData.archivos?.length > 0 ? (
                  <>
                    <div style={{ color: BRAND.green, marginBottom: 6 }}>
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.green }}>
                      {formData.archivos.length} archivo{formData.archivos.length > 1 ? "s" : ""} adjunto{formData.archivos.length > 1 ? "s" : ""}
                    </div>
                    <div style={{ fontSize: 12, color: BRAND.grayMid, marginTop: 4 }}>
                      Haz clic o arrastra para agregar más
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ color: BRAND.grayMid, marginBottom: 8 }}>{Icons.upload}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.blueDark }}>Subir foto</div>
                    <div style={{ fontSize: 12, color: BRAND.grayMid, marginTop: 4 }}>
                      Arrastra o haz clic para adjuntar
                    </div>
                  </>
                )}
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 12,
              }}>
                <span style={{ color: BRAND.grayMid }}>{Icons.link}</span>
                <input
                  placeholder="O pegar link de Drive manualmente"
                  value={formData.driveLink || ""}
                  onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                  style={{
                    flex: 1,
                    padding: "9px 14px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 10,
                    fontSize: 13,
                    color: BRAND.blueDark,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = BRAND.blue)}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={() => handleSubmit(type)}
              style={{
                width: "100%",
                padding: "14px 24px",
                background: cfg.color,
                border: "none",
                borderRadius: 12,
                color: BRAND.white,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 8,
                transition: "all 0.2s",
                boxShadow: `0 4px 12px ${cfg.color}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = `0 8px 24px ${cfg.color}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 12px ${cfg.color}40`;
              }}
            >
              {Icons.send}
              Enviar caso {cfg.short}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Registros Page ───
  function RegistrosPage() {
    const isArchived = registrosTab === "archivados";
    const sourceRecords = isArchived ? archivedRecords : records;

    const filtered = sourceRecords.filter((r) => {
      const matchSearch =
        !searchTerm ||
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filterType === "Todos" || r.type === filterType;
      const matchEstado = filterEstado === "Todos" || r.estado === filterEstado;
      return matchSearch && matchType && matchEstado;
    });

    const allEstados = [...new Set(sourceRecords.map((r) => r.estado))];

    function handleArchive(id) {
      const rec = records.find((r) => r.id === id);
      if (!rec) return;
      const archivedRec = { ...rec, estado: "Completada", fechaArchivado: new Date().toISOString().replace("T", " ").slice(0, 19) };
      setArchivedRecords([archivedRec, ...archivedRecords]);
      setRecords(records.filter((r) => r.id !== id));
    }

    function handleRestore(id) {
      const rec = archivedRecords.find((r) => r.id === id);
      if (!rec) return;
      const { fechaArchivado, ...restored } = rec;
      setRecords([restored, ...records]);
      setArchivedRecords(archivedRecords.filter((r) => r.id !== id));
    }

    return (
      <div style={{ padding: "32px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: BRAND.blueDark, margin: 0 }}>Registros</h2>
            <p style={{ fontSize: 13, color: BRAND.grayDark, margin: "4px 0 0" }}>
              {filtered.length} caso{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setPage("home")}
            style={{
              padding: "10px 20px",
              background: BRAND.blue,
              border: "none",
              borderRadius: 10,
              color: BRAND.white,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s",
              boxShadow: `0 4px 12px ${BRAND.blue}30`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {Icons.plus} Nuevo caso
          </button>
        </div>

        {/* Tabs: Activos / Archivados */}
        <div style={{
          display: "flex",
          gap: 0,
          marginBottom: 20,
          borderBottom: "2px solid #F0F0F0",
        }}>
          {[
            { id: "activos", label: "Activos", count: records.length },
            { id: "archivados", label: "Archivados", count: archivedRecords.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setRegistrosTab(tab.id); setFilterType("Todos"); setFilterEstado("Todos"); }}
              style={{
                padding: "12px 24px",
                border: "none",
                borderBottom: registrosTab === tab.id ? `2.5px solid ${BRAND.blue}` : "2.5px solid transparent",
                background: "transparent",
                color: registrosTab === tab.id ? BRAND.blue : BRAND.grayDark,
                fontSize: 14,
                fontWeight: registrosTab === tab.id ? 700 : 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
                marginBottom: -2,
              }}
            >
              {tab.id === "activos" ? (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ) : (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              )}
              {tab.label}
              <span style={{
                background: registrosTab === tab.id ? `${BRAND.blue}15` : "#F3F4F6",
                color: registrosTab === tab.id ? BRAND.blue : BRAND.grayDark,
                padding: "2px 8px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          flexWrap: "wrap",
          alignItems: "center",
        }}>
          <div style={{ position: "relative", flex: "1 1 280px", minWidth: 200 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: BRAND.grayMid }}>
              {Icons.search}
            </span>
            <input
              placeholder="Buscar por nombre, ID o descripción..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setGlobalSearch(e.target.value); }}
              style={{
                width: "100%",
                padding: "10px 12px 10px 40px",
                border: "1.5px solid #E5E7EB",
                borderRadius: 10,
                fontSize: 14,
                color: BRAND.blueDark,
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = BRAND.blue)}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
          </div>

          {/* Type filter pills */}
          <div style={{ display: "flex", gap: 6 }}>
            {["Todos", "GAC", "NOC", "NVP"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: filterType === t ? `2px solid ${t === "Todos" ? BRAND.blueDark : CASE_TYPES[t]?.color}` : "1.5px solid #E5E7EB",
                  background: filterType === t
                    ? t === "Todos" ? `${BRAND.blueDark}0D` : `${CASE_TYPES[t].color}10`
                    : BRAND.white,
                  color: filterType === t
                    ? t === "Todos" ? BRAND.blueDark : CASE_TYPES[t].color
                    : BRAND.grayDark,
                  fontSize: 13,
                  fontWeight: filterType === t ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Estado filter */}
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            style={{
              padding: "9px 14px",
              border: "1.5px solid #E5E7EB",
              borderRadius: 10,
              fontSize: 13,
              color: BRAND.blueDark,
              background: BRAND.white,
              outline: "none",
              cursor: "pointer",
              minWidth: 180,
            }}
          >
            <option value="Todos">Todos los estados</option>
            {allEstados.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div style={{
          background: BRAND.white,
          borderRadius: 16,
          border: "1px solid #F0F0F0",
          boxShadow: "0 2px 8px rgba(6,45,76,0.04)",
          overflow: "hidden",
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
              <thead>
                <tr style={{ background: "#F8FAFB" }}>
                  {["Tipo", "ID", "Nombre", "Asignado a", "Estado", "Fecha límite", "Creación", "Acciones"].map((h, i) => (
                    <th key={i} style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 700,
                      color: BRAND.grayDark,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderBottom: "1px solid #F0F0F0",
                      whiteSpace: "nowrap",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{
                      padding: "64px 16px",
                      textAlign: "center",
                    }}>
                      <div style={{ color: BRAND.grayMid, marginBottom: 8 }}>
                        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: BRAND.blueDark, marginBottom: 4 }}>
                        {sourceRecords.length === 0
                          ? (isArchived ? "No hay casos archivados" : "No hay registros aún")
                          : "Sin resultados"}
                      </div>
                      <div style={{ fontSize: 13, color: BRAND.grayMid }}>
                        {sourceRecords.length === 0
                          ? (isArchived ? "Cuando completes un caso, aparecerá aquí." : "Crea tu primer caso desde la pantalla de inicio.")
                          : "No se encontraron registros con los filtros aplicados."}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((r, i) => (
                    <tr
                      key={r.id}
                      style={{
                        borderBottom: "1px solid #F5F5F5",
                        transition: "background 0.15s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFBFC")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      onClick={() => { setSelectedRecord(r); setShowModal(true); }}
                    >
                      <td style={{ padding: "14px 16px" }}><TypeBadge type={r.type} /></td>
                      <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: BRAND.blueDark, fontFamily: "monospace" }}>{r.id}</td>
                      <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, color: BRAND.blueDark }}>{r.name}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: BRAND.grayDark }}>{r.assignee}</td>
                      <td style={{ padding: "14px 16px" }}><Badge estado={r.estado} /></td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: BRAND.grayDark, whiteSpace: "nowrap" }}>{r.fechaLimite}</td>
                      <td style={{ padding: "14px 16px", fontSize: 12, color: BRAND.grayMid, whiteSpace: "nowrap" }}>{r.fechaCreacion}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            title="Ver detalle"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRecord(r);
                              setShowModal(true);
                            }}
                            style={{
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              color: BRAND.grayMid,
                              padding: 6,
                              borderRadius: 6,
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = BRAND.blue;
                              e.currentTarget.style.background = `${BRAND.blue}10`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = BRAND.grayMid;
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            {Icons.eye}
                          </button>
                          {/* Archive / Restore button */}
                          <button
                            title={isArchived ? "Restaurar caso" : "Marcar como completado"}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isArchived) {
                                handleRestore(r.id);
                              } else {
                                handleArchive(r.id);
                              }
                            }}
                            style={{
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              color: BRAND.grayMid,
                              padding: 6,
                              borderRadius: 6,
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = isArchived ? BRAND.blue : BRAND.green;
                              e.currentTarget.style.background = isArchived ? `${BRAND.blue}10` : "#D1FAE510";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = BRAND.grayMid;
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            {isArchived ? (
                              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                              </svg>
                            ) : (
                              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                          <button
                            title="Eliminar"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm(r.id);
                            }}
                            style={{
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              color: BRAND.grayMid,
                              padding: 6,
                              borderRadius: 6,
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = BRAND.red;
                              e.currentTarget.style.background = "#FEE2E2";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = BRAND.grayMid;
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ─── Metrics page ───
  function MetricsPage() {
    const allRecs = [...records, ...archivedRecords];
    const byType = {
      GAC: allRecs.filter((r) => r.type === "GAC").length,
      NOC: allRecs.filter((r) => r.type === "NOC").length,
      NVP: allRecs.filter((r) => r.type === "NVP").length,
    };
    const maxVal = Math.max(...Object.values(byType), 1);

    return (
      <div style={{ padding: "32px 28px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: BRAND.blueDark, marginBottom: 24 }}>Métricas</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {/* Cases by type */}
          <div style={{
            background: BRAND.white,
            borderRadius: 16,
            border: "1px solid #F0F0F0",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(6,45,76,0.04)",
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: BRAND.blueDark, marginBottom: 24, margin: "0 0 24px" }}>
              Casos por tipo
            </h3>
            {Object.entries(byType).map(([key, val]) => {
              const cfg = CASE_TYPES[key];
              return (
                <div key={key} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.blueDark }}>{cfg.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: cfg.color }}>{val}</span>
                  </div>
                  <div style={{
                    height: 10,
                    borderRadius: 999,
                    background: "#F3F4F6",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${(val / maxVal) * 100}%`,
                      borderRadius: 999,
                      background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}CC)`,
                      transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Status breakdown */}
          <div style={{
            background: BRAND.white,
            borderRadius: 16,
            border: "1px solid #F0F0F0",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(6,45,76,0.04)",
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: BRAND.blueDark, marginBottom: 24, margin: "0 0 24px" }}>
              Distribución por estado
            </h3>
            {(() => {
              const byEstado = {};
              allRecs.forEach((r) => { byEstado[r.estado] = (byEstado[r.estado] || 0) + 1; });
              return Object.entries(byEstado).sort((a, b) => b[1] - a[1]).map(([estado, count]) => (
                <div key={estado} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #F5F5F5",
                }}>
                  <Badge estado={estado} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.blueDark }}>{count}</span>
                </div>
              ));
            })()}
          </div>

          {/* Summary */}
          <div style={{
            background: `linear-gradient(135deg, ${BRAND.blueDark}, ${BRAND.blueMid})`,
            borderRadius: 16,
            padding: "28px",
            color: BRAND.white,
            boxShadow: "0 8px 24px rgba(6,45,76,0.15)",
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 24, margin: "0 0 24px", opacity: 0.9 }}>
              Resumen general
            </h3>
            {[
              { label: "Total de casos", value: counters.total },
              { label: "Casos activos", value: counters.active },
              { label: "Casos archivados", value: counters.archived },
              { label: "Tasa de cierre", value: counters.total > 0 ? `${Math.round((counters.archived / counters.total) * 100)}%` : "0%" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
              }}>
                <span style={{ fontSize: 14, opacity: 0.75 }}>{item.label}</span>
                <span style={{ fontSize: 22, fontWeight: 800 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── Modal ───
  function DetailModal() {
    if (!showModal || !selectedRecord) return null;
    const r = selectedRecord;
    const cfg = CASE_TYPES[r.type];

    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(6,45,76,0.5)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20,
        }}
        onClick={() => setShowModal(false)}
      >
        <div
          style={{
            background: BRAND.white,
            borderRadius: 20,
            width: "100%",
            maxWidth: 560,
            maxHeight: "85vh",
            overflow: "auto",
            boxShadow: "0 24px 64px rgba(6,45,76,0.2)",
            animation: "scaleIn 0.2s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            padding: "24px 28px",
            borderBottom: "1px solid #F0F0F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: `linear-gradient(135deg, ${cfg.bgLight}, ${BRAND.white})`,
            borderRadius: "20px 20px 0 0",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <TypeBadge type={r.type} />
              <span style={{ fontSize: 18, fontWeight: 700, color: BRAND.blueDark }}>{r.id}</span>
            </div>
            <button
              onClick={() => setShowModal(false)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: BRAND.grayDark,
                padding: 4,
              }}
            >
              {Icons.x}
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "24px 28px" }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: BRAND.blueDark, margin: "0 0 4px" }}>{r.name}</h3>
              <Badge estado={r.estado} />
            </div>

            {[
              { label: "Asignado a", value: r.assignee },
              { label: "Fecha de inicio", value: r.fechaInicio },
              { label: "Fecha límite", value: r.fechaLimite },
              { label: "Fecha de creación", value: r.fechaCreacion },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #F5F5F5",
              }}>
                <span style={{ fontSize: 13, color: BRAND.grayDark }}>{item.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: BRAND.blueDark }}>{item.value}</span>
              </div>
            ))}

            <div style={{ marginTop: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: BRAND.grayDark, display: "block", marginBottom: 8 }}>Descripción</label>
              <div style={{
                background: "#F8FAFB",
                borderRadius: 10,
                padding: "14px 16px",
                fontSize: 14,
                color: BRAND.blueDark,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}>
                {r.description}
              </div>
            </div>

            {/* Evidence thumbnails */}
            {r.archivos && r.archivos.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: BRAND.grayDark, display: "block", marginBottom: 8 }}>
                  Evidencia ({r.archivos.length} archivo{r.archivos.length > 1 ? "s" : ""})
                </label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {r.archivos.map((file, idx) => (
                    <div
                      key={idx}
                      onClick={(e) => {
                        if (file.preview) {
                          e.stopPropagation();
                          setLightboxImage(file.preview);
                        }
                      }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                        overflow: "hidden",
                        border: "1.5px solid #E5E7EB",
                        background: "#F9FAFB",
                        cursor: file.preview ? "zoom-in" : "default",
                        transition: "transform 0.15s, box-shadow 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (file.preview) {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {file.preview ? (
                        <img src={file.preview} alt={file.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 4 }}>
                          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={BRAND.grayMid} strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span style={{ fontSize: 8, color: BRAND.grayMid, marginTop: 2, textAlign: "center", wordBreak: "break-all" }}>
                            {file.name.length > 12 ? file.name.slice(0, 10) + "…" : file.name}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {r.driveLink && (
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: BRAND.blue }}>{Icons.link}</span>
                <a href={r.driveLink} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 13, color: BRAND.blue, fontWeight: 500, textDecoration: "underline",
                  maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block",
                }}>
                  {r.driveLink}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── Delete Confirmation Modal ───
  function DeleteConfirmModal() {
    if (!deleteConfirm) return null;
    const rec = records.find((r) => r.id === deleteConfirm) || archivedRecords.find((r) => r.id === deleteConfirm);
    if (!rec) return null;
    const isInArchived = archivedRecords.some((r) => r.id === deleteConfirm);

    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(6,45,76,0.5)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100,
          padding: 20,
        }}
        onClick={() => setDeleteConfirm(null)}
      >
        <div
          style={{
            background: BRAND.white,
            borderRadius: 20,
            width: "100%",
            maxWidth: 420,
            padding: "32px 28px",
            boxShadow: "0 24px 64px rgba(6,45,76,0.2)",
            animation: "scaleIn 0.2s ease",
            textAlign: "center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#FEE2E2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={BRAND.red} strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: BRAND.blueDark, margin: "0 0 8px" }}>
            Eliminar registro
          </h3>
          <p style={{ fontSize: 14, color: BRAND.grayDark, margin: "0 0 6px", lineHeight: 1.5 }}>
            ¿Estás seguro de que deseas eliminar el caso
          </p>
          <p style={{ fontSize: 15, fontWeight: 700, color: BRAND.blueDark, margin: "0 0 24px" }}>
            {rec.id} — {rec.name}?
          </p>
          <p style={{ fontSize: 13, color: BRAND.grayMid, margin: "0 0 24px" }}>
            Esta acción no se puede deshacer.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => setDeleteConfirm(null)}
              style={{
                flex: 1,
                padding: "12px 20px",
                border: "1.5px solid #E5E7EB",
                borderRadius: 10,
                background: BRAND.white,
                color: BRAND.blueDark,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F9FAFB";
                e.currentTarget.style.borderColor = "#D1D5DB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = BRAND.white;
                e.currentTarget.style.borderColor = "#E5E7EB";
              }}
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (isInArchived) {
                  setArchivedRecords(archivedRecords.filter((r) => r.id !== deleteConfirm));
                } else {
                  setRecords(records.filter((r) => r.id !== deleteConfirm));
                }
                setDeleteConfirm(null);
              }}
              style={{
                flex: 1,
                padding: "12px 20px",
                border: "none",
                borderRadius: 10,
                background: BRAND.red,
                color: BRAND.white,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                boxShadow: `0 4px 12px ${BRAND.red}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#DC2626";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = BRAND.red;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main layout ───
  const currentPage = (() => {
    if (page === "home") return HomePage();
    if (page === "form-GAC") return FormPage({ type: "GAC" });
    if (page === "form-NOC") return FormPage({ type: "NOC" });
    if (page === "form-NVP") return FormPage({ type: "NVP" });
    if (page === "registros") return RegistrosPage();
    if (page === "metricas") return MetricsPage();
    return HomePage();
  })();

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Galano Grotesque', 'DM Sans', -apple-system, sans-serif", background: "#F6F8FA" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', -apple-system, sans-serif; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

        input::placeholder, textarea::placeholder { color: #9CA3AF; }
        
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 999px; }
        ::-webkit-scrollbar-thumb:hover { background: #9CA3AF; }
      `}</style>

      {Sidebar({ mobile: false })}
      {Sidebar({ mobile: true })}

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {Navbar()}
        <main style={{
          flex: 1,
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s, transform 0.3s",
        }}>
          {currentPage}
        </main>
      </div>

      {DetailModal()}
      {DeleteConfirmModal()}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            cursor: "zoom-out",
            padding: 24,
            animation: "fadeIn 0.2s ease",
          }}
        >
          <button
            onClick={() => setLightboxImage(null)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
          >
            {Icons.x}
          </button>
          <img
            src={lightboxImage}
            alt="Evidencia"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: 12,
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
              objectFit: "contain",
              cursor: "default",
              animation: "scaleIn 0.25s ease",
            }}
          />
        </div>
      )}
    </div>
  );
}