# Kara Persian DatePicker

A modern, Persian date picker for React applications. This date picker supports both light and dark themes, providing a
sleek and user-friendly interface for selecting dates.

## Demo

<div style="flex: 1">
<div style="display:flex;flex-basis:30%;gap:20px">
<img src="https://fastpanda99.github.io/kara_persian_datepicker/images/light_preview.png" alt="Kara Persian Datepicker Screenshot" width="400" height="470">
<img src="https://fastpanda99.github.io/kara_persian_datepicker/images/dark_preview.png" alt="Kara Persian Datepicker Screenshot" width="400" height="470">
</div>
</div>

### View more [Demo](https://fastpanda99.github.io/kara_persian_datepicker/)

## Installation

### npm

To install the package via npm, run:

```bash
npm install kara-persian-datepicker
```

### yarn

```bash
yarn add kara-persian-datepicker
```

## Usage

```javascript
import React, {useState} from 'react';
import {DatePicker} from 'kara-persian-datepicker';
import 'kara-persian-datepicker/dist/index.css';

const App: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState < string | null > (null);

    return (
        <div>
            <h1>Kara Persian DatePicker</h1>
            <DatePicker
                value={selectedDate}
                onChange={(date) => {
                    console.log(date);
                    setSelectedDate(date);
                }}
                classStyle={{
                    backgroundColor: '#000', // dark background
                    textColor: '#fff', // white text
                    textPlaceholder: 'Pick a date', // Placeholder text in Persian
                    textAlign: 'right', // Text alignment
                    size: 'md', // Size of the date picker
                    radius: '8px', // Border radius for rounded corners
                    borderColor: '#E2e8f0', // Border color for the date picker
                    selectedDayColor: '#007BFF', // Blue color for the selected day
                    inputStyle: {padding: '10px', fontSize: '16px'}, // Custom input styles
                }}
                disabled={false} // Change to true to disable the date picker
                theme="dark" // Change to 'light' for light theme
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

| Prop         | Type                   | Description                                                                                  |
|--------------|------------------------|----------------------------------------------------------------------------------------------|
| `value`      | `string`               | string Or null                                                                               |
| `disabled`   | `boolean`              | Optional. If true, disables the date picker.                                                 |
| `theme`      | `string`               | Optional. Allows you to set the theme ('light' or 'dark'). Default is 'light'.               |
| `classStyle` | `object`               | Optional                                                                                     |
| `onChange`   | `(date: Date) => void` | Callback function called when a date is selected. Receives the selected date as an argument. |

## classStyle Props

| Prop                  | Value           | Description                        |
|-----------------------|-----------------|------------------------------------|
| `backgroundColor`     | `#000`          | Dark background color.             |
| `textColor`           | `#fff`          | White text color.                  |
| `textPlaceholder`     | `'Pick a date'` | Placeholder text (in Persian).     |
| `textAlign`           | `right`         | Aligns text to the right.          |
| `size`                | `md`            | Medium size of the date picker.    |
| `radius`              | `8px`           | Border radius for rounded corners. |
| `borderColor`         | `#E2e8f0`       | Border color for the date picker.  |
| `selectedDayColor`    | `#007BFF`       | Blue color for the selected day.   |
| `inputStyle.padding`  | `10px`          | Padding for the input field.       |
| `inputStyle.fontSize` | `16px`          | Font size for the input text.      |

## Customization

You can customize the appearance of the date picker by modifying the CSS file or overriding styles in your own
stylesheets. The `classStyle` prop allows for extensive customization, including background color, text color, and size.

## Authors

- [Yousef Zare](https://github.com/YousefZare2000)
- [FastPanda99](https://github.com/fastpanda99)
