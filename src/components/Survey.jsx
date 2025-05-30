import { useState } from 'react';

const questionGroups = [
  [
    {
      key: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
    },
    {
      key: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
    },
    {
      key: 'country',
      label: 'Country/Location',
      type: 'text',
      required: true,
    },
  ],
  [
    {
      key: 'currentRole',
      label: 'Current Role',
      type: 'select',
      options: [
        { value: '', label: 'Select a role' },
        { value: 'student', label: 'Student' },
        { value: 'professional', label: 'Professional' },
        { value: 'researcher', label: 'Researcher' },
        { value: 'entrepreneur', label: 'Entrepreneur' },
        { value: 'other', label: 'Other' },
      ],
      required: true,
    },
    {
      key: 'otherRole',
      label: 'Other Role',
      type: 'text',
      showIf: (data) => data.currentRole === 'other',
      placeholder: 'Please specify',
    },
  ],
  [
    {
      key: 'skills',
      label: 'What skills do you bring to a team?',
      type: 'checkboxGroup',
      options: [
        { value: 'coding', label: 'Coding / technical' },
        { value: 'dataAnalysis', label: 'Data analysis / research' },
        { value: 'writing', label: 'Writing / documentation' },
        { value: 'design', label: 'Design / prototyping' },
        { value: 'fundraising', label: 'Fundraising / budgeting' },
        { value: 'projectManagement', label: 'Project management' },
      ],
      extraInput: { key: 'otherSkills', placeholder: 'Other skills' },
    },
  ],
  [
    {
      key: 'hasCollaborated',
      label: 'Have you worked on collaborative projects or research before?',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
    {
      key: 'projectDescription',
      label: 'If yes, briefly describe a past project or role',
      type: 'textarea',
      showIf: (data) => data.hasCollaborated === 'yes',
    },
    {
      key: 'canLead',
      label: 'Are you comfortable leading a team or managing tasks?',
      type: 'select',
      options: [
        { value: '', label: 'Select an option' },
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'maybe', label: 'Maybe' },
      ],
    },
  ],
  [
    {
      key: 'wantsToPropose',
      label: 'Do you want to propose a new project?',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
    {
      key: 'projectTitle',
      label: 'Project Title',
      type: 'text',
      showIf: (data) => data.wantsToPropose === 'yes',
    },
    {
      key: 'projectIdea',
      label: 'Describe your project idea or goal',
      type: 'textarea',
      showIf: (data) => data.wantsToPropose === 'yes',
    },
    {
      key: 'fundingNeeded',
      label: 'How much funding do you think your project needs?',
      type: 'select',
      options: [
        { value: '', label: 'Select an amount' },
        { value: '0-500', label: '$0–$500' },
        { value: '500-5000', label: '$500–$5,000' },
        { value: '5000-25000', label: '$5,000–$25,000' },
        { value: '25000+', label: '$25,000+' },
      ],
      showIf: (data) => data.wantsToPropose === 'yes',
    },
    {
      key: 'idealTeammates',
      label: 'What are your ideal teammate qualities or skills?',
      type: 'textarea',
      showIf: (data) => data.wantsToPropose === 'yes',
    },
  ],
  [
    {
      key: 'interests',
      label: 'What are your interest areas? (Select up to 3)',
      type: 'checkboxGroup',
      options: [
        { value: 'health', label: 'Health & wellness' },
        { value: 'ai', label: 'AI / Data Science' },
        { value: 'sustainability', label: 'Sustainability / Environment' },
        { value: 'education', label: 'Education' },
        { value: 'arts', label: 'Arts / Media' },
        { value: 'robotics', label: 'Robotics / Hardware' },
        { value: 'socialImpact', label: 'Social Impact' },
        { value: 'openSource', label: 'Open Source' },
      ],
      extraInput: { key: 'otherInterests', placeholder: 'Other interests' },
      max: 3,
    },
    {
      key: 'problemStatement',
      label: 'In your own words, what kind of problem would you like to work on?',
      type: 'textarea',
    },
  ],
  [
    {
      key: 'weeklyHours',
      label: 'How many hours can you commit weekly?',
      type: 'select',
      options: [
        { value: '', label: 'Select hours' },
        { value: '<2', label: '<2' },
        { value: '2-5', label: '2–5' },
        { value: '5-10', label: '5–10' },
        { value: '10+', label: '10+' },
      ],
    },
    {
      key: 'timezone',
      label: 'What is your time zone?',
      type: 'text',
      placeholder: 'e.g., PST, EST, GMT+8',
    },
    {
      key: 'workingPreferences',
      label: 'Preferred way of working',
      type: 'checkboxGroup',
      options: [
        { value: 'async', label: 'Async / flexible hours' },
        { value: 'scheduled', label: 'Scheduled team meetings' },
        { value: 'casual', label: 'Casual / relaxed pace' },
        { value: 'structured', label: 'Structured / deadline-driven' },
      ],
    },
  ],
  [
    {
      key: 'fundingImportance',
      label: 'How important is funding to your project success?',
      type: 'select',
      options: [
        { value: '', label: 'Select importance' },
        { value: 'notImportant', label: 'Not important' },
        { value: 'helpful', label: 'Helpful but optional' },
        { value: 'essential', label: 'Essential' },
      ],
    },
    {
      key: 'hasAppliedForGrant',
      label: 'Have you ever applied for a grant before?',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  ],
];

const initialFormData = {
  fullName: '',
  email: '',
  country: '',
  currentRole: '',
  otherRole: '',
  skills: [],
  otherSkills: '',
  hasCollaborated: '',
  projectDescription: '',
  canLead: '',
  wantsToPropose: '',
  projectTitle: '',
  projectIdea: '',
  fundingNeeded: '',
  idealTeammates: '',
  interests: [],
  otherInterests: '',
  problemStatement: '',
  weeklyHours: '',
  timezone: '',
  workingPreferences: [],
  fundingImportance: '',
  hasAppliedForGrant: '',
};

function Survey() {
  const [formData, setFormData] = useState(initialFormData);
  const [page, setPage] = useState(0);
  const totalPages = questionGroups.length;

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target;
      if (name === 'skills' || name === 'interests' || name === 'workingPreferences') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };
  const handleBack = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    alert('Survey submitted!');
    console.log(formData);
  };

  const renderQuestion = (q) => {
    if (q.showIf && !q.showIf(formData)) return null;
    switch (q.type) {
      case 'text':
      case 'email':
        return (
          <div key={q.key} className="mb-4">
            <label className="block mb-1 font-medium">{q.label}</label>
            <input
              type={q.type}
              name={q.key}
              value={formData[q.key]}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder={q.placeholder || ''}
              required={q.required}
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={q.key} className="mb-4">
            <label className="block mb-1 font-medium">{q.label}</label>
            <textarea
              name={q.key}
              value={formData[q.key]}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
        );
      case 'select':
        return (
          <div key={q.key} className="mb-4">
            <label className="block mb-1 font-medium">{q.label}</label>
            <select
              name={q.key}
              value={formData[q.key]}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required={q.required}
            >
              {q.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );
      case 'radio':
        return (
          <div key={q.key} className="mb-4">
            <label className="block mb-1 font-medium">{q.label}</label>
            <div className="flex gap-6 mt-1">
              {q.options.map(opt => (
                <label key={opt.value} className="inline-flex items-center">
                  <input
                    type="radio"
                    name={q.key}
                    value={opt.value}
                    checked={formData[q.key] === opt.value}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="ml-2">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'checkboxGroup':
        return (
          <div key={q.key} className="mb-4">
            <label className="block mb-1 font-medium">{q.label}</label>
            <div className="flex flex-col gap-2 mt-1">
              {q.options.map(opt => (
                <label key={opt.value} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name={q.key}
                    value={opt.value}
                    checked={formData[q.key].includes(opt.value)}
                    onChange={handleInputChange}
                    className="form-checkbox"
                    disabled={q.max && formData[q.key].length >= q.max && !formData[q.key].includes(opt.value)}
                  />
                  <span className="ml-2">{opt.label}</span>
                </label>
              ))}
              {q.extraInput && (
                <input
                  type="text"
                  name={q.extraInput.key}
                  value={formData[q.extraInput.key]}
                  onChange={handleInputChange}
                  placeholder={q.extraInput.placeholder}
                  className="w-full p-2 border rounded mt-2"
                />
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 relative"
        style={{ minHeight: 420 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Project Survey</h2>
        {questionGroups[page].map(renderQuestion)}
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={handleBack}
            disabled={page === 0}
            className={`px-4 py-2 rounded font-medium ${page === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Back
          </button>
          {page < totalPages - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-teal-700 text-white rounded font-semibold hover:bg-teal-800 shadow"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-teal-700 text-white rounded font-semibold hover:bg-teal-800 shadow"
            >
              Submit
            </button>
          )}
        </div>
        <div className="absolute bottom-6 right-8 text-gray-400 text-sm select-none">
          Page {page + 1} / {totalPages}
        </div>
      </form>
    </div>
  );
}

export default Survey; 