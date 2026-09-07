import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  FaSearch, FaDollarSign, FaMapMarkerAlt, FaBriefcase, FaSpinner,
  FaInfoCircle, FaCalendarAlt, FaExternalLinkAlt, FaTimesCircle, FaCopy,
  FaBuilding, FaTags, FaLightbulb, FaBriefcaseMedical, FaLink, FaHistory, FaUserCircle
} from 'react-icons/fa';

function Job() {
  const [salaryInfo, setSalaryInfo] = useState(null);
  const [error, setError] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const resultsRef = useRef(null);

  const [linkedInPositions, setLinkedInPositions] = useState([]);
  const [linkedInSkills, setLinkedInSkills] = useState([]);

  useEffect(() => {
    try {
      const storedSearches = localStorage.getItem('recentSearches');
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    } catch (e) {
      console.error(e);
    }
  }, [recentSearches]);

  const fetchSalaryData = async () => {
    if (!jobTitle.trim() || !location.trim()) {
      setError('Please enter both a job title and a location to search.');
      setSalaryInfo(null);
      toast.error('Both fields are required!');
      return;
    }

    setLoading(true);
    setError(null);
    setSalaryInfo(null);
    setLinkedInPositions([]);
    setLinkedInSkills([]);

    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/estimated-salary',
      params: {
        job_title: jobTitle,
        location,
        location_type: 'ANY',
        years_of_experience: 'ALL',
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      if (response.data?.data?.length > 0) {
        setSalaryInfo(response.data.data[0]);
        toast.success('Salary data fetched successfully!');
        const newSearch = { jobTitle, location };
        setRecentSearches(prevSearches => {
          const filtered = prevSearches.filter(s => s.jobTitle !== jobTitle || s.location !== location);
          return [newSearch, ...filtered].slice(0, 5);
        });
        fetchLinkedInProfileData('tedgaubert');
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        setError('No salary data found for your criteria. Try a different job title or location.');
        toast.error('No data found for this search.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch salary data. Please check your internet connection or try again later.');
      toast.error('Failed to fetch salary data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLinkedInProfileData = async (username) => {
    const options = {
      method: 'GET',
      url: 'https://linkedin-api8.p.rapidapi.com/profiles/position-skills',
      params: {
        username: username
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': 'linkedin-api8.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      if (response.data?.data?.items?.length > 0) {
        const positions = response.data.data.items.map(item => ({
          companyName: item.companyName,
          companyLogo: item.companyLogo?.[0]?.url,
          title: item.title,
          skills: item.skills,
          companyURL: item.companyURL
        }));
        setLinkedInPositions(positions);

        const allSkills = new Set();
        positions.forEach(pos => pos.skills?.forEach(skill => allSkills.add(skill)));
        setLinkedInSkills(Array.from(allSkills));

        toast.success(`LinkedIn profile data loaded for ${username}!`);
      } else {
        console.warn(`No LinkedIn profile data found for ${username}.`);
        setLinkedInPositions([]);
        setLinkedInSkills([]);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load LinkedIn profile data.');
      setLinkedInPositions([]);
      setLinkedInSkills([]);
    }
  };

  const clearInput = (field) => {
    if (field === 'jobTitle') setJobTitle('');
    if (field === 'location') setLocation('');
  };

  const copySalaryInfo = () => {
    if (salaryInfo) {
      const textToCopy = `Job: ${salaryInfo.job_title}\nLocation: ${salaryInfo.location}\nSalary Range: $${salaryInfo.min_salary?.toLocaleString('en-US', { maximumFractionDigits: 0 })} - $${salaryInfo.max_salary?.toLocaleString('en-US', { maximumFractionDigits: 0 })} / ${salaryInfo.salary_period}\nMedian Salary: $${salaryInfo.median_salary?.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
      navigator.clipboard.writeText(textToCopy)
        .then(() => toast.success('Salary info copied to clipboard!'))
        .catch(err => {
          console.error(err);
          toast.error('Failed to copy salary info.');
        });
    }
  };

  const removeSearch = (searchToRemove) => {
    setRecentSearches(prevSearches => {
      const updatedSearches = prevSearches.filter(
        (search) => search.jobTitle !== searchToRemove.jobTitle || search.location !== searchToRemove.location
      );
      toast.success('Search removed!');
      return updatedSearches;
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.2),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_28%),linear-gradient(180deg,_#06111c_0%,_#071725_45%,_#030712_100%)]" />
      <div className="absolute inset-0 noise-overlay opacity-35" />

      <div className="relative mx-auto max-w-7xl space-y-6">
        <section className="glass-panel overflow-hidden rounded-[2rem] border border-white/15 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-8 animate-rise-in">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
                <FaDollarSign className="shrink-0 align-middle text-emerald-300" />
                Career salary intelligence
              </div>

              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Find your next role with a premium, glass-style salary explorer.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Search by job title and location, review estimated salary bands, inspect sample profile insights, and use the negotiation guide to prepare confidently.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Search history", value: "Saved locally" },
                  { label: "Career data", value: "Salary and skills" },
                  { label: "Decision aid", value: "Negotiation tips" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-1 text-sm font-medium text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-[1.75rem] border border-white/15 p-5">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_35%,transparent_70%,rgba(255,255,255,0.07))]" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Quick snapshot</p>
                    <h2 className="text-2xl font-semibold text-white">A sharper job search experience</h2>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-emerald-300 backdrop-blur-xl">
                    <FaSearch className="shrink-0 align-middle" />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { title: "Estimated pay", value: "Instant" },
                    { title: "Recent searches", value: "Tap to reload" },
                    { title: "Profile insight", value: "Sample LinkedIn" },
                    { title: "Advice", value: "Negotiation-ready" },
                  ].map((item) => (
                    <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                      <p className="text-sm text-slate-400">{item.title}</p>
                      <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Interface polish</span>
                    <span>High</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 progress-bar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel rounded-[2rem] border border-white/15 p-5 sm:p-6 animate-rise-in delay-1">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="relative flex-1">
              <label className="mb-2 block text-sm text-slate-300">Job title</label>
              <FaBriefcase className="absolute left-4 top-[3.15rem] shrink-0 align-middle text-slate-400" />
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job Title (e.g., Data Scientist)"
                className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 py-3 pl-11 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/25 focus:bg-white/10"
                onKeyDown={(e) => e.key === 'Enter' && fetchSalaryData()}
                aria-label="Job Title"
              />
              {jobTitle && (
                <button
                  onClick={() => clearInput('jobTitle')}
                  className="absolute right-4 top-[3.05rem] text-slate-400 transition hover:text-red-300"
                  aria-label="Clear job title"
                >
                  <FaTimesCircle className="shrink-0 align-middle text-sm" />
                </button>
              )}
            </div>

            <div className="relative flex-1">
              <label className="mb-2 block text-sm text-slate-300">Location</label>
              <FaMapMarkerAlt className="absolute left-4 top-[3.15rem] shrink-0 align-middle text-slate-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (e.g., London)"
                className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 py-3 pl-11 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/25 focus:bg-white/10"
                onKeyDown={(e) => e.key === 'Enter' && fetchSalaryData()}
                aria-label="Location"
              />
              {location && (
                <button
                  onClick={() => clearInput('location')}
                  className="absolute right-4 top-[3.05rem] text-slate-400 transition hover:text-red-300"
                  aria-label="Clear location"
                >
                  <FaTimesCircle className="shrink-0 align-middle text-sm" />
                </button>
              )}
            </div>

            <button
              onClick={fetchSalaryData}
              className={`inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-50 ${
                loading ? 'cursor-not-allowed opacity-70' : ''
              }`}
              disabled={loading}
              aria-label="Search"
            >
              {loading ? (
                <FaSpinner className="mr-2 shrink-0 align-middle animate-spin" />
              ) : (
                <FaSearch className="mr-2 shrink-0 align-middle" />
              )}
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {recentSearches.length > 0 && (
            <div className="mt-5 border-t border-white/10 pt-5 animate-rise-in delay-2">
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-300">
                <FaHistory className="shrink-0 align-middle text-emerald-300" /> Recent searches
              </p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => {
                        setJobTitle(search.jobTitle);
                        setLocation(search.location);
                        toast(`Loaded: ${search.jobTitle} in ${search.location}`);
                        fetchSalaryData();
                      }}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 pr-9 text-xs text-slate-200 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10"
                      title={`Search for ${search.jobTitle} in ${search.location}`}
                    >
                      {search.jobTitle} in {search.location}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSearch(search);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-red-300"
                      aria-label={`Remove search for ${search.jobTitle} in ${search.location}`}
                      title="Remove search"
                    >
                      <FaTimesCircle className="shrink-0 align-middle text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-6">
            {loading && (
              <div className="glass-panel rounded-[2rem] border border-white/15 p-6 animate-rise-in delay-1">
                <div className="flex h-60 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/5">
                  <FaSpinner className="shrink-0 align-middle text-4xl text-emerald-300 animate-spin" />
                </div>
                <p className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-300">
                  <FaSpinner className="mr-2 shrink-0 align-middle animate-spin" /> Loading estimated salary data...
                </p>
              </div>
            )}

            {error && (
              <div className="glass-panel rounded-[2rem] border border-red-400/20 p-6 text-sm text-red-100 animate-rise-in delay-1">
                <div className="flex items-start gap-3 rounded-[1.4rem] border border-red-400/20 bg-red-500/10 p-4">
                  <FaInfoCircle className="mt-0.5 shrink-0 align-middle text-red-300" />
                  <p>{error}</p>
                </div>
                <button
                  onClick={fetchSalaryData}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                >
                  <FaSearch className="shrink-0 align-middle" /> Try Search Again
                </button>
              </div>
            )}

            {salaryInfo && (
              <div ref={resultsRef} className="glass-panel space-y-5 rounded-[2rem] border border-white/15 p-6 animate-rise-in delay-2">
                <div className="flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Salary overview</p>
                    <h2 className="mt-1 text-2xl font-semibold text-white flex items-center gap-2 flex-wrap">
                      <FaBriefcaseMedical className="shrink-0 align-middle text-emerald-300" /> {salaryInfo.job_title}
                      <span className="flex items-center gap-1 text-base font-normal text-slate-300">
                        <FaMapMarkerAlt className="shrink-0 align-middle text-sm" /> {salaryInfo.location}
                      </span>
                    </h2>
                  </div>
                  <button
                    onClick={copySalaryInfo}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur-xl transition hover:bg-white/10"
                    aria-label="Copy salary info"
                    title="Copy salary information"
                  >
                    <FaCopy className="shrink-0 align-middle" /> Copy
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Salary Range</p>
                    <p className="text-2xl font-semibold text-white">
                      ${salaryInfo.min_salary?.toLocaleString('en-US', { maximumFractionDigits: 0 })} - ${salaryInfo.max_salary?.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs capitalize mt-1 text-slate-400">per {salaryInfo.salary_period?.toLowerCase() || 'period'}</p>
                  </div>
                  <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Median Salary</p>
                    <p className="text-2xl font-semibold text-emerald-300">
                      ${salaryInfo.median_salary?.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs capitalize mt-1 text-slate-400">per {salaryInfo.salary_period?.toLowerCase() || 'period'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Base Salary</p>
                    <p className="text-lg font-medium text-white">
                      ${salaryInfo.min_base_salary?.toLocaleString('en-US', { maximumFractionDigits: 0 })} - ${salaryInfo.max_base_salary?.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Additional Pay</p>
                    <p className="text-lg font-medium text-white">
                      ${salaryInfo.min_additional_pay?.toLocaleString('en-US', { maximumFractionDigits: 0 })} - ${salaryInfo.max_additional_pay?.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 border-t border-white/10 pt-5 text-sm text-slate-300 sm:grid-cols-3">
                  <p className="flex items-center gap-2">
                    <FaBuilding className="shrink-0 align-middle text-emerald-300" />
                    Publisher:{' '}
                    <a
                      href={salaryInfo.publisher_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-cyan-300 hover:underline"
                    >
                      {salaryInfo.publisher_name || 'N/A'}
                      <FaExternalLinkAlt className="shrink-0 align-middle text-xs" />
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaInfoCircle className="shrink-0 align-middle text-emerald-300" />
                    Confidence: <span className="font-medium text-white">{salaryInfo.confidence || 'N/A'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="shrink-0 align-middle text-emerald-300" />
                    Updated:{' '}
                    <span className="font-medium text-white">
                      {salaryInfo.salaries_updated_at ? new Date(salaryInfo.salaries_updated_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {!loading && !error && linkedInPositions.length > 0 && (
              <div className="glass-panel rounded-[2rem] border border-white/15 p-6 animate-rise-in delay-3">
                <h3 className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3 text-lg font-semibold text-white">
                  <FaUserCircle className="shrink-0 align-middle text-cyan-300" /> Companies from sample profile: Ted Gaubert
                </h3>
                <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {linkedInPositions.map((pos, index) => (
                      <a
                        key={index}
                        href={pos.companyURL || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center rounded-[1.35rem] border border-white/10 bg-white/5 p-3 text-center transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                        title={`View ${pos.companyName}'s LinkedIn page or related jobs`}
                      >
                        <img
                          src={pos.companyLogo || 'https://via.placeholder.com/40/F3F4F6/9CA3AF?text=Co'}
                          alt={`${pos.companyName} logo`}
                          className="mb-2 h-10 w-10 flex-shrink-0 object-contain transition-transform group-hover:scale-105"
                        />
                        <p className="text-sm font-medium text-white">{pos.companyName}</p>
                        <p className="mt-1 w-full truncate text-xs text-slate-400">{pos.title}</p>
                        <FaExternalLinkAlt className="mt-2 shrink-0 align-middle text-xs text-cyan-300 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  <FaInfoCircle className="mr-1 inline-block shrink-0 align-middle" />
                  This section displays companies and roles from a sample LinkedIn profile to demonstrate API integration.
                </p>
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <div className="glass-panel rounded-[2rem] border border-white/15 p-6 animate-rise-in delay-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-300">Negotiation notes</p>
                  <h3 className="text-xl font-semibold text-white">How to use the result</h3>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-amber-300 backdrop-blur-xl">
                  <FaLightbulb className="shrink-0 align-middle" />
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                  <FaInfoCircle className="mt-0.5 shrink-0 align-middle text-emerald-300" />
                  Research the range before interviews so you can anchor confidently.
                </li>
                <li className="flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                  <FaInfoCircle className="mt-0.5 shrink-0 align-middle text-emerald-300" />
                  Compare base pay, bonuses, equity, and PTO before accepting an offer.
                </li>
                <li className="flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                  <FaInfoCircle className="mt-0.5 shrink-0 align-middle text-emerald-300" />
                  Keep a written record of the final package so nothing gets lost.
                </li>
              </ul>

              <p className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                <FaLink className="shrink-0 align-middle text-emerald-300" />
                <a href="https://www.forbes.com/sites/ashleystahl/2023/11/07/how-to-negotiate-salary-like-a-pro/?sh=4b7e19d67b0d" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">
                  Learn more about salary negotiation.
                </a>
              </p>
            </div>

            {linkedInSkills.length > 0 && (
              <div className="glass-panel rounded-[2rem] border border-white/15 p-6 animate-rise-in delay-3">
                <h3 className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3 text-lg font-semibold text-white">
                  <FaTags className="shrink-0 align-middle text-violet-300" /> Key skills from sample profile
                </h3>
                <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="flex flex-wrap gap-2">
                    {linkedInSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur-xl"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  <FaInfoCircle className="mr-1 inline-block shrink-0 align-middle" />
                  These skills are extracted from the sample LinkedIn profile's work experience.
                </p>
              </div>
            )}

            {!salaryInfo && !error && !loading && (jobTitle.trim() === '' && location.trim() === '') && (
              <div className="glass-panel rounded-[2rem] border border-white/15 p-5 text-sm text-slate-300 animate-rise-in delay-3">
                <div className="flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 p-4">
                  <FaInfoCircle className="shrink-0 align-middle text-emerald-300" />
                  Enter a job title and location to find salary estimates and career insights instantly.
                </div>
              </div>
            )}
          </aside>
        </div>

        <footer className="pb-4 text-center text-xs text-slate-400 sm:pb-6">
          Salary tools, profile insights, and negotiation guidance presented in the same glassmorphism theme.
        </footer>
      </div>
    </div>
  );
}

export default Job;