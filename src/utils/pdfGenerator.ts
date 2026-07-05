import { jsPDF } from 'jspdf';
import { PortfolioData } from '../types';

export const generateResume = (data: PortfolioData) => {
  const doc = new jsPDF();
  const { profile, services, projects, achievements, skills, experiences } = data;
  
  let yPos = 20;
  const leftMargin = 20;

  // Helper to add text and update yPos
  const addText = (text: string, size: number, style: 'normal' | 'bold' | 'italic' = 'normal', color = '#000000', wrap = false) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    doc.setTextColor(color);
    
    if (wrap) {
      const splitText = doc.splitTextToSize(text, 170);
      doc.text(splitText, leftMargin, yPos);
      yPos += splitText.length * (size * 0.4);
    } else {
      doc.text(text, leftMargin, yPos);
      yPos += size * 0.4;
    }
  };

  // Profile Section
  addText(profile.name, 24, 'bold');
  yPos += 5;
  addText(profile.role, 14, 'italic', '#666666');
  yPos += 10;
  addText(profile.bio, 10, 'normal', '#333333', true);
  yPos += 10;

  // Contact Info
  addText('Contact Information', 12, 'bold');
  yPos += 5;
  
  const contacts = [
    `Email: ${profile.socials.email}`,
  ];
  if (profile.socials.phone) contacts.push(`Phone: ${profile.socials.phone}`);
  if (profile.socials.linkedin) contacts.push(`LinkedIn: ${profile.socials.linkedin}`);
  if (profile.socials.github) contacts.push(`GitHub: ${profile.socials.github}`);
  
  contacts.forEach(contact => {
    addText(contact, 10, 'normal', '#555555');
    yPos += 2;
  });
  
  yPos += 10;

  // Experience
  if (experiences && experiences.length > 0) {
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    addText('Professional Experience', 16, 'bold');
    yPos += 5;
    experiences.forEach(exp => {
      if (yPos > 260) { doc.addPage(); yPos = 20; }
      addText(`• ${exp.role}`, 12, 'bold', '#222222');
      yPos += 2;
      addText(`${exp.company} | ${exp.duration}`, 10, 'italic', '#666666');
      yPos += 3;
      exp.description.forEach(desc => {
        addText(`- ${desc}`, 10, 'normal', '#555555', true);
        yPos += 2;
      });
      if (exp.techStack) {
         addText(`Technologies: ${exp.techStack.join(', ')}`, 9, 'italic', '#777777');
         yPos += 3;
      }
      yPos += 3;
    });
    yPos += 5;
  }

  // Skills
  if (skills && skills.length > 0) {
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    addText('Skills', 16, 'bold');
    yPos += 5;
    skills.forEach(skillGroup => {
      if (yPos > 270) { doc.addPage(); yPos = 20; }
      const skillNames = skillGroup.items.map(s => s.name).join(', ');
      addText(`• ${skillGroup.category}:`, 11, 'bold', '#222222');
      yPos += 1;
      addText(skillNames, 10, 'normal', '#555555', true);
      yPos += 3;
    });
    yPos += 5;
  }

  // Services / Expertise
  if (services.length > 0) {
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    addText('Core Expertise', 16, 'bold');
    yPos += 5;
    services.forEach(service => {
      if (yPos > 270) { doc.addPage(); yPos = 20; }
      addText(`• ${service.title}`, 12, 'bold', '#222222');
      yPos += 2;
      addText(service.description, 10, 'normal', '#555555', true);
      yPos += 5;
    });
    yPos += 5;
  }

  // Projects
  if (projects.length > 0) {
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    addText('Featured Projects', 16, 'bold');
    yPos += 5;
    projects.slice(0, 3).forEach(project => {
      if (yPos > 260) { doc.addPage(); yPos = 20; }
      addText(`• ${project.title}`, 12, 'bold', '#222222');
      yPos += 2;
      addText(`Technologies: ${project.techStack.join(', ')}`, 9, 'italic', '#666666');
      yPos += 2;
      addText(project.description, 10, 'normal', '#555555', true);
      yPos += 5;
    });
    yPos += 5;
  }

  // Achievements
  if (achievements.length > 0) {
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    addText('Achievements & Milestones', 16, 'bold');
    yPos += 5;
    achievements.forEach(ach => {
      if (yPos > 270) { doc.addPage(); yPos = 20; }
      addText(`• ${ach.title} (${ach.year})`, 12, 'bold', '#222222');
      yPos += 2;
      addText(ach.description, 10, 'normal', '#555555', true);
      yPos += 5;
    });
  }

  // Save the PDF
  doc.save(`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`);
};
