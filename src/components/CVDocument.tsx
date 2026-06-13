import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

/** Resolved, language-agnostic data for the PDF (ExportPanel resolves i18n). */
export type CVDocData = {
  name: string;
  role: string;
  tagline: string;
  photo: string;
  contact: { email: string; location: string; instagram: string; phone?: string };
  education: { school: string; detail: string; period: string }[];
  skills: { name: string; level: string }[];
  experience: { role: string; org: string; period: string; body: string }[];
  achievements: string[];
  hobbies: string[];
  currentWork: string;
  labels: {
    contact: string;
    education: string;
    skills: string;
    experience: string;
    achievements: string;
    hobbies: string;
    currentWork: string;
  };
  show: {
    photo: boolean;
    contact: boolean;
    summary: boolean;
    currentWork: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    achievements: boolean;
    hobbies: boolean;
  };
};

const NAVY = "#142844";
const NAVY_DEEP = "#0e1d33";
const INK = "#1f2937";
const MUTED = "#4b5563";

const s = StyleSheet.create({
  page: { flexDirection: "row", fontSize: 9.5, color: INK, fontFamily: "Helvetica" },

  // Sidebar
  sidebar: { width: "35%", backgroundColor: NAVY_DEEP, color: "#ffffff", padding: 22, paddingTop: 26 },
  photoWrap: { alignItems: "center", marginBottom: 18 },
  photo: { width: 110, height: 110, borderRadius: 55, objectFit: "cover", border: `3 solid ${NAVY}` },
  sideHeading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    letterSpacing: 1.2,
    color: "#ffffff",
    textTransform: "uppercase",
    borderBottom: "1 solid rgba(255,255,255,0.25)",
    paddingBottom: 3,
    marginBottom: 7,
  },
  sideSection: { marginBottom: 16 },
  contactRow: { color: "#dbe2ea", marginBottom: 4 },
  eduItem: { marginBottom: 8 },
  eduSchool: { fontFamily: "Helvetica-Bold", color: "#ffffff", marginBottom: 1 },
  eduDetail: { color: "#c4cdd9" },
  eduPeriod: { color: "#9aa6b5", fontSize: 8 },
  skillRow: { flexDirection: "row", marginBottom: 3, color: "#e4e9ef" },
  bulletDot: { width: 8, color: "#7da2c9" },
  skillLevel: { color: "#9aa6b5" },

  // Main
  main: { width: "65%", padding: 26, paddingTop: 30 },
  name: { fontFamily: "Helvetica-Bold", fontSize: 26, color: NAVY, textTransform: "uppercase", letterSpacing: 0.5 },
  role: { fontSize: 12, color: MUTED, marginTop: 2 },
  tagline: { fontSize: 9.5, color: INK, marginTop: 10, lineHeight: 1.5, textAlign: "justify" },
  mainHeadingWrap: { backgroundColor: NAVY, paddingVertical: 4, paddingHorizontal: 12, alignSelf: "flex-start", marginBottom: 8, marginTop: 16 },
  mainHeading: { fontFamily: "Helvetica-Bold", fontSize: 10.5, letterSpacing: 1.2, color: "#ffffff", textTransform: "uppercase" },
  expItem: { marginBottom: 9 },
  expTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  expRole: { fontFamily: "Helvetica-Bold", fontSize: 11, color: NAVY },
  expPeriod: { fontSize: 8.5, color: MUTED },
  expOrg: { fontSize: 9.5, color: MUTED, fontFamily: "Helvetica-Oblique" },
  expBody: { fontSize: 9, color: INK, marginTop: 2, lineHeight: 1.4 },
  listRow: { flexDirection: "row", marginBottom: 3 },
  listText: { flex: 1, color: INK },
  para: { fontSize: 9.5, color: INK, lineHeight: 1.5 },
});

function Bullet({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <View style={s.listRow}>
      <Text style={[s.bulletDot, light ? {} : { color: NAVY }]}>•</Text>
      <Text style={s.listText}>{children}</Text>
    </View>
  );
}

export function CVDocument({ data }: { data: CVDocData }) {
  const { show } = data;
  return (
    <Document title={`CV — ${data.name}`} author={data.name}>
      <Page size="A4" style={s.page}>
        {/* ===== Sidebar ===== */}
        <View style={s.sidebar}>
          {show.photo && (
            <View style={s.photoWrap}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image src={data.photo} style={s.photo} />
            </View>
          )}

          {show.contact && (
            <View style={s.sideSection}>
              <Text style={s.sideHeading}>{data.labels.contact}</Text>
              {data.contact.phone ? <Text style={s.contactRow}>{data.contact.phone}</Text> : null}
              <Text style={s.contactRow}>{data.contact.email}</Text>
              <Text style={s.contactRow}>{data.contact.location}</Text>
              <Text style={s.contactRow}>{data.contact.instagram}</Text>
            </View>
          )}

          {show.education && (
            <View style={s.sideSection}>
              <Text style={s.sideHeading}>{data.labels.education}</Text>
              {data.education.map((e) => (
                <View key={e.school} style={s.eduItem}>
                  <Text style={s.eduSchool}>{e.school}</Text>
                  <Text style={s.eduDetail}>{e.detail}</Text>
                  <Text style={s.eduPeriod}>{e.period}</Text>
                </View>
              ))}
            </View>
          )}

          {show.skills && (
            <View style={s.sideSection}>
              <Text style={s.sideHeading}>{data.labels.skills}</Text>
              {data.skills.map((sk) => (
                <View key={sk.name} style={s.skillRow}>
                  <Text style={s.bulletDot}>•</Text>
                  <Text style={{ flex: 1 }}>
                    {sk.name} <Text style={s.skillLevel}>— {sk.level}</Text>
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ===== Main ===== */}
        <View style={s.main}>
          <Text style={s.name}>{data.name}</Text>
          <Text style={s.role}>{data.role}</Text>
          {show.summary && <Text style={s.tagline}>{data.tagline}</Text>}

          {show.currentWork && data.currentWork.trim() !== "" && (
            <View>
              <View style={s.mainHeadingWrap}>
                <Text style={s.mainHeading}>{data.labels.currentWork}</Text>
              </View>
              <Text style={s.para}>{data.currentWork}</Text>
            </View>
          )}

          {show.experience && (
            <View>
              <View style={s.mainHeadingWrap}>
                <Text style={s.mainHeading}>{data.labels.experience}</Text>
              </View>
              {data.experience.map((e, i) => (
                <View key={`${e.org}-${i}`} style={s.expItem}>
                  <View style={s.expTopRow}>
                    <Text style={s.expRole}>{e.role}</Text>
                    <Text style={s.expPeriod}>{e.period}</Text>
                  </View>
                  <Text style={s.expOrg}>{e.org}</Text>
                  <Text style={s.expBody}>{e.body}</Text>
                </View>
              ))}
            </View>
          )}

          {show.achievements && data.achievements.length > 0 && (
            <View>
              <View style={s.mainHeadingWrap}>
                <Text style={s.mainHeading}>{data.labels.achievements}</Text>
              </View>
              {data.achievements.map((a) => (
                <Bullet key={a}>{a}</Bullet>
              ))}
            </View>
          )}

          {show.hobbies && data.hobbies.length > 0 && (
            <View>
              <View style={s.mainHeadingWrap}>
                <Text style={s.mainHeading}>{data.labels.hobbies}</Text>
              </View>
              {data.hobbies.map((h) => (
                <Bullet key={h}>{h}</Bullet>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
