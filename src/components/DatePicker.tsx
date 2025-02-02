import React, { useState, useEffect, useRef } from 'react';
import moment from 'jalali-moment';

// Helper function to check if the year is a leap year
const isLeapYear = (year: number) => moment.jIsLeapYear(year);

// Generate the number of days in a Jalali month
const generateDaysInMonth = (year: number, month: number) => {
    if (month <= 6) return 31;
    else if (month <= 11) return 30;
    else return isLeapYear(year) ? 30 : 29;
};

// Persian months and week days
const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
const persianWeeks = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

interface DatePickerProps {
    onChange: (date: string) => void;
    value: string | null;
    disabled?: boolean;
    placeholderText?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    dir?: "rtl" | "ltr";
    // Tailwind class props
    className?: string;
    containerClassName?: string;
    inputClassName?: string;
    popupClassName?: string;
    headerClassName?: string;
    weeksClassName?: string;
    weekItemClassName?: string;
    daysClassName?: string;
    dayClassName?: string;
    selectedDayClassName?: string;
    holidayClassName?: string;
    todayClassName?: string;
    monthsGridClassName?: string;
    monthItemClassName?: string;
    selectedMonthClassName?: string;
    yearsGridClassName?: string;
    yearItemClassName?: string;
    selectedYearClassName?: string;
    arrowClassName?: string;
}

const SizeMap = {
    xs: { base: 'text-xs', header: 'text-sm' },
    sm: { base: 'text-sm', header: 'text-base' },
    md: { base: 'text-base', header: 'text-lg' },
    lg: { base: 'text-lg', header: 'text-xl' },
    xl: { base: 'text-xl', header: 'text-2xl' },
};

const DatePicker: React.FC<DatePickerProps> = ({
                                                   onChange,
                                                   value,
                                                   disabled = false,
                                                   placeholderText = 'تاریخ انتخاب کنید',
                                                   size = 'md',
                                                   dir = 'rtl',
                                                   // Tailwind classes with defaults
                                                   className = '',
                                                   containerClassName = '',
                                                   inputClassName = '',
                                                   popupClassName = '',
                                                   headerClassName = '',
                                                   weeksClassName = '',
                                                   weekItemClassName = '',
                                                   daysClassName = '',
                                                   dayClassName = '',
                                                   selectedDayClassName = '',
                                                   holidayClassName = '',
                                                   todayClassName = '',
                                                   monthsGridClassName = '',
                                                   monthItemClassName = '',
                                                   selectedMonthClassName = '',
                                                   yearsGridClassName = '',
                                                   yearItemClassName = '',
                                                   selectedYearClassName = '',
                                                   arrowClassName = '',
                                               }) => {
    const [isFocused, setIsFocused] = useState(false);
    const initialDate = value ? moment(value, 'jYYYY/jMM/jDD').locale('fa') : null;
    const [selectedDate, setSelectedDate] = useState<{ year: number; month: number; day: number } | null>(
        initialDate ? { year: initialDate.jYear(), month: initialDate.jMonth(), day: initialDate.jDate() } : null
    );
    const [currentYear, setCurrentYear] = useState(moment().jYear());
    const [currentMonth, setCurrentMonth] = useState(moment().jMonth() + 1);
    const [view, setView] = useState<'day' | 'month' | 'year'>('day');
    const [visible, setVisible] = useState(false);
    const datePickerRef = useRef<HTMLDivElement | null>(null);

    const today = moment();
    const currentJalaliYear = today.jYear();
    const currentJalaliMonth = today.jMonth() + 1;
    const currentJalaliDay = today.jDate();

    const displayedDate = selectedDate
        ? `${selectedDate.year}/${String(selectedDate.month + 1).padStart(2, "0")}/${String(selectedDate.day).padStart(2, "0")}`
        : placeholderText;

    // Determine if a day is a holiday (Friday in this case)
    const isHoliday = (year: number, month: number, day: number) => {
        const date = moment(`${year}/${month}/${day}`, 'jYYYY/jMM/jDD');
        return date.jDay() === 6;
    };

    // Get the weekday offset for the first day of the month
    const getWeekDayOffset = (year: number, month: number) => {
        return moment(`${year}/${month}/01`, 'jYYYY/jMM/jDD').jDay();
    };

    const defaultClasses = {
        container: `relative ${containerClassName}`,
        input: `w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 ${SizeMap[size].base} ${inputClassName}`,
        popup: `absolute mt-1 bg-white rounded-lg shadow-lg z-50 ${popupClassName}`,
        header: `flex items-center justify-between p-2 border-b ${headerClassName}`,
        weeks: `grid grid-cols-7 gap-1 p-2 text-center ${weeksClassName}`,
        weekItem: `${weekItemClassName}`,
        days: `grid grid-cols-7 gap-1 p-2 ${daysClassName}`,
        day: `flex items-center justify-center p-2 rounded-md hover:bg-gray-100 cursor-pointer ${dayClassName}`,
        selectedDay: `bg-blue-500 text-white hover:bg-blue-600 ${selectedDayClassName}`,
        holiday: `text-red-500 ${holidayClassName}`,
        today: `ring-2 ring-blue-500 ${todayClassName}`,
        monthsGrid: `grid grid-cols-3 gap-2 p-2 ${monthsGridClassName}`,
        monthItem: `p-2 text-center rounded-md hover:bg-gray-100 cursor-pointer ${monthItemClassName}`,
        selectedMonth: `bg-blue-500 text-white hover:bg-blue-600 ${selectedMonthClassName}`,
        yearsGrid: `grid grid-cols-3 gap-2 p-2 ${yearsGridClassName}`,
        yearItem: `p-2 text-center rounded-md hover:bg-gray-100 cursor-pointer ${yearItemClassName}`,
        selectedYear: `bg-blue-500 text-white hover:bg-blue-600 ${selectedYearClassName}`,
        arrow: `cursor-pointer p-1 rounded hover:bg-gray-100 ${arrowClassName}`,
    };

    const daysInMonth = generateDaysInMonth(currentYear, currentMonth);
    const days = Array.from({ length: daysInMonth }, (_, day) => ({
        year: currentYear,
        month: currentMonth,
        day: day + 1,
    }));

    const weekDayOffset = getWeekDayOffset(currentYear, currentMonth);

    const handleSelectDate = (day: { year: number; month: number; day: number }) => {
        setSelectedDate(day);
        const formattedDate = moment.from(`${day.year}/${day.month}/${day.day}`, 'fa', 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
        onChange(formattedDate);
        setVisible(false);
    };

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const toggleDatePicker = () => {
        if (!disabled) {
            if (!visible && selectedDate) {
                setCurrentYear(selectedDate.year);
                setCurrentMonth(selectedDate.month);
            }
            setVisible(!visible);
            setView('day');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visible]);

    return (
        <div className={`${defaultClasses.container} ${className}`} ref={datePickerRef} dir={dir}>
            <div
                className={`${defaultClasses.input} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={toggleDatePicker}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                tabIndex={0}
            >
                {displayedDate}
            </div>

            {visible && !disabled && (
                <div className={defaultClasses.popup}>
                    <div className={defaultClasses.header}>
                        <button
                            className={defaultClasses.arrow}
                            onClick={handlePrevMonth}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="flex items-center space-x-2">
                            <span
                                className="cursor-pointer hover:text-blue-500"
                                onClick={() => setView('month')}
                            >
                                {persianMonths[currentMonth - 1]}
                            </span>
                            <span>/</span>
                            <span
                                className="cursor-pointer hover:text-blue-500"
                                onClick={() => setView('year')}
                            >
                                {currentYear}
                            </span>
                        </div>

                        <button
                            className={defaultClasses.arrow}
                            onClick={handleNextMonth}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>

                    {view === 'day' && (
                        <>
                            <div className={defaultClasses.weeks}>
                                {persianWeeks.map((week) => (
                                    <div key={week} className={defaultClasses.weekItem}>
                                        {week}
                                    </div>
                                ))}
                            </div>
                            <div className={defaultClasses.days}>
                                {Array.from({ length: weekDayOffset }, (_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}
                                {days.map((day) => (
                                    <div
                                        key={`${day.year}-${day.month}-${day.day}`}
                                        className={`
                                            ${defaultClasses.day}
                                            ${isHoliday(day.year, day.month, day.day) ? defaultClasses.holiday : ''}
                                            ${selectedDate?.year === day.year &&
                                        selectedDate?.month === day.month &&
                                        selectedDate?.day === day.day
                                            ? defaultClasses.selectedDay
                                            : ''}
                                            ${currentJalaliYear === day.year &&
                                        currentJalaliMonth === day.month &&
                                        currentJalaliDay === day.day
                                            ? defaultClasses.today
                                            : ''}
                                        `}
                                        onClick={() => handleSelectDate(day)}
                                    >
                                        {day.day}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {view === 'month' && (
                        <div className={defaultClasses.monthsGrid}>
                            {persianMonths.map((month, index) => (
                                <div
                                    key={month}
                                    className={`
                                        ${defaultClasses.monthItem}
                                        ${currentMonth === index + 1 ? defaultClasses.selectedMonth : ''}
                                    `}
                                    onClick={() => {
                                        setCurrentMonth(index + 1);
                                        setView('day');
                                    }}
                                >
                                    {month}
                                </div>
                            ))}
                        </div>
                    )}

                    {view === 'year' && (
                        <div className={defaultClasses.yearsGrid}>
                            {Array.from({ length: 12 }, (_, i) => currentYear - 4 + i).map((year) => (
                                <div
                                    key={year}
                                    className={`
                                        ${defaultClasses.yearItem}
                                        ${currentYear === year ? defaultClasses.selectedYear : ''}
                                    `}
                                    onClick={() => {
                                        setCurrentYear(year);
                                        setView('day');
                                    }}
                                >
                                    {year}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DatePicker;