import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  CheckCircle, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { GOOGLE_FORM_CONFIG } from '../constants/formConfig';

interface RecruitmentProps {
  onNavigate?: (path: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

interface FormData {
  // Section 1: Basic Details
  name: string;
  regNo: string;
  email: string;
  year: string;
  whatsapp: string;

  // Section 2: Interest & Motivation
  whyJoin: string;
  defenseTechExcites: string;
  gainExpectation: string;

  // Section 3: Technical Background
  departments: string[];
  skills: string[];
  skillRatings: Record<string, number>;
  techExperience: string;
  resumeLink: string;

  // Section 4: Final Declaration
  foundingTeam: string;
  hoursContribution: string;
  comments: string;
}

const initialFormData: FormData = {
  name: '',
  regNo: '',
  email: '',
  year: '',
  whatsapp: '',
  whyJoin: '',
  defenseTechExcites: '',
  gainExpectation: '',
  departments: [],
  skills: [],
  skillRatings: {},
  techExperience: '',
  resumeLink: '',
  foundingTeam: '',
  hoursContribution: '',
  comments: ''
};
const DEPARTMENTS = [
  'AUV' ,
  'CubeSAT' ,
  'Counter Drone System',
  'Web dev' ,
  'Socials' ,
  'Outreach' ,
  'Graphics design' ,
  'Revenue & Commercial Operations',
   'HR'
];

const SKILL_OPTIONS = [
   'AI & ML' ,
   'ROS' ,
   'RnD' ,
   'Electronics and Embeded' ,
   'CAD Designing' ,
   'Ansys' ,
   'Web dev' ,
   'Graphics design' ,
   'Outreach' ,
   'Socials' 
];

export const Recruitment: React.FC<RecruitmentProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDepartmentChange = (dept: string) => {
    setFormData(prev => {
      const departments = prev.departments.includes(dept)
        ? prev.departments.filter(d => d !== dept)
        : [...prev.departments, dept];
      
      if (errors.departments && departments.length > 0) {
        setErrors(prevErr => ({ ...prevErr, departments: undefined }));
      }
      return { ...prev, departments };
    });
  };

  const handleSkillChange = (skill: string) => {
    setFormData(prev => {
      const exists = prev.skills.includes(skill);
      const skills = exists
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      
      const skillRatings = { ...prev.skillRatings };
      if (!exists) {
        skillRatings[skill] = 3;
      } else {
        delete skillRatings[skill];
      }

      if (errors.skills && skills.length > 0) {
        setErrors(prevErr => ({ ...prevErr, skills: undefined }));
      }
      return { ...prev, skills, skillRatings };
    });
  };

  const handleSkillRatingChange = (skill: string, rating: number) => {
    setFormData(prev => {
      const skillRatings = { ...prev.skillRatings, [skill]: rating };
      const skills = prev.skills.includes(skill)
        ? prev.skills
        : [...prev.skills, skill];
        
      if (errors.skills) {
        setErrors(prevErr => ({ ...prevErr, skills: undefined }));
      }
      return { ...prev, skills, skillRatings };
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
      if (!formData.regNo.trim()) newErrors.regNo = 'Registration number is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.year) newErrors.year = 'Please select your current year';
      if (!formData.whatsapp.trim()) {
        newErrors.whatsapp = 'WhatsApp number is required';
      } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.whatsapp.replace(/\s+/g, ''))) {
        newErrors.whatsapp = 'Please enter a valid 10-15 digit phone number';
      }
    }

    if (step === 2) {
      if (!formData.whyJoin.trim()) newErrors.whyJoin = 'This field is required';
      if (!formData.defenseTechExcites.trim()) newErrors.defenseTechExcites = 'This field is required';
      if (!formData.gainExpectation.trim()) newErrors.gainExpectation = 'This field is required';
    }

    if (step === 3) {
      if (formData.departments.length === 0) newErrors.departments = 'Please select at least one department';
      if (formData.skills.length === 0) {
        newErrors.skills = 'Please select at least one skill';
      } else {
        const unratedSkills = formData.skills.filter(s => !formData.skillRatings[s]);
        if (unratedSkills.length > 0) {
          newErrors.skills = 'Please rate your proficiency for all selected skills';
        }
      }
      if (!formData.techExperience.trim()) newErrors.techExperience = 'Please describe your relevant technical projects/experience';
      if (!formData.resumeLink.trim()) {
        newErrors.resumeLink = 'Please provide a link to your resume or portfolio';
      } else if (!/^https?:\/\//i.test(formData.resumeLink.trim())) {
        newErrors.resumeLink = 'Please provide a valid URL starting with http:// or https://';
      }
    }

    if (step === 4) {
      if (!formData.foundingTeam) newErrors.foundingTeam = 'Please select an option';
      if (!formData.hoursContribution) newErrors.hoursContribution = 'Please select an option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      setIsSubmitting(true);
      try {
        const urlParams = new URLSearchParams();
        
        urlParams.append(GOOGLE_FORM_CONFIG.fields.name, formData.name);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.regNo, formData.regNo);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.email, formData.email);
        urlParams.append('emailAddress', formData.email);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.year, formData.year);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.whatsapp, formData.whatsapp);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.whyJoin, formData.whyJoin);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.defenseTechExcites, formData.defenseTechExcites);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.gainExpectation, formData.gainExpectation);
        
        formData.departments.forEach(dept => {
          urlParams.append(GOOGLE_FORM_CONFIG.fields.interests, dept);
        });

        const avgRating = formData.skills.length > 0
          ? Math.round(formData.skills.reduce((acc, curr) => acc + (formData.skillRatings[curr] || 3), 0) / formData.skills.length)
          : 3;
        urlParams.append(GOOGLE_FORM_CONFIG.fields.experienceLevel, avgRating.toString());

        const skillDetails = formData.skills.map(skill => `${skill}: ${formData.skillRatings[skill]}/5`).join(', ');
        const formattedTechExperience = `[Skills: ${skillDetails}]\n\n${formData.techExperience}`;
        urlParams.append(GOOGLE_FORM_CONFIG.fields.techExperience, formattedTechExperience);

        urlParams.append(GOOGLE_FORM_CONFIG.fields.resumeLink, formData.resumeLink);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.foundingTeam, formData.foundingTeam);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.hoursContribution, formData.hoursContribution);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.comments, formData.comments);

        urlParams.append('fvv', '1');
        urlParams.append('pageHistory', '0,1,2,3');

        await fetch(GOOGLE_FORM_CONFIG.submitUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: urlParams.toString(),
        });

        setIsSubmitted(true);
      } catch (err) {
        console.error('Submission error:', err);
        setErrors(prev => ({ ...prev, comments: 'Network error submitting application. Please check connection.' }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-primary/30 pt-28 pb-20">
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-primary/10 rounded-full blur-[160px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex items-center justify-between py-4 mb-6 border-b border-white/10">
          {/* <button
            onClick={() => onNavigate ? onNavigate('/') : (window.location.href = '/')}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button> */}

          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">Official Application Portal</span>
          </div>
        </div>

        {/* Portal Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs uppercase tracking-wider font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BlackVolt Technologies</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Recruitment Application Form
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">
            Please complete the 4 sections below carefully to apply for our core engineering teams.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#111111]/95 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(0,229,255,0.08)] backdrop-blur-xl relative overflow-hidden">
          
          {isSubmitted ? (
            <div className="text-center py-16 space-y-6">
              <div className="w-20 h-20 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center mx-auto text-primary animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-display text-3xl font-bold text-white">Application Received!</h3>
              <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for applying to BlackVolt Technologies, <span className="text-primary font-bold">{formData.name}</span>. Our team will review your application and reach out via WhatsApp/Email within 1-2 weeks.
              </p>
              
              <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                {/* <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setFormData(initialFormData);
                  }}
                  className="px-6 py-3.5 border border-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
                >
                  Submit Another Response
                </button> */}
                <button
                  onClick={() => onNavigate ? onNavigate('/') : (window.location.href = '/')}
                  className="px-6 py-3.5 bg-primary text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Prominent Disclaimer Notice */}
              {/* <div className="mb-8 p-4.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-md flex items-center gap-3.5 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="text-xs sm:text-sm font-semibold tracking-wide">
                  <span className="uppercase text-amber-400 font-bold mr-1.5">Disclaimer:</span> Only apply if you&apos;re serious and willing to give your best.
                </p>
              </div> */}

              {/* Step Progress Header */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  {[
                    { num: 1, label: "1. Basic Details" },
                    { num: 2, label: "2. Interest & Motivation" },
                    { num: 3, label: "3. Technical Background" },
                    { num: 4, label: "4. Final Declaration" }
                  ].map((step) => (
                    <div key={step.num} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                        currentStep === step.num 
                          ? 'bg-primary text-black ring-4 ring-primary/20 shadow-[0_0_12px_rgba(0,229,255,0.5)]' 
                          : currentStep > step.num 
                            ? 'bg-primary/20 text-primary border border-primary/50' 
                            : 'bg-white/5 text-gray-500 border border-white/10'
                      }`}>
                        {currentStep > step.num ? '✓' : step.num}
                      </div>
                      <span className={`text-xs hidden md:inline-block font-semibold ${
                        currentStep === step.num ? 'text-white' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-300 shadow-[0_0_10px_rgba(0,229,255,0.7)]"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* FORM BODY */}
              <form onSubmit={handleSubmit}>
                {/* SECTION 1: Basic Details */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-xl font-bold text-white">Section 1: Basic Details</h3>
                      <p className="text-xs text-gray-400 mt-1">Please provide your personal contact information.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          Full Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          Registration Number <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="regNo"
                          value={formData.regNo}
                          onChange={handleInputChange}
                          placeholder="e.g. 23BCE1234"
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                        />
                        {errors.regNo && <p className="text-red-400 text-xs mt-1.5">{errors.regNo}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. rahul.sharma2023@vitstudent.ac.in"
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          Current Academic Year <span className="text-primary">*</span>
                        </label>
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                        >
                          <option value="">Select current year</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                        </select>
                        {errors.year && <p className="text-red-400 text-xs mt-1.5">{errors.year}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          WhatsApp / Contact Number <span className="text-primary">*</span>
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 **********"
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                        />
                        {errors.whatsapp && <p className="text-red-400 text-xs mt-1.5">{errors.whatsapp}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION 2: Interest & Motivation */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-xl font-bold text-white">Section 2: Interest & Motivation</h3>
                      <p className="text-xs text-gray-400 mt-1">Tell us about your drive to build defense & marine tech.</p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          Why do you want to join BlackVolt Technologies? <span className="text-primary">*</span>
                        </label>
                        <textarea
                          name="whyJoin"
                          rows={3}
                          value={formData.whyJoin}
                          onChange={handleInputChange}
                          placeholder="Share what inspires you about our mission..."
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                        ></textarea>
                        {errors.whyJoin && <p className="text-red-400 text-xs mt-1.5">{errors.whyJoin}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          What excites you most about Autonomous Defense / Robotics Systems? <span className="text-primary">*</span>
                        </label>
                        <textarea
                          name="defenseTechExcites"
                          rows={3}
                          value={formData.defenseTechExcites}
                          onChange={handleInputChange}
                          placeholder="Challenges in perception, embedded control, hydrodynamic design, harsh environments..."
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                        ></textarea>
                        {errors.defenseTechExcites && <p className="text-red-400 text-xs mt-1.5">{errors.defenseTechExcites}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          What are your key learning and growth expectations from this role? <span className="text-primary">*</span>
                        </label>
                        <textarea
                          name="gainExpectation"
                          rows={3}
                          value={formData.gainExpectation}
                          onChange={handleInputChange}
                          placeholder="Specific skills, real-world hardware experience, startup leadership..."
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                        ></textarea>
                        {errors.gainExpectation && <p className="text-red-400 text-xs mt-1.5">{errors.gainExpectation}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION 3: Technical Background */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-xl font-bold text-white">Section 3: Technical Background</h3>
                      <p className="text-xs text-gray-400 mt-1">Select your engineering domains and rate your experience.</p>
                    </div>

                    {/* Department Checklist */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#00E5FF] mb-3">
                        Which departments are you interested in joining? (Select all that apply) <span className="text-[#00E5FF]">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {DEPARTMENTS.map((dept) => {
                          const isChecked = formData.departments.includes(dept);
                          return (
                            <button
                              key={dept}
                              type="button"
                              onClick={() => handleDepartmentChange(dept)}
                              className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center gap-3 ${
                                isChecked 
                                  ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-white shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
                                  : 'bg-black/50 border-white/10 text-gray-300 hover:border-white/25 hover:text-white'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border transition-colors ${
                                isChecked ? 'bg-[#00E5FF] border-[#00E5FF] text-black font-bold' : 'border-gray-600 bg-transparent'
                              }`}>
                                {isChecked && '✓'}
                              </div>
                              <span>{dept}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.departments && <p className="text-red-400 text-xs mt-2">{errors.departments}</p>}
                    </div>

                    {/* Skills & Rating */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#00E5FF] mb-3">
                        Select your skills and rate your experience level for each (1 to 5): <span className="text-[#00E5FF]">*</span>
                      </label>
                      <div className="space-y-2.5">
                        {SKILL_OPTIONS.map((skill) => {
                          const isChecked = formData.skills.includes(skill);
                          return (
                            <div
                              key={skill}
                              className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                isChecked 
                                  ? 'bg-[#00E5FF]/10 border-[#00E5FF]/60 shadow-[0_0_15px_rgba(0,229,255,0.1)]' 
                                  : 'bg-black/50 border-white/10 hover:border-white/20'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => handleSkillChange(skill)}
                                className="flex items-center gap-3 text-left w-full sm:w-auto"
                              >
                                <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border transition-colors shrink-0 ${
                                  isChecked ? 'bg-[#00E5FF] border-[#00E5FF] text-black font-bold' : 'border-gray-600 bg-transparent'
                                }`}>
                                  {isChecked && '✓'}
                                </div>
                                <span className="text-xs font-semibold text-gray-200">{skill}</span>
                              </button>

                              {isChecked && (
                                <div className="flex items-center gap-1.5 self-end sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 w-full sm:w-auto justify-end">
                                  <span className="text-[11px] font-mono text-gray-400 mr-1.5">Rating:</span>
                                  {[1, 2, 3, 4, 5].map((lvl) => (
                                    <button
                                      key={lvl}
                                      type="button"
                                      onClick={() => handleSkillRatingChange(skill, lvl)}
                                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                                        (formData.skillRatings[skill] || 3) >= lvl 
                                          ? 'bg-[#00E5FF] text-black shadow-[0_0_8px_rgba(0,229,255,0.4)]' 
                                          : 'bg-white/5 text-gray-500 border border-white/10 hover:border-white/30'
                                      }`}
                                    >
                                      {lvl}
                                    </button>
                                  ))}
                                  <span className="text-xs font-mono text-[#00E5FF] font-bold ml-1.5 w-6">
                                    {formData.skillRatings[skill] || 3}/5
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {errors.skills && <p className="text-red-400 text-xs mt-2">{errors.skills}</p>}
                    </div>

                    {/* Experience Description */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        Briefly describe any relevant technical experience you have (Provide links to projects if any) <span className="text-primary">*</span>
                      </label>
                      <textarea
                        name="techExperience"
                        rows={3}
                        value={formData.techExperience}
                        onChange={handleInputChange}
                        placeholder="Detail past robotics, firmware, software repos, hardware built..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                      ></textarea>
                      {errors.techExperience && <p className="text-red-400 text-xs mt-1.5">{errors.techExperience}</p>}
                    </div>

                    {/* Resume / Portfolio Link */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        Link to your resume <span className="text-gray-500 font-normal normal-case">(Please make sure the shared link is set as anyone with a link)</span> <span className="text-primary">*</span>
                      </label>
                      <input
                        type="url"
                        name="resumeLink"
                        value={formData.resumeLink}
                        onChange={handleInputChange}
                        placeholder="https://drive.google.com/... or https://github.com/..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                      />
                      {errors.resumeLink && <p className="text-red-400 text-xs mt-1.5">{errors.resumeLink}</p>}
                    </div>
                  </div>
                )}

                {/* SECTION 4: Final Declaration */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-xl font-bold text-white">Section 4: Final Declaration</h3>
                      <p className="text-xs text-gray-400 mt-1">Final commitment details before submission.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        Are you interested in joining as a Core / Founding Engineering Member? <span className="text-primary">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {['Yes, absolutely', 'Interested in Project-Based / Contributor role'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, foundingTeam: opt }));
                              if (errors.foundingTeam) setErrors(prev => ({ ...prev, foundingTeam: undefined }));
                            }}
                            className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                              formData.foundingTeam === opt 
                                ? 'bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
                                : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.foundingTeam && <p className="text-red-400 text-xs mt-1.5">{errors.foundingTeam}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        Estimated Weekly Time Contribution <span className="text-primary">*</span>
                      </label>
                      <select
                        name="hoursContribution"
                        value={formData.hoursContribution}
                        onChange={handleInputChange}
                        className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                      >
                        <option value="">Select weekly hours</option>
                        <option value="5 - 10 hours/week">5 - 10 hours / week</option>
                        <option value="10 - 20 hours/week">10 - 20 hours / week</option>
                        <option value="20+ hours/week (Full Immersion)">20+ hours / week (Full Immersion)</option>
                      </select>
                      {errors.hoursContribution && <p className="text-red-400 text-xs mt-1.5">{errors.hoursContribution}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        Additional Comments, Questions, or Notes (Optional)
                      </label>
                      <textarea
                        name="comments"
                        rows={3}
                        value={formData.comments}
                        onChange={handleInputChange}
                        placeholder="Anything else you'd like the founding team to know..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:border-primary focus:outline-none transition-colors"
                      ></textarea>
                      {errors.comments && <p className="text-red-400 text-xs mt-1.5">{errors.comments}</p>}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-6 py-3.5 border border-white/10 hover:border-white/30 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3.5 bg-primary text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-3.5 bg-primary text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-[0_0_25px_rgba(0,229,255,0.3)] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const RecruitmentModal = Recruitment;
export default Recruitment;
