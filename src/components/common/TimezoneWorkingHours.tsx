import React, { useState } from 'react';

// List of common timezones users can choose from. Feel free to extend.
const TIMEZONES: { label: string; value: string }[] = [
  { label: 'GMT / UTC', value: 'UTC' },
  { label: 'US Eastern (ET)', value: 'America/New_York' },
  { label: 'US Central (CT)', value: 'America/Chicago' },
  { label: 'US Pacific (PT)', value: 'America/Los_Angeles' },
  { label: 'Central European (CET)', value: 'Europe/Berlin' },
  { label: 'India Standard Time (IST)', value: 'Asia/Kolkata' },
  { label: 'China Standard Time', value: 'Asia/Shanghai' },
  { label: 'Japan Standard Time', value: 'Asia/Tokyo' },
  { label: 'Australia Eastern (AEST)', value: 'Australia/Sydney' },
];

// Helper to format a given UTC time for a target timezone
const formatTime = (hour: number, minute: number, timeZone: string) => {
  const date = new Date(Date.UTC(2020, 0, 1, hour, minute)); // Fixed date ensures no DST surprises
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  });
};

export const TimezoneWorkingHours: React.FC = () => {
  const [timezone, setTimezone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  );

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="tz-select" className="font-medium mr-2 text-text-primary">
          Select your timezone:
        </label>
        <select
          id="tz-select"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="border border-neutral-border rounded px-2 py-1 bg-white text-sm"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>

      <ul className="list-disc pl-6 text-text-secondary text-sm space-y-1">
        <li>
          Monday – Thursday: {formatTime(9, 0, timezone)} –{' '}
          {formatTime(23, 0, timezone)}
        </li>
        <li>
          Friday: {formatTime(9, 0, timezone)} – {formatTime(13, 0, timezone)}
        </li>
        <li>No regular hours on weekends (availability announced occasionally).</li>
      </ul>
    </div>
  );
};

export default TimezoneWorkingHours; 