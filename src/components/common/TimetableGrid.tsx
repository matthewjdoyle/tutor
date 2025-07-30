import React from 'react';

interface Task {
  time: string;
  subject: string;
  topic: string;
}

interface DailySession {
  day: string;
  tasks: Task[];
}

interface WeeklySchedule {
  week: number;
  dates: string;
  dailySessions: DailySession[];
}

interface TimetableGridProps {
  schedule: WeeklySchedule;
}

// Helper to convert HH:MM to minutes from midnight
const timeToMinutes = (timeStr: string) => {
  const [hour, minute] = timeStr.split(':').map(Number);
  return hour * 60 + minute;
};

export const TimetableGrid: React.FC<TimetableGridProps> = ({ schedule }) => {
  // 1. Determine which days have tasks and maintain canonical order
  const canonicalDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const daysWithTasks = new Set(schedule.dailySessions.flatMap(s => s.tasks.length > 0 ? [s.day] : []));
  
  if (daysWithTasks.size === 0) {
    return (
      <div className="bg-neutral-surface p-4 rounded-xl border border-neutral-border mt-8 text-center text-text-muted">
        <h3 className="text-xl font-bold text-text-primary mb-2">
          Week {schedule.week} ({schedule.dates}) - Grid View
        </h3>
        <p>No study sessions planned for this week.</p>
      </div>
    );
  }

  const activeDays = canonicalDays.filter(day => daysWithTasks.has(day));

  // 2. Determine the time range of tasks for the week
  let minStart = 24 * 60;
  let maxEnd = 0;

  schedule.dailySessions.forEach(session => {
    session.tasks.forEach(task => {
      const [start, end] = task.time.split(' - ');
      minStart = Math.min(minStart, timeToMinutes(start));
      maxEnd = Math.max(maxEnd, timeToMinutes(end));
    });
  });

  const firstSlotStartMinutes = Math.floor(minStart / 30) * 30;
  const lastSlotEndMinutes = Math.ceil(maxEnd / 30) * 30;

  const activeTimeSlots = [];
  for (let m = firstSlotStartMinutes; m < lastSlotEndMinutes; m += 30) {
    const hour = Math.floor(m / 60);
    const minute = m % 60;
    activeTimeSlots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
  }

  // 4. Render the dynamic grid
  return (
    <div className="bg-neutral-surface p-3 rounded-xl border border-neutral-border mt-6 overflow-x-auto">
      <h3 className="text-lg font-bold text-text-primary mb-3 text-center">
        Week {schedule.week} ({schedule.dates}) - Grid View
      </h3>
      <div 
        className="grid relative"
        style={{
          gridTemplateColumns: `auto repeat(${activeDays.length}, minmax(110px, 1fr))`,
          gridTemplateRows: `auto repeat(${activeTimeSlots.length}, 3.5rem)`, // h-14 = 3.5rem
        }}
      >
        {/* Day Headers */}
        <div style={{ gridColumn: 1, gridRow: 1 }} className="sticky top-0 left-0 z-20 bg-neutral-surface" /> 
        {activeDays.map((day) => (
          <div key={day} className="text-center font-semibold sticky top-0 bg-neutral-surface z-10 pb-1 border-b border-l border-neutral-border px-2 flex items-center justify-center text-xs">
            {day}
          </div>
        ))}

        {/* Time Slot Labels and Grid Lines */}
        {activeTimeSlots.map((time, timeIndex) => (
          <React.Fragment key={time}>
            <div className="text-center text-xs text-text-muted pr-1 flex items-center justify-center sticky left-0 bg-neutral-surface z-10 border-t border-r border-neutral-border">
              {time}
            </div>
            {activeDays.map((_, dayIndex) => (
              <div
                key={`${timeIndex}-${dayIndex}`}
                className="border-t border-l border-neutral-border"
                style={{ gridRow: timeIndex + 2, gridColumn: dayIndex + 2 }}
              />
            ))}
          </React.Fragment>
        ))}

        {/* Task Items */}
        {schedule.dailySessions.map(session => {
          const dayIndex = activeDays.indexOf(session.day);
          if (dayIndex === -1) return null;

          return session.tasks.map(task => {
            const [start, end] = task.time.split(' - ');
            const startMinutes = timeToMinutes(start);
            const endMinutes = timeToMinutes(end);

            if (startMinutes >= endMinutes) return null;

            const startIndex = Math.floor((startMinutes - firstSlotStartMinutes) / 30);
            const endIndex = Math.ceil((endMinutes - firstSlotStartMinutes) / 30);
            const durationSlots = endIndex - startIndex;

            if (startIndex < 0 || startIndex >= activeTimeSlots.length || durationSlots <= 0) {
              return null;
            }

            return (
              <div
                key={`${session.day}-${task.time}`}
                className="bg-brand-primary/10 text-brand-primary-dark rounded-md p-1.5 m-px flex flex-col text-xs overflow-hidden z-20"
                style={{
                  gridColumnStart: dayIndex + 2,
                  gridRowStart: startIndex + 2,
                  gridRowEnd: `span ${durationSlots}`,
                }}
              >
                <p className="font-bold">{task.subject}</p>
                <p className="opacity-80 truncate">{task.topic}</p>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};