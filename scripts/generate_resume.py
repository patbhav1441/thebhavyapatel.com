from pathlib import Path
from shutil import copyfile

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "bhavya-patel-resume.pdf"
PUBLIC_COPY = ROOT / "public" / "resume" / "bhavya-patel-resume.pdf"

INK = colors.HexColor("#172033")
MUTED = colors.HexColor("#526071")
BLUE = colors.HexColor("#195ED1")
RULE = colors.HexColor("#C9D2E0")
PAPER_BLUE = colors.HexColor("#EDF4FF")


def link(label: str, href: str) -> str:
    return f'<link href="{href}" color="#195ED1">{label}</link>'


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="ResumeName",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=24,
        leading=25,
        textColor=INK,
        spaceAfter=2,
    )
)
styles.add(
    ParagraphStyle(
        name="ResumeTagline",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10.2,
        leading=12,
        textColor=MUTED,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="Contact",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.3,
        leading=10,
        textColor=MUTED,
    )
)
styles.add(
    ParagraphStyle(
        name="Section",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10.2,
        leading=12,
        textColor=BLUE,
        spaceBefore=7,
        spaceAfter=3.5,
        borderWidth=0,
    )
)
styles.add(
    ParagraphStyle(
        name="EntryTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9.1,
        leading=10.8,
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        name="EntryDate",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.1,
        leading=9.8,
        alignment=TA_LEFT,
        textColor=MUTED,
    )
)
styles.add(
    ParagraphStyle(
        name="BodySmall",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.4,
        leading=10.4,
        textColor=INK,
        spaceAfter=2,
    )
)
styles.add(
    ParagraphStyle(
        name="BulletSmall",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.2,
        leading=10.2,
        leftIndent=9,
        firstLineIndent=-5,
        bulletIndent=1,
        textColor=INK,
        spaceAfter=1.2,
    )
)


def section(title: str):
    return [
        Paragraph(title.upper(), styles["Section"]),
        Table(
            [[""]],
            colWidths=[7.3 * inch],
            rowHeights=[0.6],
            style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), RULE)]),
        ),
        Spacer(1, 2),
    ]


def entry(title: str, organization: str, dates: str, bullets: list[str]):
    heading = Table(
        [
            [
                Paragraph(f"{title} | {organization}", styles["EntryTitle"]),
                Paragraph(dates, styles["EntryDate"]),
            ]
        ],
        colWidths=[5.9 * inch, 1.4 * inch],
        hAlign="LEFT",
    )
    heading.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0.7),
            ]
        )
    )
    content = [heading]
    content.extend(
        Paragraph(bullet, styles["BulletSmall"], bulletText="-") for bullet in bullets
    )
    content.append(Spacer(1, 2.2))
    return KeepTogether(content)


def project_row(name: str, description: str, href: str):
    return Paragraph(
        f"<b>{link(name, href)}</b> - {description}",
        styles["BodySmall"],
    )


def build_resume() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_COPY.parent.mkdir(parents=True, exist_ok=True)

    document = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        rightMargin=0.48 * inch,
        leftMargin=0.48 * inch,
        topMargin=0.38 * inch,
        bottomMargin=0.34 * inch,
        title="Bhavya Patel Resume",
        author="Bhavya Patel",
        subject="Undergraduate researcher, product builder, and student leader",
    )

    story = [
        Table(
            [
                [
                    Paragraph("BHAVYA PATEL", styles["ResumeName"]),
                    Paragraph("Updated August 2026", styles["EntryDate"]),
                ]
            ],
            colWidths=[5.9 * inch, 1.4 * inch],
            style=TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                    ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ]
            ),
        ),
        Paragraph(
            "Undergraduate Researcher | Product Builder | Student Leader",
            styles["ResumeTagline"],
        ),
        Table(
            [
                [
                    Paragraph(
                        "Georgia, United States  |  "
                        + link("patelbhavya216@gmail.com", "mailto:patelbhavya216@gmail.com")
                        + "  |  "
                        + link("LinkedIn", "https://www.linkedin.com/in/bhavya-patel-60877420a/")
                        + "  |  "
                        + link("GitHub", "https://github.com/patbhav1441")
                        + "  |  "
                        + link("thebhavyapatel.com", "https://www.thebhavyapatel.com"),
                        styles["Contact"],
                    )
                ]
            ],
            colWidths=[7.3 * inch],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), PAPER_BLUE),
                    ("BOX", (0, 0), (-1, -1), 0.5, RULE),
                    ("LEFTPADDING", (0, 0), (-1, -1), 6),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ]
            ),
        ),
    ]

    story.extend(section("Education"))
    story.append(
        entry(
            "Bachelor's Degree in Progress, Honors",
            "Kennesaw State University",
            "2025 - Present",
            [
                "Computing and software interests; active in research, student government, technology advising, and student organizations."
            ],
        )
    )

    story.extend(section("Experience & Research"))
    story.extend(
        [
            entry(
                "Undergraduate Researcher",
                "Kennesaw State University - VIP, FYSP, and IMPACT",
                "Aug 2025 - Present",
                [
                    "Study emotional-context AI, adaptive agent behavior, responsible implementation, and small-device deployment.",
                    "Compare classical and quantum-oriented phishing-detection approaches; prepare survey data and assessment benchmarks.",
                ],
            ),
            entry(
                "Founder & Product Lead",
                "StuddyBuddy",
                "Dec 2025 - Present",
                [
                    "Shape an iOS study-partner product around course-based discovery, shared preferences, communication, safety, and carefully scoped AI study support."
                ],
            ),
            entry(
                "Senator, CCSE & IT Advisory Representative",
                "KSU Student Government Association",
                "Nov 2025 - Present",
                [
                    "Represent computing students, gather feedback, and bring student priorities into academic, campus, and technology-planning conversations."
                ],
            ),
            entry(
                "Founder & CEO",
                "QuantumRise Foundation",
                "Nov 2025 - Present",
                [
                    "Lead an emerging-technology access initiative; built its web presence and explore education programs, equipment-access concepts, and partnerships."
                ],
            ),
            entry(
                "Intern",
                "System Technology Works LLC",
                "Oct 2025 - Present",
                [
                    "Experiment with local language-model tooling, machine learning, mechatronics, and applied AI for mechanical systems."
                ],
            ),
        ]
    )

    story.extend(section("Leadership & Activities"))
    story.append(
        Paragraph(
            "<b>Secretary, Kennesaw Indian Students Organization</b> - documentation, communications, scheduling, and event logistics.  "
            "<b>Apprentice Marketing Officer, ASME</b> - promotional design, content scheduling, and outreach.  "
            "<b>Junior Analyst, Student Managed Investment Fund</b> - equity research, valuation context, market monitoring, and research pitches.",
            styles["BodySmall"],
        )
    )

    story.extend(section("Selected Projects"))
    story.extend(
        [
            project_row(
                "Zargon",
                "research surface for bounded software-agent workflows and cross-device coordination.",
                "https://www.thebhavyapatel.com/zargon/",
            ),
            project_row(
                "Stock Predictor",
                "Python and machine-learning experiment for multi-signal market analysis and model comparison.",
                "https://www.thebhavyapatel.com/stock-predictor/",
            ),
            project_row(
                "FHS Checklist",
                "sanitized workflow case study focused on task state, handoffs, and repeatable operations.",
                "https://www.thebhavyapatel.com/fhs-checklist/",
            ),
        ]
    )

    story.extend(section("Skills & Credentials"))
    story.append(
        Paragraph(
            "<b>Technical:</b> Python, Java, JavaScript, HTML/CSS, SQL, React, Astro, Linux, Kubernetes, Raspberry Pi, MATLAB, data analysis, machine learning, AI/LLMs, quantum computing, iOS and product design.<br/>"
            "<b>Credentials:</b> IBM AI, Data, and Cybersecurity Fundamentals; Databricks Generative AI Fundamentals; MathWorks MATLAB.",
            styles["BodySmall"],
        )
    )

    document.build(story)
    reader = PdfReader(str(OUTPUT))
    if len(reader.pages) != 1:
        raise RuntimeError(f"Resume must remain one page; generated {len(reader.pages)} pages")
    copyfile(OUTPUT, PUBLIC_COPY)


if __name__ == "__main__":
    build_resume()
