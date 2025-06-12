import React, { useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = Array.from({ length: 30 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8; // Start from 8 AM
  const minute = i % 2 === 0 ? '00' : '30';
  const displayHour = hour > 12 ? hour - 12 : hour;
  const period = hour >= 12 ? 'PM' : 'AM';
  return {
    id: `${hour.toString().padStart(2, '0')}:${minute}`,
    label: i % 2 === 0 ? `${displayHour} ${period}` : '',
  };
});

type StudyTimes = {
  [day: string]: string[];
};

interface InteractiveTimeSelectorProps {
  studyTimes: StudyTimes;
  onChange: (newStudyTimes: StudyTimes) => void;
}

export const InteractiveTimeSelector: React.FC<InteractiveTimeSelectorProps> = ({ studyTimes, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleSlotClick = (day: string, slotId: string) => {
    const daySlots = studyTimes[day] || [];
    const newSlots = daySlots.includes(slotId)
      ? daySlots.filter(s => s !== slotId)
      : [...daySlots, slotId];
    onChange({ ...studyTimes, [day]: newSlots });
  };
  
  const handleMouseDown = (day: string, slotId: string) => {
    setIsDragging(true);
    handleSlotClick(day, slotId);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseEnter = (day: string, slotId: string) => {
    if (isDragging) {
      const daySlots = studyTimes[day] || [];
      if (!daySlots.includes(slotId)) {
        const newSlots = [...daySlots, slotId];
        onChange({ ...studyTimes, [day]: newSlots });
      }
    }
  };

  return (
    <div className="bg-neutral-surface p-4 rounded-xl border border-neutral-border touch-none" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <div className="grid grid-cols-8 gap-1">
        {/* Time column */}
        <div className="text-center text-xs text-text-muted">
          {timeSlots.map(slot => (
            <div key={slot.id} className="h-6 flex items-center justify-center">
              {slot.label}
            </div>
          ))}
        </div>
        
        {/* Day columns */}
        {daysOfWeek.map(day => (
          <div key={day} className="text-center">
            <div className="font-semibold text-text-primary mb-1">{day}</div>
            {timeSlots.map(slot => {
              const isSelected = studyTimes[day]?.includes(slot.id);
              return (
                <motion.div
                  key={slot.id}
                  onMouseDown={() => handleMouseDown(day, slot.id)}
                  onMouseEnter={() => handleMouseEnter(day, slot.id)}
                  className={`h-6 border-t border-neutral-border/50 cursor-pointer transition-colors ${
                    isSelected ? 'bg-brand-primary' : 'bg-neutral-bg hover:bg-brand-primary/20'
                  }`}
                  whileTap={{ scale: 0.95 }}
                />
              );
            })}
          </div>
        ))}
      </div>
       <p className="text-xs text-text-muted text-center mt-3">Click or drag on the schedule to select your preferred study times.</p>
    </div>
  );
}; 