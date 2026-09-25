/* Application State Variables */
let currentThemeColor = '#2563eb';
let currentFontClass = 'font-inter';

const fontStacks = {
  'font-inter': "'Inter', sans-serif",
  'font-poppins': "'Poppins', sans-serif",
  'font-montserrat': "'Montserrat', sans-serif",
  'font-roboto': "'Roboto', sans-serif",
  'font-opensans': "'Open Sans', sans-serif",
  'font-lato': "'Lato', sans-serif",
  'font-merriweather': "'Merriweather', serif",
  'font-playfair': "'Playfair Display', serif",
  'font-lora': "'Lora', serif",
  'font-oswald': "'Oswald', sans-serif"
};

let customSections = [
  {
    id: 1,
    title: "Projects & Portfolio",
    content: "Project Name: Key achievement and technologies used in developing this project.\nSecondary Project: Overview of tasks performed and outcomes achieved."
  }
];

const presets = {
  grad: {
    name: "Your Name",
    title: "Fresh Graduate / Entry-Level Role",
    location: "City, Country",
    email: "youremail@email.com",
    phone: "+92 XXX XXXXXXX",
    summary: "Ambitious graduate with solid fundamentals in technology, problem-solving, and communication. Seeking an entry-level professional position.",
    skills: "Skill A, Skill B, Skill C, Skill D, Skill E",
    education: "Degree / Program - Institution Name (2022 - 2026)",
    experience: "Final Year Project / Academic Deliverables\n- Built solutions and completed milestone deliverables.\n- Coordinated with project advisors and team members."
  },
  teacher: {
    name: "Your Name",
    title: "Secondary / Higher Education Educator",
    location: "City, Country",
    email: "youremail@email.com",
    phone: "+92 XXX XXXXXXX",
    summary: "Dedicated educator with proven experience in lesson planning, classroom management, and curriculum development.",
    skills: "Lesson Planning, Curriculum Design, Mentorship, Classroom Management, Student Assessment",
    education: "Master Degree / Bachelor Degree in Education - University Name",
    experience: "Educator at School Name (2021 - Present)\n- Prepared lesson plans and conducted engaging classroom lectures.\n- Evaluated student performance and organized academic activities."
  },
  sales: {
    name: "Your Name",
    title: "Business Development / Sales Executive",
    location: "City, Country",
    email: "youremail@email.com",
    phone: "+92 XXX XXXXXXX",
    summary: "Results-driven sales professional with a strong track record of expanding client portfolios and achieving targets.",
    skills: "B2B Sales, Prospecting, Negotiation, Account Management, CRM Software",
    education: "Bachelor of Business Administration - University Name",
    experience: "Sales Executive at Company Name (2023 - Present)\n- Managed client accounts and generated leads through outreach.\n- Met quarterly targets and facilitated long-term client relationships."
  },
  remote: {
    name: "Your Name",
    title: "Virtual Assistant & Admin Specialist",
    location: "City, Country (Remote)",
    email: "youremail@email.com",
    phone: "+92 XXX XXXXXXX",
    summary: "Organized Virtual Assistant experienced in administrative support, customer service, email management, and digital workflows.",
    skills: "Email Management, Customer Support, Data Entry, Time Management, Spreadsheet Management",
    education: "Bachelor Degree - University Name",
    experience: "Virtual Assistant (Freelance / Remote) (2023 - Present)\n- Provided administrative support to clients across time zones.\n- Processed correspondence, updated records, and scheduled meetings."
  }
};

/* High-Precision PDF Download via html2pdf.js */
function downloadPDF() {
  const element = document.getElementById('resumePreview');
  const btn = document.getElementById('pdfBtn');
  
  const originalBtnText = btn.innerHTML;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...`;
  btn.disabled = true;

  const opt = {
    margin:       [0.3, 0.3, 0.3, 0.3],
    filename:     'PakResume_CV.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    btn.innerHTML = originalBtnText;
    btn.disabled = false;
  }).catch(err => {
    console.error("PDF Export Error:", err);
    btn.innerHTML = originalBtnText;
    btn.disabled = false;
    window.print();
  });
}

/* Theme Color Switcher Logic */
function changeThemeColor(color, targetBtn) {
  currentThemeColor = color;

  const textElements = document.querySelectorAll('.cv-theme-text');
  textElements.forEach(el => {
    el.style.color = color;
  });

  const iconElements = document.querySelectorAll('.cv-theme-icon');
  iconElements.forEach(el => {
    el.style.color = color;
  });

  const pills = document.querySelectorAll('.cv-skill-pill');
  pills.forEach(pill => {
    pill.style.borderColor = color + '50';
    pill.style.backgroundColor = color + '15';
    pill.style.color = color;
  });

  const allBtns = document.querySelectorAll('#colorPickerContainer .color-btn');
  allBtns.forEach(btn => {
    btn.classList.remove('ring-2', 'ring-offset-2', 'scale-110');
    btn.classList.add('hover:scale-105');
  });

  if (targetBtn) {
    targetBtn.classList.add('ring-2', 'ring-offset-2', 'scale-110');
    targetBtn.style.setProperty('--tw-ring-color', color);
  }
}

/* Font Switching Logic Across 10 Google Fonts */
function changeFontFamily(fontValue) {
  currentFontClass = fontValue;
  const preview = document.getElementById("resumePreview");
  if (!preview) return;

  const fontClasses = Object.keys(fontStacks);
  preview.classList.remove(...fontClasses);
  preview.classList.add(fontValue);

  const fontStyle = fontStacks[fontValue] || "'Inter', sans-serif";
  preview.style.fontFamily = fontStyle;

  const allElements = preview.querySelectorAll("*");
  allElements.forEach(el => {
    el.style.fontFamily = fontStyle;
  });
}

/* Dynamic Custom Section Handlers */
function addCustomSection() {
  const newSec = {
    id: Date.now(),
    title: "Custom Section Title (e.g. Languages / Awards)",
    content: "Enter custom details here..."
  };
  customSections.push(newSec);
  renderCustomFieldInputs();
  updateCVFromInputs();
}

function removeCustomSection(id) {
  customSections = customSections.filter(sec => sec.id !== id);
  renderCustomFieldInputs();
  updateCVFromInputs();
}

function updateCustomSectionData(id, field, value) {
  const sec = customSections.find(s => s.id === id);
  if (sec) {
    sec[field] = value;
    updateCVFromInputs();
  }
}

function renderCustomFieldInputs() {
  const container = document.getElementById("customFieldsContainer");
  if (!container) return;
  container.innerHTML = "";

  customSections.forEach(sec => {
    const fieldBox = document.createElement("div");
    fieldBox.className = "bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-2 relative";
    fieldBox.innerHTML = `
      <div class="flex justify-between items-center gap-2">
        <input type="text" value="${sec.title}" oninput="updateCustomSectionData(${sec.id}, 'title', this.value)" class="bg-white border border-slate-300 text-blue-600 font-semibold px-2 py-1 rounded-lg text-xs w-full focus:outline-none">
        <button type="button" onclick="removeCustomSection(${sec.id})" class="text-rose-500 hover:text-rose-700 text-xs px-2 py-1 cursor-pointer" title="Remove Field">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <textarea rows="3" oninput="updateCustomSectionData(${sec.id}, 'content', this.value)" class="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none">${sec.content}</textarea>
    `;
    container.appendChild(fieldBox);
  });
}

/* Preset Application Logic */
function applyPreset() {
  const val = document.getElementById("presetSelect").value;
  if (presets[val]) {
    const p = presets[val];
    document.getElementById("fullName").value = p.name;
    document.getElementById("jobTitle").value = p.title;
    document.getElementById("location").value = p.location;
    document.getElementById("email").value = p.email;
    document.getElementById("phone").value = p.phone;
    document.getElementById("summary").value = p.summary;
    document.getElementById("skills").value = p.skills;
    document.getElementById("education").value = p.education;
    document.getElementById("experience").value = p.experience;
    updateCVFromInputs();
  }
}

/* Primary Data Synchronization Functions */
function updateCVFromInputs() {
  document.getElementById("cvName").innerText = document.getElementById("fullName").value || "Your Name";
  document.getElementById("cvJobTitle").innerText = document.getElementById("jobTitle").value || "Job Title / Profession";
  document.getElementById("cvLocation").innerText = document.getElementById("location").value || "City, Country";
  document.getElementById("cvEmail").innerText = document.getElementById("email").value || "youremail@email.com";
  document.getElementById("cvPhone").innerText = document.getElementById("phone").value || "+92 XXX XXXXXXX";
  document.getElementById("cvSummary").innerText = document.getElementById("summary").value || "";
  document.getElementById("cvEducation").innerText = document.getElementById("education").value || "";
  document.getElementById("cvExperience").innerText = document.getElementById("experience").value || "";

  // Render Skills
  const skillsRaw = document.getElementById("skills").value;
  const skillsArr = skillsRaw.split(",").map(s => s.trim()).filter(s => s.length > 0);
  const skillsContainer = document.getElementById("cvSkills");
  skillsContainer.innerHTML = "";

  skillsArr.forEach(skill => {
    const pill = document.createElement("span");
    pill.className = "cv-skill-pill text-[10px] font-semibold px-2.5 py-1 rounded-md border";
    pill.innerText = skill;
    skillsContainer.appendChild(pill);
  });

  // Render Dynamic Custom Sections
  const cvCustomContainer = document.getElementById("cvCustomSectionsContainer");
  cvCustomContainer.innerHTML = "";

  customSections.forEach(sec => {
    if (sec.title.trim() !== "" || sec.content.trim() !== "") {
      const secBlock = document.createElement("div");
      secBlock.className = "mb-6";
      secBlock.innerHTML = `
        <h2 contenteditable="true" class="cv-theme-text cv-theme-border text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-2">${sec.title}</h2>
        <div contenteditable="true" class="text-xs leading-relaxed text-slate-700 whitespace-pre-line">${sec.content}</div>
      `;
      cvCustomContainer.appendChild(secBlock);
    }
  });

  // Re-apply current font and color styling across new elements
  changeFontFamily(currentFontClass);
  const activeBtn = document.querySelector(`[data-color="${currentThemeColor}"]`);
  changeThemeColor(currentThemeColor, activeBtn);
}

function syncBackToInputs() {
  document.getElementById("fullName").value = document.getElementById("cvName").innerText;
  document.getElementById("jobTitle").value = document.getElementById("cvJobTitle").innerText;
  document.getElementById("location").value = document.getElementById("cvLocation").innerText;
  document.getElementById("email").value = document.getElementById("cvEmail").innerText;
  document.getElementById("phone").value = document.getElementById("cvPhone").innerText;
  document.getElementById("summary").value = document.getElementById("cvSummary").innerText;
  document.getElementById("education").value = document.getElementById("cvEducation").innerText;
  document.getElementById("experience").value = document.getElementById("cvExperience").innerText;
}

/* Initialize Application on DOM Load */
document.addEventListener("DOMContentLoaded", () => {
  renderCustomFieldInputs();
  updateCVFromInputs();
  
  const fontSelect = document.getElementById("fontSelect");
  if (fontSelect) {
    changeFontFamily(fontSelect.value);
  }
});