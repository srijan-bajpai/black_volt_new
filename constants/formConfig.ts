export const GOOGLE_FORM_CONFIG = {
  // REPLACE this with your Google Form Action URL (ends with /formResponse)
  // Example: https://docs.google.com/forms/d/e/1FAIpQLSfxxxxxxxxx/formResponse
  submitUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfp-YOUR-FORM-ID/formResponse',
  
  // Map each React state field to the corresponding Google Form "entry.XXXXXXXX" name.
  // We extracted the first few IDs from your HTML snippet. Please replace the placeholders.
  fields: {
    name: 'entry.826355120',                  // Extracted from HTML
    regNo: 'entry.2076415673',                // Extracted from HTML
    email: 'entry.1149713456',                // Extracted from HTML
    year: 'entry.768435866',                  // Extracted from HTML
    whatsapp: 'entry.YOUR_WHATSAPP_ID',        // Replace with actual entry.XXXX ID
    whyJoin: 'entry.YOUR_WHY_JOIN_ID',        // Replace with actual entry.XXXX ID
    defenseTechExcites: 'entry.YOUR_DEFENSE_TECH_ID', // Replace with actual entry.XXXX ID
    gainExpectation: 'entry.YOUR_GAIN_ID',    // Replace with actual entry.XXXX ID
    interests: 'entry.YOUR_INTERESTS_ID',      // Replace with actual entry.XXXX ID
    experienceLevel: 'entry.YOUR_EXP_LEVEL_ID', // Replace with actual entry.XXXX ID
    techExperience: 'entry.YOUR_TECH_EXP_ID',  // Replace with actual entry.XXXX ID
    resumeLink: 'entry.YOUR_RESUME_LINK_ID',  // Replace with actual entry.XXXX ID
    foundingTeam: 'entry.YOUR_FOUNDING_TEAM_ID', // Replace with actual entry.XXXX ID
    hoursContribution: 'entry.YOUR_HOURS_ID',  // Replace with actual entry.XXXX ID
    comments: 'entry.YOUR_COMMENTS_ID'        // Replace with actual entry.XXXX ID
  }
};
