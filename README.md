
# Noa Jalali DatePicker

A modern, Persian (Jalali) date picker for React applications. This date picker supports both light and dark themes, providing a sleek and user-friendly interface for selecting dates.

## Demo

<div style="flex: 1">
<div style="display:flex;flex-basis:30%;gap:20px">
<img src="https://freecyberhawk.github.io/noa_jalali_datepicker/images/light_preview.png" alt="Noa Jalali Datepicker Screenshot" width="300" height="350">
<img src="https://freecyberhawk.github.io/noa_jalali_datepicker/images/dark_preview.png" alt="Noa Jalali Datepicker Screenshot" width="300" height="350">
</div>
</div>

## Screenshots

Demo page: [Noa Jalali Datepicker](https://freecyberhawk.github.io/noa_jalali_datepicker/)

## Installation

### npm

To install the package via npm, run:

```bash
npm install noa-jalali-datepicker
```

### yarn

```bash
yarn add noa-jalali-datepicker
```

## Usage

```javascript
import React, { useState } from 'react';
import { DatePicker } from 'noa-jalali-datepicker';
import 'noa-jalali-datepicker/dist/index.css';

const App: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    return (
        <div>
            <h1>Noa Jalali DatePicker</h1>
            <DatePicker
                value={selectedDate}
                placeholderText="Pick a date"
                onChange={(date) => {
                    console.log(date);
                    setSelectedDate(date);
                }}
                selectColor="#007BFF"
                size="md"
                radius="8px"
                styles={{
                    input: { padding: '10px', fontSize: '16px' },
                }}
                classNames={{
                    input: "datepicker-input",
                    popup: {
                        root: "datepicker-popup",
                        header: "popup-header",
                        arrow: "popup-arrow",
                    },
                }}
                dir="rtl"
                textColor="#000"
                borderColor="#E2e8f0"
            />
            {selectedDate && <p>Selected Date: {selectedDate}</p>}
        </div>
    );
};

export default App;
```

## Features

- **Light and Dark Themes**: Easily switch between light and dark modes.
- **Modern Design**: Flat design with rounded corners for a sleek look.
- **User-Friendly**: Simple interface for selecting dates.
- **Responsive**: Works well on various screen sizes.

## Props

| Prop                | Type                                  | Description                                             |
|---------------------|---------------------------------------|---------------------------------------------------------|
| `value`             | `string | null`                       | Selected date as a string or null.                      |
| `onChange`          | `(date: string) => void`              | Callback when a date is selected.                       |
| `disabled`          | `boolean`                             | Optional. If true, disables the date picker.            |
| `placeholderText`   | `string`                              | Optional. Placeholder text for the input.               |
| `selectColor`       | `string`                              | Optional. Color for the selected date.                  |
| `size`              | `"xs" | "sm" | "md" | "lg" | "xl"`   | Optional. Size of the date picker. Default is `"md"`.   |
| `radius`            | `string`                              | Optional. Border radius for the date picker.            |
| `styles`            | `{ input?: React.CSSProperties; popup?: React.CSSProperties; }` | Optional. Custom styles for the input and popup.        |
| `classNames`        | `{ input?: string; popup?: { root?: string, header?: string, arrow?: string; } }` | Optional. Custom class names for the input and popup.   |
| `dir`               | `"rtl" | "ltr"`                       | Optional. Direction for text, either left-to-right or right-to-left. |
| `textColor`         | `string`                              | Optional. Text color.                                   |
| `borderColor`       | `string`                              | Optional. Border color for the date picker.             |

## classStyle Props

| Prop                    | Value           | Description                        |
|-------------------------|-----------------|------------------------------------|
| `backgroundColor`       | `#000`          | Dark background color.             |
| `textColor`             | `#fff`          | White text color.                  |
| `textPlaceholder`       | `'Pick a date'` | Placeholder text (in Persian).     |
| `textAlign`             | `right`         | Aligns text to the right.          |
| `size`                  | `md`            | Medium size of the date picker.    |
| `radius`                | `8px`           | Border radius for rounded corners. |
| `borderColor`           | `#E2e8f0`       | Border color for the date picker.  |
| `selectedDayColor`      | `#007BFF`       | Blue color for the selected day.   |
| `inputStyle.padding`    | `10px`          | Padding for the input field.       |
| `inputStyle.fontSize`   | `16px`          | Font size for the input text.      |

## Customization

You can customize the appearance of the date picker by modifying the CSS file or overriding styles in your own stylesheets. The `classStyle` prop allows for extensive customization, including background color, text color, and size.

## Authors

- [FreeCyberHawk](https://github.com/freecyberhawk)
