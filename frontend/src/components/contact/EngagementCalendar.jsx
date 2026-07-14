import PropTypes from 'prop-types';
import { useLanguage } from '../../context/LanguageContext';

const WEEKDAYS_EN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const WEEKDAYS_NP = ['आ', 'सो', 'मं', 'बु', 'बि', 'शु', 'श'];

export default function EngagementCalendar({ engagementDate }) {
  const { t, lang } = useLanguage();

  if (!engagementDate) return null;

  const date = new Date(engagementDate);
  // Dates are stored without a time selection. Use UTC components so every
  // visitor sees the admin-selected date, regardless of their local timezone.
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const highlightDay = date.getUTCDate();

  const monthName = date.toLocaleDateString(lang === 'np' ? 'ne-NP' : 'en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const weekdays = lang === 'np' ? WEEKDAYS_NP : WEEKDAYS_EN;

  const cells = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, isOutside: true, isHighlighted: false });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, isOutside: false, isHighlighted: day === highlightDay });
  }
  const trailing = (7 - (cells.length % 7)) % 7;
  for (let day = 1; day <= trailing; day++) {
    cells.push({ day, isOutside: true, isHighlighted: false });
  }

  return (
    <aside className="card engagement-calendar" aria-label={t('Engagement calendar', 'कार्यक्रम क्यालेन्डर')}>
      <div className="engagement-cal-top">
        <div className="engagement-cal-icon">
          <i className="fas fa-calendar-alt" />
        </div>
        <h4 className="engagement-cal-month">{monthName}</h4>
      </div>

      <div className="engagement-cal-weekdays">
        {weekdays.map((d) => (
          <span key={d} className="engagement-cal-weekday">{d}</span>
        ))}
      </div>

      <div className="engagement-cal-grid">
        {cells.map((cell, idx) => (
          <div
            key={`${cell.isOutside ? 'o' : 'c'}-${cell.day}-${idx}`}
            className={[
              'engagement-cal-day',
              cell.isOutside ? 'engagement-cal-day--outside' : '',
              cell.isHighlighted ? 'engagement-cal-day--highlighted' : ''
            ].filter(Boolean).join(' ')}
            aria-label={cell.isHighlighted ? t('Engagement date', 'कार्यक्रम मिति') : undefined}
            aria-hidden={cell.isOutside ? 'true' : undefined}
          >
            {cell.isHighlighted ? (
              <span className="engagement-cal-highlight">
                <span className="engagement-cal-highlight-num">{cell.day}</span>
                <span className="engagement-cal-highlight-dot" />
              </span>
            ) : (
              cell.day
            )}
          </div>
        ))}
      </div>

      <div className="engagement-cal-notice">
        <i className="fas fa-info-circle" />
        <span>{t('Only the date of upcoming engagement is shown.', 'आगामी कार्यक्रमको मिति मात्र देखाइएको छ।')}</span>
      </div>
    </aside>
  );
}

EngagementCalendar.propTypes = {
  engagementDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};
