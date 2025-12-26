"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Added for back navigation

/**
 * CKR.DATAPOINT - CERTIFICATES MODULE
 * Error-Free Next.js 15 Logic
 */

interface Certificate {
  title: string;
  provider: string;
  duration: string;
  description: string;
  link: string;
  paid: boolean;
  tags: string[];
}

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}

const FilterPill: React.FC<FilterPillProps> = ({ label, active, onClick, count }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      relative px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all border
      ${active 
        ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
        : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:border-blue-600/50 hover:text-white'}
    `}
  >
    <div className="flex items-center gap-2">
      <span className={`w-1 h-1 bg-white rounded-full transition-opacity ${active ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
      <span>{label}</span>
      {count !== undefined && <span className="opacity-40">[{count}]</span>}
    </div>
  </button>
);

const CertificatesPage = () => {
  const router = useRouter(); // Initialize router
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [costFilter, setCostFilter] = useState<'all' | 'free' | 'paid'>('all');

  const certificates = [
    // Cloud Computing
    { title: "AWS Certified Solutions Architect", provider: "Amazon Web Services", duration: "3-6 months", level: "Professional", rating: 4.8, students: "50K+", description: "Design and deploy scalable AWS solutions", link: "https://aws.amazon.com/certification/", tags: ["Cloud", "AWS", "Architecture"], paid: true },
    { title: "Google Cloud Professional Cloud Architect", provider: "Google Cloud", duration: "4-8 months", level: "Professional", rating: 4.7, students: "25K+", description: "Design and manage Google Cloud solutions", link: "https://cloud.google.com/certification/", tags: ["Cloud", "GCP", "Architecture"], paid: true },
    { title: "Microsoft Azure Fundamentals", provider: "Microsoft", duration: "1-2 months", level: "Beginner", rating: 4.6, students: "100K+", description: "Learn Azure cloud services fundamentals", link: "https://docs.microsoft.com/en-us/learn/certifications/", tags: ["Cloud", "Azure", "Fundamentals"], paid: true },
    { title: "AWS Certified Developer", provider: "Amazon Web Services", duration: "2-4 months", level: "Professional", rating: 4.7, students: "40K+", description: "Develop applications on AWS platform", link: "https://aws.amazon.com/certification/", tags: ["AWS", "Development", "Cloud"], paid: true },
    { title: "Google Cloud Associate Cloud Engineer", provider: "Google Cloud", duration: "2-3 months", level: "Intermediate", rating: 4.5, students: "30K+", description: "Deploy and manage Google Cloud solutions", link: "https://cloud.google.com/certification/", tags: ["GCP", "Engineering", "Cloud"], paid: true },
    { title: "Azure Administrator Associate", provider: "Microsoft", duration: "3-4 months", level: "Intermediate", rating: 4.6, students: "35K+", description: "Manage Azure subscriptions and resources", link: "https://docs.microsoft.com/en-us/learn/certifications/", tags: ["Azure", "Administration", "Cloud"], paid: true },
    { title: "AWS Certified SysOps Administrator", provider: "Amazon Web Services", duration: "3-5 months", level: "Professional", rating: 4.5, students: "20K+", description: "Deploy and manage AWS systems", link: "https://aws.amazon.com/certification/", tags: ["AWS", "SysOps", "Administration"], paid: true },
    { title: "Google Cloud Professional DevOps Engineer", provider: "Google Cloud", duration: "4-6 months", level: "Advanced", rating: 4.8, students: "15K+", description: "Implement DevOps practices on GCP", link: "https://cloud.google.com/certification/", tags: ["GCP", "DevOps", "Engineering"], paid: true },
    
    // DevOps & Containers
    { title: "Certified Kubernetes Administrator", provider: "Cloud Native Computing Foundation", duration: "2-4 months", level: "Intermediate", rating: 4.9, students: "15K+", description: "Master Kubernetes cluster administration", link: "https://www.cncf.io/certification/cka/", tags: ["Kubernetes", "DevOps", "Containers"], paid: true },
    { title: "Docker Certified Associate", provider: "Docker", duration: "1-3 months", level: "Intermediate", rating: 4.5, students: "30K+", description: "Containerization and Docker expertise", link: "https://www.docker.com/certification/", tags: ["Docker", "Containers", "DevOps"], paid: true },
    { title: "Certified Kubernetes Application Developer", provider: "CNCF", duration: "2-3 months", level: "Intermediate", rating: 4.7, students: "12K+", description: "Develop applications for Kubernetes", link: "https://www.cncf.io/certification/ckad/", tags: ["Kubernetes", "Development", "Containers"], paid: true },
    { title: "Jenkins Certified Engineer", provider: "CloudBees", duration: "1-2 months", level: "Intermediate", rating: 4.3, students: "8K+", description: "Master Jenkins CI/CD pipelines", link: "https://www.cloudbees.com/jenkins/certification", tags: ["Jenkins", "CI/CD", "DevOps"], paid: true },
    { title: "Terraform Associate", provider: "HashiCorp", duration: "2-3 months", level: "Intermediate", rating: 4.6, students: "18K+", description: "Infrastructure as Code with Terraform", link: "https://www.hashicorp.com/certification/terraform-associate", tags: ["Terraform", "IaC", "DevOps"], paid: true },
    { title: "Ansible Automation Platform", provider: "Red Hat", duration: "2-4 months", level: "Intermediate", rating: 4.4, students: "10K+", description: "Automate IT infrastructure with Ansible", link: "https://www.redhat.com/en/services/certification", tags: ["Ansible", "Automation", "DevOps"], paid: true },
    
    // Cybersecurity
    { title: "Certified Ethical Hacker", provider: "EC-Council", duration: "3-6 months", level: "Advanced", rating: 4.4, students: "40K+", description: "Ethical hacking and penetration testing", link: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/", tags: ["Security", "Ethical Hacking", "Penetration Testing"], paid: true },
    { title: "CISSP", provider: "ISC2", duration: "6-12 months", level: "Advanced", rating: 4.7, students: "25K+", description: "Information Systems Security Professional", link: "https://www.isc2.org/Certifications/CISSP", tags: ["Security", "Risk Management", "Governance"], paid: true },
    { title: "CompTIA Security+", provider: "CompTIA", duration: "2-4 months", level: "Intermediate", rating: 4.5, students: "60K+", description: "Foundation-level cybersecurity skills", link: "https://www.comptia.org/certifications/security", tags: ["Security", "CompTIA", "Fundamentals"], paid: true },
    { title: "CISM", provider: "ISACA", duration: "4-8 months", level: "Advanced", rating: 4.6, students: "15K+", description: "Certified Information Security Manager", link: "https://www.isaca.org/credentialing/cism", tags: ["Security", "Management", "Governance"], paid: true },
    { title: "CISA", provider: "ISACA", duration: "4-8 months", level: "Advanced", rating: 4.5, students: "12K+", description: "Certified Information Systems Auditor", link: "https://www.isaca.org/credentialing/cisa", tags: ["Security", "Audit", "Risk"], paid: true },
    
    // Programming & Development
    { title: "Oracle Certified Professional Java", provider: "Oracle", duration: "3-6 months", level: "Professional", rating: 4.6, students: "45K+", description: "Master Java programming language", link: "https://education.oracle.com/java", tags: ["Java", "Programming", "Oracle"], paid: true },
    { title: "Microsoft Certified: Azure Developer", provider: "Microsoft", duration: "3-5 months", level: "Professional", rating: 4.5, students: "28K+", description: "Develop solutions for Microsoft Azure", link: "https://docs.microsoft.com/en-us/learn/certifications/", tags: ["Azure", "Development", "Microsoft"], paid: true },
    { title: "Python Institute PCAP", provider: "Python Institute", duration: "2-4 months", level: "Intermediate", rating: 4.4, students: "22K+", description: "Certified Associate Python Programmer", link: "https://pythoninstitute.org/pcap", tags: ["Python", "Programming", "Development"], paid: true },
    { title: "React Developer Certification", provider: "Meta", duration: "2-3 months", level: "Intermediate", rating: 4.3, students: "35K+", description: "Build modern web applications with React", link: "https://developers.facebook.com/developercircles/", tags: ["React", "JavaScript", "Frontend"], paid: true },
    { title: "Node.js Application Developer", provider: "OpenJS Foundation", duration: "2-4 months", level: "Intermediate", rating: 4.4, students: "18K+", description: "Server-side JavaScript development", link: "https://openjsf.org/certification/", tags: ["Node.js", "JavaScript", "Backend"], paid: true },
    
    // Data Science & Analytics
    { title: "Google Data Analytics Certificate", provider: "Google", duration: "3-6 months", level: "Beginner", rating: 4.7, students: "150K+", description: "Analyze data and gain insights", link: "https://grow.google/certificates/data-analytics/", tags: ["Data Analytics", "Google", "Business Intelligence"], paid: true },
    { title: "IBM Data Science Professional", provider: "IBM", duration: "4-8 months", level: "Intermediate", rating: 4.5, students: "80K+", description: "Complete data science methodology", link: "https://www.ibm.com/training/badge/data-science-professional-certificate-v2", tags: ["Data Science", "IBM", "Machine Learning"], paid: true },
    { title: "Microsoft Power BI Data Analyst", provider: "Microsoft", duration: "2-4 months", level: "Intermediate", rating: 4.6, students: "40K+", description: "Business intelligence and data visualization", link: "https://docs.microsoft.com/en-us/learn/certifications/", tags: ["Power BI", "Analytics", "Visualization"], paid: true },
    { title: "Tableau Desktop Specialist", provider: "Tableau", duration: "1-3 months", level: "Beginner", rating: 4.4, students: "25K+", description: "Data visualization with Tableau", link: "https://www.tableau.com/learn/certification", tags: ["Tableau", "Visualization", "Analytics"], paid: true },
    { title: "SAS Certified Specialist", provider: "SAS", duration: "3-5 months", level: "Intermediate", rating: 4.3, students: "15K+", description: "Statistical analysis and data management", link: "https://www.sas.com/en_us/certification.html", tags: ["SAS", "Statistics", "Analytics"], paid: true },
    
    // Machine Learning & AI
    { title: "Google Machine Learning Engineer", provider: "Google Cloud", duration: "4-8 months", level: "Advanced", rating: 4.8, students: "20K+", description: "Design and implement ML solutions", link: "https://cloud.google.com/certification/", tags: ["Machine Learning", "GCP", "AI"], paid: true },
    { title: "AWS Certified Machine Learning", provider: "Amazon Web Services", duration: "4-8 months", level: "Advanced", rating: 4.7, students: "18K+", description: "ML solutions on AWS platform", link: "https://aws.amazon.com/certification/", tags: ["Machine Learning", "AWS", "AI"], paid: true },
    { title: "TensorFlow Developer Certificate", provider: "Google", duration: "2-4 months", level: "Intermediate", rating: 4.6, students: "30K+", description: "Build ML models with TensorFlow", link: "https://www.tensorflow.org/certificate", tags: ["TensorFlow", "Deep Learning", "AI"], paid: true },
    { title: "Azure AI Engineer Associate", provider: "Microsoft", duration: "3-5 months", level: "Professional", rating: 4.5, students: "12K+", description: "Design AI solutions on Azure", link: "https://docs.microsoft.com/en-us/learn/certifications/", tags: ["Azure", "AI", "Machine Learning"], paid: true },
    
    // Database Management
    { title: "Oracle Database Administrator", provider: "Oracle", duration: "4-8 months", level: "Professional", rating: 4.6, students: "20K+", description: "Manage Oracle database systems", link: "https://education.oracle.com/database", tags: ["Oracle", "Database", "Administration"], paid: true },
    { title: "Microsoft SQL Server DBA", provider: "Microsoft", duration: "3-6 months", level: "Professional", rating: 4.4, students: "25K+", description: "SQL Server database administration", link: "https://docs.microsoft.com/en-us/learn/certifications/", tags: ["SQL Server", "Database", "Microsoft"], paid: true },
    { title: "MongoDB Certified Developer", provider: "MongoDB", duration: "2-4 months", level: "Intermediate", rating: 4.5, students: "15K+", description: "NoSQL database development", link: "https://university.mongodb.com/certification", tags: ["MongoDB", "NoSQL", "Database"], paid: true },
    { title: "MySQL Database Administrator", provider: "Oracle", duration: "2-4 months", level: "Intermediate", rating: 4.3, students: "18K+", description: "MySQL database management", link: "https://education.oracle.com/mysql", tags: ["MySQL", "Database", "Administration"], paid: true },
    
    // Project Management
    { title: "PMP Certification", provider: "PMI", duration: "4-8 months", level: "Professional", rating: 4.7, students: "200K+", description: "Project Management Professional", link: "https://www.pmi.org/certifications/project-management-pmp", tags: ["Project Management", "PMI", "Leadership"], paid: true },
    { title: "Certified Scrum Master", provider: "Scrum Alliance", duration: "1-2 months", level: "Intermediate", rating: 4.5, students: "80K+", description: "Agile project management with Scrum", link: "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster", tags: ["Scrum", "Agile", "Management"], paid: true },
    { title: "PRINCE2 Foundation", provider: "AXELOS", duration: "2-3 months", level: "Beginner", rating: 4.4, students: "50K+", description: "Structured project management method", link: "https://www.axelos.com/certifications/prince2", tags: ["PRINCE2", "Project Management", "Methodology"], paid: true },
    { title: "Agile Certified Practitioner", provider: "PMI", duration: "2-4 months", level: "Intermediate", rating: 4.6, students: "35K+", description: "Agile project management practices", link: "https://www.pmi.org/certifications/agile-acp", tags: ["Agile", "PMI", "Project Management"], paid: true },
    
    // Web Development
    { title: "Google UX Design Certificate", provider: "Google", duration: "3-6 months", level: "Beginner", rating: 4.6, students: "120K+", description: "User experience design fundamentals", link: "https://grow.google/certificates/ux-design/", tags: ["UX Design", "Google", "Design"], paid: true },
    { title: "Adobe Certified Expert", provider: "Adobe", duration: "2-4 months", level: "Professional", rating: 4.4, students: "30K+", description: "Master Adobe Creative Suite", link: "https://www.adobe.com/training/certification.html", tags: ["Adobe", "Design", "Creative"], paid: true },
    { title: "W3C Frontend Developer", provider: "W3C via edX", duration: "2-3 months", level: "Intermediate", rating: 4.3, students: "25K+", description: "Modern frontend web development", link: "https://www.w3.org/", tags: ["Frontend", "HTML", "CSS"], paid: true },
    { title: "Vue.js Developer Certification", provider: "Vue School", duration: "1-3 months", level: "Intermediate", rating: 4.5, students: "15K+", description: "Progressive JavaScript framework", link: "https://vueschool.io/", tags: ["Vue.js", "JavaScript", "Frontend"], paid: true },
    { title: "Angular Developer Certification", provider: "Google", duration: "2-4 months", level: "Intermediate", rating: 4.4, students: "20K+", description: "Build dynamic web applications", link: "https://developers.google.com/certification/", tags: ["Angular", "TypeScript", "Frontend"], paid: true },
    
    // Mobile Development
    { title: "Android Developer Certification", provider: "Google", duration: "3-6 months", level: "Intermediate", rating: 4.5, students: "40K+", description: "Build Android mobile applications", link: "https://developers.google.com/certification/", tags: ["Android", "Mobile", "Java"], paid: true },
    { title: "iOS Developer Certification", provider: "Apple", duration: "3-6 months", level: "Intermediate", rating: 4.6, students: "30K+", description: "Develop apps for iOS platform", link: "https://developer.apple.com/certification/", tags: ["iOS", "Swift", "Mobile"], paid: true },
    { title: "React Native Developer", provider: "Meta", duration: "2-4 months", level: "Intermediate", rating: 4.4, students: "25K+", description: "Cross-platform mobile development", link: "https://reactnative.dev/", tags: ["React Native", "Mobile", "JavaScript"], paid: false },
    { title: "Flutter Developer Certification", provider: "Google", duration: "2-4 months", level: "Intermediate", rating: 4.5, students: "20K+", description: "Cross-platform app development", link: "https://flutter.dev/", tags: ["Flutter", "Dart", "Mobile"], paid: true },
    
    // Networking
    { title: "Cisco CCNA", provider: "Cisco", duration: "3-6 months", level: "Professional", rating: 4.7, students: "100K+", description: "Network Associate certification", link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html", tags: ["Cisco", "Networking", "Infrastructure"], paid: true },
    { title: "CompTIA Network+", provider: "CompTIA", duration: "2-4 months", level: "Intermediate", rating: 4.5, students: "80K+", description: "Networking fundamentals and protocols", link: "https://www.comptia.org/certifications/network", tags: ["CompTIA", "Networking", "Infrastructure"], paid: true },
    { title: "Juniper JNCIA", provider: "Juniper Networks", duration: "2-4 months", level: "Intermediate", rating: 4.4, students: "15K+", description: "Junos associate certification", link: "https://www.juniper.net/us/en/training/certification/", tags: ["Juniper", "Networking", "Junos"], paid: true },
    { title: "Fortinet NSE", provider: "Fortinet", duration: "2-3 months", level: "Intermediate", rating: 4.3, students: "12K+", description: "Network Security Expert", link: "https://www.fortinet.com/training/cybersecurity-professionals", tags: ["Fortinet", "Security", "Networking"], paid: true },
    
    // Linux & System Administration
    { title: "Red Hat Certified Engineer", provider: "Red Hat", duration: "4-8 months", level: "Professional", rating: 4.8, students: "25K+", description: "Advanced Linux system administration", link: "https://www.redhat.com/en/services/certification/rhce", tags: ["Red Hat", "Linux", "System Administration"], paid: true },
    { title: "CompTIA Linux+", provider: "CompTIA", duration: "2-4 months", level: "Intermediate", rating: 4.4, students: "35K+", description: "Linux system administration skills", link: "https://www.comptia.org/certifications/linux", tags: ["CompTIA", "Linux", "System Administration"], paid: true },
    { title: "Ubuntu Certified Professional", provider: "Canonical", duration: "2-3 months", level: "Intermediate", rating: 4.3, students: "18K+", description: "Ubuntu Linux administration", link: "https://ubuntu.com/certification", tags: ["Ubuntu", "Linux", "Canonical"], paid: true },
    { title: "SUSE Certified Administrator", provider: "SUSE", duration: "2-4 months", level: "Intermediate", rating: 4.2, students: "10K+", description: "SUSE Linux Enterprise administration", link: "https://www.suse.com/training/", tags: ["SUSE", "Linux", "Enterprise"], paid: true },
    
    // Quality Assurance
    { title: "ISTQB Foundation Level", provider: "ISTQB", duration: "1-2 months", level: "Beginner", rating: 4.5, students: "150K+", description: "Software testing fundamentals", link: "https://www.istqb.org/", tags: ["Testing", "Quality Assurance", "ISTQB"], paid: true },
    { title: "Selenium WebDriver", provider: "Selenium", duration: "1-3 months", level: "Intermediate", rating: 4.4, students: "40K+", description: "Automated web testing", link: "https://selenium.dev/", tags: ["Selenium", "Automation", "Testing"], paid: false },
    { title: "Certified Tester Advanced Level", provider: "ISTQB", duration: "3-6 months", level: "Advanced", rating: 4.6, students: "50K+", description: "Advanced software testing", link: "https://www.istqb.org/", tags: ["Testing", "Advanced", "ISTQB"], paid: true },
    
    // Business Analysis
    { title: "CBAP Certification", provider: "IIBA", duration: "4-8 months", level: "Professional", rating: 4.6, students: "30K+", description: "Certified Business Analysis Professional", link: "https://www.iiba.org/career-resources/a-business-analysts-guide-to-career-development/certifications/cbap/", tags: ["Business Analysis", "IIBA", "Requirements"], paid: true },
    { title: "PMI-PBA", provider: "PMI", duration: "3-6 months", level: "Professional", rating: 4.5, students: "20K+", description: "Professional in Business Analysis", link: "https://www.pmi.org/certifications/business-analysis-pba", tags: ["Business Analysis", "PMI", "Requirements"], paid: true },
    
    // Digital Marketing
    { title: "Google Ads Certification", provider: "Google", duration: "1-2 months", level: "Beginner", rating: 4.4, students: "200K+", description: "Online advertising with Google Ads", link: "https://skillshop.withgoogle.com/", tags: ["Google Ads", "Marketing", "Advertising"], paid: false },
    { title: "Google Analytics Certified", provider: "Google", duration: "1-2 months", level: "Beginner", rating: 4.5, students: "180K+", description: "Web analytics and data insights", link: "https://skillshop.withgoogle.com/", tags: ["Google Analytics", "Marketing", "Analytics"], paid: false },
    { title: "Facebook Blueprint Certification", provider: "Meta", duration: "1-3 months", level: "Intermediate", rating: 4.3, students: "100K+", description: "Social media marketing expertise", link: "https://www.facebook.com/business/learn", tags: ["Facebook", "Social Media", "Marketing"], paid: true },
    { title: "HubSpot Content Marketing", provider: "HubSpot", duration: "1-2 months", level: "Beginner", rating: 4.4, students: "80K+", description: "Inbound marketing strategies", link: "https://academy.hubspot.com/", tags: ["HubSpot", "Content Marketing", "Inbound"], paid: false },
    
    // Blockchain & Cryptocurrency
    { title: "Certified Bitcoin Professional", provider: "CryptoCurrency Certification Consortium", duration: "2-4 months", level: "Intermediate", rating: 4.3, students: "15K+", description: "Bitcoin and blockchain fundamentals", link: "https://cryptoconsortium.org/certifications/CBP", tags: ["Bitcoin", "Blockchain", "Cryptocurrency"], paid: true },
    { title: "Ethereum Developer Certification", provider: "ConsenSys", duration: "3-6 months", level: "Advanced", rating: 4.5, students: "12K+", description: "Smart contract development", link: "https://consensys.net/academy/", tags: ["Ethereum", "Smart Contracts", "Blockchain"], paid: true },
    { title: "Hyperledger Fabric Developer", provider: "Linux Foundation", duration: "2-4 months", level: "Intermediate", rating: 4.4, students: "8K+", description: "Enterprise blockchain development", link: "https://www.hyperledger.org/", tags: ["Hyperledger", "Blockchain", "Enterprise"], paid: true },
    
    // IT Service Management
    { title: "ITIL 4 Foundation", provider: "AXELOS", duration: "1-2 months", level: "Beginner", rating: 4.5, students: "300K+", description: "IT service management best practices", link: "https://www.axelos.com/certifications/itil-service-management", tags: ["ITIL", "Service Management", "ITSM"], paid: true },
    { title: "COBIT 2019 Foundation", provider: "ISACA", duration: "2-3 months", level: "Intermediate", rating: 4.4, students: "40K+", description: "IT governance framework", link: "https://www.isaca.org/credentialing/cobit", tags: ["COBIT", "Governance", "Framework"], paid: true },
    
    // Salesforce
    { title: "Salesforce Administrator", provider: "Salesforce", duration: "2-4 months", level: "Intermediate", rating: 4.6, students: "100K+", description: "Salesforce platform administration", link: "https://trailhead.salesforce.com/credentials/administrator", tags: ["Salesforce", "CRM", "Administration"], paid: true },
    { title: "Salesforce Developer", provider: "Salesforce", duration: "3-6 months", level: "Professional", rating: 4.5, students: "60K+", description: "Custom Salesforce development", link: "https://trailhead.salesforce.com/credentials/platformdeveloper", tags: ["Salesforce", "Development", "Apex"], paid: true },
    { title: "Salesforce Consultant", provider: "Salesforce", duration: "4-8 months", level: "Professional", rating: 4.7, students: "40K+", description: "Salesforce implementation consulting", link: "https://trailhead.salesforce.com/credentials/consultant", tags: ["Salesforce", "Consulting", "Implementation"], paid: true },
    
    // SAP
    { title: "SAP Certified Application Associate", provider: "SAP", duration: "3-6 months", level: "Professional", rating: 4.4, students: "50K+", description: "SAP ERP system expertise", link: "https://training.sap.com/certification", tags: ["SAP", "ERP", "Enterprise"], paid: true },
    { title: "SAP HANA Developer", provider: "SAP", duration: "2-4 months", level: "Professional", rating: 4.3, students: "15K+", description: "In-memory database development", link: "https://training.sap.com/certification", tags: ["SAP HANA", "Database", "Development"], paid: true },
    
    // Virtualization
    { title: "VMware Certified Professional", provider: "VMware", duration: "3-6 months", level: "Professional", rating: 4.6, students: "80K+", description: "Virtualization and cloud infrastructure", link: "https://www.vmware.com/education-services/certification.html", tags: ["VMware", "Virtualization", "Infrastructure"], paid: true },
    { title: "Microsoft Hyper-V", provider: "Microsoft", duration: "2-4 months", level: "Intermediate", rating: 4.3, students: "25K+", description: "Windows Server virtualization", link: "https://docs.microsoft.com/en-us/learn/certifications/", tags: ["Hyper-V", "Virtualization", "Windows Server"], paid: true },
    
    // Big Data
    { title: "Cloudera Data Engineer", provider: "Cloudera", duration: "3-6 months", level: "Professional", rating: 4.5, students: "20K+", description: "Big data engineering with Hadoop", link: "https://www.cloudera.com/about/training/certification.html", tags: ["Cloudera", "Big Data", "Hadoop"], paid: true },
    { title: "Apache Spark Developer", provider: "Databricks", duration: "2-4 months", level: "Intermediate", rating: 4.6, students: "15K+", description: "Distributed data processing", link: "https://academy.databricks.com/", tags: ["Spark", "Big Data", "Analytics"], paid: true },
    { title: "Elastic Certified Engineer", provider: "Elastic", duration: "2-3 months", level: "Intermediate", rating: 4.4, students: "12K+", description: "Elasticsearch and data search", link: "https://www.elastic.co/training/certification", tags: ["Elasticsearch", "Search", "Analytics"], paid: true },
    
    // IoT
    { title: "AWS IoT Core Developer", provider: "Amazon Web Services", duration: "2-4 months", level: "Intermediate", rating: 4.4, students: "10K+", description: "Internet of Things solutions", link: "https://aws.amazon.com/certification/", tags: ["IoT", "AWS", "Connected Devices"], paid: true },
    { title: "Microsoft Azure IoT Developer", provider: "Microsoft", duration: "2-4 months", level: "Intermediate", rating: 4.3, students: "8K+", description: "IoT solutions on Azure platform", link: "https://docs.microsoft.com/en-us/learn/certifications/", tags: ["Azure IoT", "IoT", "Cloud"], paid: true },
    
    // Game Development
    { title: "Unity Certified Developer", provider: "Unity Technologies", duration: "2-4 months", level: "Intermediate", rating: 4.5, students: "25K+", description: "Game development with Unity", link: "https://unity.com/products/unity-certifications", tags: ["Unity", "Game Development", "C#"], paid: true },
    { title: "Unreal Engine Developer", provider: "Epic Games", duration: "2-4 months", level: "Intermediate", rating: 4.4, students: "15K+", description: "Game development with Unreal Engine", link: "https://www.unrealengine.com/", tags: ["Unreal Engine", "Game Development", "C++"], paid: false },
    
    // Additional Programming Languages
    { title: "C++ Certified Associate", provider: "C++ Institute", duration: "2-4 months", level: "Intermediate", rating: 4.3, students: "20K+", description: "C++ programming fundamentals", link: "https://cppinstitute.org/", tags: ["C++", "Programming", "Systems"], paid: true },
    { title: "PHP Zend Certified Engineer", provider: "Zend", duration: "2-3 months", level: "Professional", rating: 4.2, students: "15K+", description: "PHP web development expertise", link: "https://www.zend.com/training/php-certification-exam", tags: ["PHP", "Web Development", "Backend"], paid: true },
    { title: "Ruby Association Certified", provider: "Ruby Association", duration: "1-3 months", level: "Intermediate", rating: 4.3, students: "12K+", description: "Ruby programming language", link: "https://www.ruby.or.jp/en/certification/examination/", tags: ["Ruby", "Programming", "Web"], paid: true },
    { title: "Go Developer Certification", provider: "Google", duration: "1-3 months", level: "Intermediate", rating: 4.4, students: "18K+", description: "Go programming language", link: "https://golang.org/", tags: ["Go", "Programming", "Backend"], paid: false },
    { title: "Rust Programming Certification", provider: "Rust Foundation", duration: "2-4 months", level: "Intermediate", rating: 4.5, students: "10K+", description: "Systems programming with Rust", link: "https://www.rust-lang.org/", tags: ["Rust", "Systems Programming", "Performance"], paid: false },
    
    // Additional Specialized Areas
    { title: "Atlassian Certified Jira Administrator", provider: "Atlassian", duration: "1-2 months", level: "Intermediate", rating: 4.4, students: "30K+", description: "Project tracking and management", link: "https://www.atlassian.com/university/certification", tags: ["Jira", "Project Management", "Atlassian"], paid: true },
    { title: "Splunk Core Certified User", provider: "Splunk", duration: "1-3 months", level: "Beginner", rating: 4.3, students: "20K+", description: "Machine data analytics platform", link: "https://www.splunk.com/en_us/training.html", tags: ["Splunk", "Analytics", "Monitoring"], paid: true },
    { title: "ServiceNow Certified System Administrator", provider: "ServiceNow", duration: "2-4 months", level: "Intermediate", rating: 4.5, students: "25K+", description: "IT service management platform", link: "https://www.servicenow.com/services/training-and-certification.html", tags: ["ServiceNow", "ITSM", "Platform"], paid: true },
    { title: "Snowflake SnowPro Core", provider: "Snowflake", duration: "2-3 months", level: "Intermediate", rating: 4.6, students: "15K+", description: "Cloud data warehouse platform", link: "https://www.snowflake.com/certifications/", tags: ["Snowflake", "Data Warehouse", "Cloud"], paid: true },
    { title: "Databricks Certified Developer", provider: "Databricks", duration: "2-4 months", level: "Intermediate", rating: 4.5, students: "12K+", description: "Unified analytics platform", link: "https://academy.databricks.com/", tags: ["Databricks", "Analytics", "Big Data"], paid: true },
    { title: "freeCodeCamp Certifications", provider: "freeCodeCamp", duration: "Varies", level: "Beginner", rating: 4.8, students: "1M+", description: "Various web development certifications", link: "https://www.freecodecamp.org/learn", tags: ["Web", "JavaScript", "HTML", "CSS"], paid: false }
];


  const filteredCertificates = useMemo(() => {
    return certificates.filter(cert => {
      const matchesCost = costFilter === 'all' || (costFilter === 'free' && !cert.paid) || (costFilter === 'paid' && cert.paid);
      const matchesSearch = !searchQuery || 
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        cert.provider.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCost && matchesSearch;
    });
  }, [searchQuery, costFilter]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col font-sans">
      
      {/* HEADER WITH BACK BUTTON */}
      <header className="sticky top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            {/* BACK BUTTON */}
            <button 
              onClick={() => router.back()}
              className="px-3 py-1.5 border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-[10px] font-mono transition-colors flex items-center gap-2 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">{"<"}</span> 
              BACK_PROTOCOL
            </button>

            <div className="h-6 w-px bg-slate-800 mx-2" />

            <Link href="/" className="flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">
                  CKR
               </div>
               <span className="hidden sm:inline text-sm font-black text-white uppercase tracking-tighter">CKR.DATAPOINT</span>
            </Link>
          </div>

          <div className="text-[10px] font-mono text-blue-500 flex items-center gap-2">
             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
             NODE_STABLE
          </div>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="bg-slate-900/30 border-b border-slate-800 sticky top-16 z-40 backdrop-blur-sm">
         <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-4">
            <div className="relative">
                <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="QUERY_REGISTRY..." 
                   className="bg-[#020617] border border-slate-800 py-2 px-4 pl-10 text-xs font-mono text-white focus:border-blue-500 outline-none w-full md:w-80 transition-colors"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 text-[10px] font-mono tracking-tighter">CMD:</span>
            </div>
            
            <div className="flex gap-2">
               {(['all', 'free', 'paid'] as const).map((f) => (
                  <FilterPill 
                    key={f} 
                    label={f} 
                    active={costFilter === f} 
                    onClick={() => setCostFilter(f)} 
                  />
               ))}
            </div>
         </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <main className="flex-1 max-w-[1400px] mx-auto p-6 w-full">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCertificates.map((cert) => (
               <div key={cert.title} className="bg-slate-900/40 border border-slate-800 p-5 group hover:border-blue-600/50 transition-all duration-300">
                  <div className="w-8 h-8 bg-slate-950 border border-slate-800 mb-4 flex items-center justify-center text-[8px] font-mono text-slate-500">
                     ID:{Math.floor(Math.random() * 999)}
                  </div>
                  <h3 className="font-bold text-white text-sm uppercase mb-1">{cert.title}</h3>
                  <p className="text-[9px] font-mono text-blue-500/60 mb-4 uppercase">{cert.provider}</p>
                  <p className="text-[11px] text-slate-400 font-mono border-l border-slate-800 pl-3 mb-6 line-clamp-3">
                     {cert.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-800/50">
                     <span className="text-[9px] font-mono text-slate-600 uppercase">TIME: {cert.duration}</span>
                     <Link href={cert.link} className="text-blue-500 text-[10px] font-bold hover:text-white transition-colors uppercase">
                        Initialize &raquo;
                     </Link>
                  </div>
               </div>
            ))}
         </div>
      </main>

      <footer className="p-10 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono">
        CKR.DATAPOINT // PROTOCOL_ESTABLISHED_2025
      </footer>
    </div>
  );
};

export default CertificatesPage;