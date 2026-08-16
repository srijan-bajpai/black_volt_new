import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, Send, CheckCircle, Info } from 'lucide-react';
import { GOOGLE_FORM_CONFIG } from '../constants/formConfig';

interface RecruitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const RecruitmentModal: React.FC<RecruitmentModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset form on close
      setCurrentStep(1);
      setFormData(initialFormData);
      setErrors({});
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      
      const skillRatings = { ...prev.skillRatings };
      if (!prev.skills.includes(skill)) {
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
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.regNo.trim()) newErrors.regNo = 'Registration number is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.year) newErrors.year = 'Please select your current year';
      if (!formData.whatsapp.trim()) {
        newErrors.whatsapp = 'Whatsapp contact is required';
      } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.whatsapp.replace(/\s+/g, ''))) {
        newErrors.whatsapp = 'Please enter a valid phone number';
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
          newErrors.skills = 'Please rate your experience level for all selected skills';
        }
      }
      if (!formData.techExperience.trim()) newErrors.techExperience = 'Please describe your relevant technical experience';
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
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
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
        urlParams.append('emailAddress', formData.email); // Sends email directly to Google's automatic email collection field if enabled
        urlParams.append(GOOGLE_FORM_CONFIG.fields.year, formData.year);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.whatsapp, formData.whatsapp);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.whyJoin, formData.whyJoin);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.defenseTechExcites, formData.defenseTechExcites);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.gainExpectation, formData.gainExpectation);
        
        // Google Forms accepts multiple check options under the same field key
        formData.departments.forEach(dept => {
          urlParams.append(GOOGLE_FORM_CONFIG.fields.interests, dept);
        });

        // Compute average skill experience level to map to experienceLevel field
        const avgRating = formData.skills.length > 0
          ? Math.round(formData.skills.reduce((acc, curr) => acc + (formData.skillRatings[curr] || 3), 0) / formData.skills.length)
          : 3;
        urlParams.append(GOOGLE_FORM_CONFIG.fields.experienceLevel, avgRating.toString());

        // Prepend skill rating breakdown to technical experience text field
        const skillDetails = formData.skills.map(skill => `${skill}: ${formData.skillRatings[skill]}/5`).join(', ');
        const formattedTechExperience = `[Skills: ${skillDetails}]\n\n${formData.techExperience}`;
        urlParams.append(GOOGLE_FORM_CONFIG.fields.techExperience, formattedTechExperience);

        urlParams.append(GOOGLE_FORM_CONFIG.fields.resumeLink, formData.resumeLink);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.foundingTeam, formData.foundingTeam);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.hoursContribution, formData.hoursContribution);
        urlParams.append(GOOGLE_FORM_CONFIG.fields.comments, formData.comments);

        // Required hidden parameters for multi-page Google Forms validation
        urlParams.append('fvv', '1');
        urlParams.append('pageHistory', '0,1,2,3');

        // Submit via post to formResponse
        await fetch(GOOGLE_FORM_CONFIG.submitUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: urlParams.toString(),
        });

        // Under mode 'no-cors', we cannot read the response object, 
        // but if no network error occurs, we confirm transmission.
        setIsSubmitted(true);
      } catch (err) {
        console.error('Submission error:', err);
        setErrors(prev => ({ ...prev, comments: 'Failed to upload response. Check your internet connection.' }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const departmentOptions = [
    'AUV',
    'CubeSAT',
    'Counter Drone System',
    'Web dev',
    'Socials',
    'Outreach',
    'Graphics design'
  ];

  const skillOptions = [
    'AI & ML',
    'ROS',
    'RnD',
    'Electronics and Embeded',
    'CAD Designing',
    'Ansys',
    'Web dev',
    'Graphics design',
    'Outreach',
    'Socials'
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden" id="recruitment-modal">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl transition-opacity duration-300" onClick={onClose}></div>

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-[#0a0a0a]/95 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.15)] flex flex-col max-h-[90vh] transition-all duration-300">
        
        {/* Animated Top border/bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"></div>

        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-[#0d0d0d]">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
              <span className="font-mono text-xs tracking-widest text-[#00E5FF] uppercase">Recruitment Portal</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1 text-glow">
              BlackVolt Technologies Application
            </h2>
          </div>
          <button 
            className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#070707] custom-scrollbar">
          
          {!isSubmitted ? (
            <div className="max-w-3xl mx-auto">
              
              {/* Stepper Progress Indicator */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#00E5FF] uppercase">Step {currentStep} of 4</span>
                  <span className="text-xs text-gray-400 font-mono">
                    {currentStep === 1 && 'Basic Details'}
                    {currentStep === 2 && 'Interest & Motivation'}
                    {currentStep === 3 && 'Technical Background'}
                    {currentStep === 4 && 'Final Declaration'}
                  </span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00E5FF] transition-all duration-500 ease-out shadow-[0_0_8px_rgba(0,229,255,0.7)]" 
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* STEP 1: BASIC DETAILS */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                          Full Name <span className="text-[#00E5FF]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full bg-[#111111] border ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#00E5FF]'} rounded-xl p-3 text-white text-sm focus:ring-0 focus:outline-none transition-colors`}
                        />
                        {errors.name && <p className="text-xs text-red-500 font-mono mt-1">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="regNo" className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                          Registration Number (as per institute) <span className="text-[#00E5FF]">*</span>
                        </label>
                        <input
                          type="text"
                          id="regNo"
                          name="regNo"
                          value={formData.regNo}
                          onChange={handleInputChange}
                          className={`w-full bg-[#111111] border ${errors.regNo ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#00E5FF]'} rounded-xl p-3 text-white text-sm focus:ring-0 focus:outline-none transition-colors`}
                        />
                        {errors.regNo && <p className="text-xs text-red-500 font-mono mt-1">{errors.regNo}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                          Student Email Address <span className="text-[#00E5FF]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full bg-[#111111] border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#00E5FF]'} rounded-xl p-3 text-white text-sm focus:ring-0 focus:outline-none transition-colors`}
                        />
                        {errors.email && <p className="text-xs text-red-500 font-mono mt-1">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="year" className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                          Academic Year <span className="text-[#00E5FF]">*</span>
                        </label>
                        <select
                          id="year"
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className={`w-full bg-[#111111] border ${errors.year ? 'border-red-500' : 'border-white/10 focus:border-[#00E5FF]'} rounded-xl p-3 text-white text-sm focus:ring-0 focus:outline-none transition-colors appearance-none`}
                        >
                          <option value="">Select Year</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="Passout">Passout</option>
                        </select>
                        {errors.year && <p className="text-xs text-red-500 font-mono mt-1">{errors.year}</p>}
                      </div>
                    </div>

                    <div className="space-y-2 max-w-md">
                      <label htmlFor="whatsapp" className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                        Contact (Whatsapp) <span className="text-[#00E5FF]">*</span>
                      </label>
                      <input
                        type="text"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className={`w-full bg-[#111111] border ${errors.whatsapp ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#00E5FF]'} rounded-xl p-3 text-white text-sm focus:ring-0 focus:outline-none transition-colors`}
                      />
                      {errors.whatsapp && <p className="text-xs text-red-500 font-mono mt-1">{errors.whatsapp}</p>}
                    </div>
                  </div>
                )}

                {/* STEP 2: INTEREST & MOTIVATION */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="space-y-2">
                      <label htmlFor="whyJoin" className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                        Why do you want to be part of BlackVolt Technologies Pvt. Ltd.? <span className="text-[#00E5FF]">*</span>
                      </label>
                      <textarea
                        id="whyJoin"
                        name="whyJoin"
                        rows={4}
                        value={formData.whyJoin}
                        onChange={handleInputChange}
                        className={`w-full bg-[#111111] border ${errors.whyJoin ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#00E5FF]'} rounded-xl p-3 text-white text-sm focus:ring-0 focus:outline-none transition-colors resize-none`}
                      />
                      {errors.whyJoin && <p className="text-xs text-red-500 font-mono mt-1">{errors.whyJoin}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="defenseTechExcites" className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                        What excites you most about Defense Tech? <span className="text-[#00E5FF]">*</span>
                      </label>
                      <textarea
                        id="defenseTechExcites"
                        name="defenseTechExcites"
                        rows={4}
                        value={formData.defenseTechExcites}
                        onChange={handleInputChange}
                        className={`w-full bg-[#111111] border ${errors.defenseTechExcites ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#00E5FF]'} rounded-xl p-3 text-white text-sm focus:ring-0 focus:outline-none transition-colors resize-none`}
                      />
                      {errors.defenseTechExcites && <p className="text-xs text-red-500 font-mono mt-1">{errors.defenseTechExcites}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="gainExpectation" className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                        What are you hoping to learn or gain by being part of this team? <span className="text-[#00E5FF]">*</span>
                      </label>
                      <textarea
                        id="gainExpectation"
                        name="gainExpectation"
                        rows={4}
                        value={formData.gainExpectation}
                        onChange={handleInputChange}
                        className={`w-full bg-[#111111] border ${errors.gainExpectation ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#00E5FF]'} rounded-xl p-3 text-white text-sm focus:ring-0 focus:outline-none transition-colors resize-none`}
                      />
                      {errors.gainExpectation && <p className="text-xs text-red-500 font-mono mt-1">{errors.gainExpectation}</p>}
                    </div>
                  </div>
                )}

                 {/* STEP 3: TECHNICAL BACKGROUND */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-300 block">
                        Which departments are you interested in joining? (Select all that apply) <span className="text-[#00E5FF]">*</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {departmentOptions.map(option => (
                          <div 
                            key={option}
                            onClick={() => handleDepartmentChange(option)}
                            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer select-none transition-all duration-300 ${
                              formData.departments.includes(option)
                                ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF]'
                                : 'bg-[#111111] border-white/5 text-gray-300 hover:border-white/20'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                              formData.departments.includes(option) ? 'bg-[#00E5FF] border-[#00E5FF]' : 'border-gray-500'
                            }`}>
                              {formData.departments.includes(option) && <span className="material-symbols-outlined text-xs text-black font-bold">check</span>}
                            </div>
                            <span className="text-xs font-medium">{option}</span>
                          </div>
                        ))}
                      </div>
                      {errors.departments && <p className="text-xs text-red-500 font-mono mt-1">{errors.departments}</p>}
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-gray-300 block">
                        Select your skills and rate your experience level for each (1 to 5): <span className="text-[#00E5FF]">*</span>
                      </label>
                      <div className="space-y-3">
                        {skillOptions.map(skill => {
                          const isSelected = formData.skills.includes(skill);
                          const rating = formData.skillRatings[skill] || 0;
                          return (
                            <div 
                              key={skill} 
                              onClick={() => handleSkillChange(skill)}
                              className={`p-4 border rounded-xl cursor-pointer select-none transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-[#00E5FF]/5 border-[#00E5FF]/50 text-white' 
                                  : 'bg-[#111111] border-white/5 text-gray-400 hover:border-white/20'
                              }`}
                            >
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                                    isSelected ? 'bg-[#00E5FF] border-[#00E5FF]' : 'border-gray-500'
                                  }`}>
                                    {isSelected && <span className="material-symbols-outlined text-xs text-black font-bold">check</span>}
                                  </div>
                                  <span className="text-sm font-medium">{skill}</span>
                                </div>

                                {isSelected && (
                                  <div 
                                    className="flex items-center gap-3 animate-in fade-in duration-300"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span className="text-xs text-gray-400">Experience:</span>
                                    <div className="flex gap-1">
                                      {[1, 2, 3, 4, 5].map((lvl) => (
                                        <button
                                          key={lvl}
                                          type="button"
                                          onClick={() => handleSkillRatingChange(skill, lvl)}
                                          className={`w-8 h-8 rounded-lg font-mono text-xs transition-all duration-300 border ${
                                            rating === lvl
                                              ? 'bg-[#00E5FF] border-[#00E5FF] text-black font-bold shadow-[0_0_8px_rgba(0,229,255,0.4)]'
                                              : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-[#00E5FF]/50 hover:text-[#00E5FF]'
                                          }`}
                                        >
                                          {lvl}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {errors.skills && <p className="text-xs text-red-500 font-mono mt-1">{errors.skills}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="techExperience" className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                        Briefly describe any relevant technical experience you have (Provide links to projects if any) <span className="text-[#00E5FF]">*</span>
                      </label>
                      <textarea
                        id="techExperience"
                        name="techExperience"
                        rows={4}
                        value={formData.techExperience}
                        onChange={handleInputChange}
                        className={`w-full bg-[#111111] border ${errors.techExperience ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#00E5FF]'} rounded-xl p-3 text-white text-sm focus:ring-0 focus:outline-none transition-colors resize-none`}
                      />
                      {errors.techExperience && <p className="text-xs text-red-500 font-mono mt-1">{errors.techExperience}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="resumeLink" className="text-sm font-semibold text-gray-300">
                        Link to your resume <span className="text-xs text-gray-500">(Optional but recommended)</span>
                      </label>
                      <input
                        type="url"
                        id="resumeLink"
                        name="resumeLink"
                        value={formData.resumeLink}
                        onChange={handleInputChange}
                        className="w-full bg-[#111111] border border-white/10 focus:border-[#00E5FF] rounded-xl p-3 text-white text-sm focus:ring-0 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: FINAL DECLARATION */}
                {currentStep === 4 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-300 block">
                        If selected, are you willing to be part of the team and grow with the project from the ground up? <span className="text-[#00E5FF]">*</span>
                      </label>
                      <div className="flex gap-4">
                        {['Yes', 'No'].map(val => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, foundingTeam: val }));
                              if (errors.foundingTeam) setErrors(prevErr => ({ ...prevErr, foundingTeam: undefined }));
                            }}
                            className={`flex-1 py-3 border rounded-xl transition-all duration-300 text-sm font-medium ${
                              formData.foundingTeam === val
                                ? 'bg-[#00E5FF] border-[#00E5FF] text-black font-bold'
                                : 'bg-[#111111] border-white/5 text-gray-300 hover:border-white/15'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                      {errors.foundingTeam && <p className="text-xs text-red-500 font-mono mt-1">{errors.foundingTeam}</p>}
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-300 block">
                        If selected, are you willing to contribute a minimum of 3 hours per day to the assigned project department? <span className="text-[#00E5FF]">*</span>
                      </label>
                      <div className="flex gap-4">
                        {['Yes', 'No'].map(val => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, hoursContribution: val }));
                              if (errors.hoursContribution) setErrors(prevErr => ({ ...prevErr, hoursContribution: undefined }));
                            }}
                            className={`flex-1 py-3 border rounded-xl transition-all duration-300 text-sm font-medium ${
                              formData.hoursContribution === val
                                ? 'bg-[#00E5FF] border-[#00E5FF] text-black font-bold'
                                : 'bg-[#111111] border-white/5 text-gray-300 hover:border-white/15'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                      {errors.hoursContribution && <p className="text-xs text-red-500 font-mono mt-1">{errors.hoursContribution}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="comments" className="text-sm font-semibold text-gray-300">
                        Any additional comments or questions for us?
                      </label>
                      <textarea
                        id="comments"
                        name="comments"
                        rows={3}
                        value={formData.comments}
                        onChange={handleInputChange}
                        className="w-full bg-[#111111] border border-white/10 focus:border-[#00E5FF] rounded-xl p-3 text-white text-sm focus:ring-0 focus:outline-none transition-colors resize-none"
                      />
                      {errors.comments && <p className="text-xs text-red-500 font-mono mt-1 text-center border border-red-500/20 bg-red-500/5 p-2 rounded-lg">{errors.comments}</p>}
                    </div>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-6 py-3 border border-gray-700 text-white hover:border-[#00E5FF] text-sm font-bold uppercase tracking-wider transition-colors duration-300 flex items-center gap-2 rounded-xl"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-[#00E5FF] text-black font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 flex items-center gap-2 rounded-xl ml-auto"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 bg-[#00E5FF] text-black font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 flex items-center gap-2 rounded-xl ml-auto ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'} <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </form>
            </div>
          ) : (
            /* Successful submission screen */
            <div className="max-w-md mx-auto text-center py-12 space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                <CheckCircle className="w-10 h-10 text-[#00E5FF] animate-bounce" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white font-display">Application Received!</h3>
                <p className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest">Secure Uplink Established</p>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed">
                Thank you for applying to join the team of <strong className="text-white">BlackVolt Technologies</strong>. Your application has been securely logged. Our evaluation team will review your application and get in touch with you for the interview round.
              </p>

              <button
                onClick={onClose}
                className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-[#00E5FF] transition-colors duration-300 rounded-xl"
              >
                Return to Homepage
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RecruitmentModal;