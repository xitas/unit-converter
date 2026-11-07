# Unit Converter

A fast unit converter built with plain HTML, CSS and JavaScript. No frameworks, no build step, and nothing leaves your browser.

## Features

- **10 measurement types:** length, mass, temperature, volume, area, speed, time, data, energy and pressure
- **Two-way conversion:** type in either box and the other updates
- **Swap** the two units with one click
- **Every unit at once:** see the value in all units of the category and click one to use it
- **Precision control:** 4, 6, 8 or 10 significant digits
- **Copy** the result with its unit
- **Light and dark** themes that follow your system setting
- Remembers your last category and precision

## Project structure

```
.
├── index.html   # Page markup
├── style.css    # Styles
├── script.js    # Unit data, conversion logic and UI
└── README.md
```

## Getting started

No installation needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/xitas/unit-converter.git
   cd <your-repo>
   ```
2. Open `index.html` in your browser.

Optionally, serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## How it works

Each category has a base unit (meter, kilogram, kelvin, liter, square meter, meter per second, second, byte, joule, pascal). A value is converted to the base unit and then to the target unit.

Most units are a single factor. Temperature uses formulas instead, because Celsius and Fahrenheit do not share a zero point with Kelvin.

## Add a unit or a category

Open `script.js` and edit the `CATEGORIES` list.

Add a unit to an existing category with `lin(id, name, symbol, factor)`, where `factor` is how many base units one of the new unit equals:

```js
lin('ly', 'Light year', 'ly', 9.4607304725808e15)  // in the Length category
```

Add a new category by adding an object with `id`, `label`, the default `from` and `to` unit ids, and a `units` list.

## Notes

- Volume units are US customary (US gallon, cup, pint and so on).
- A year is 365.25 days.
- KB, MB and GB use 1,000 bytes. KiB, MiB and GiB use 1,024 bytes.
- Results are rounded to the chosen number of significant digits.

## Deploy with GitHub Pages

1. Push the project to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site will be live at `https://<your-username>.github.io/<your-repo>/`.

## License

Add a license of your choice (for example MIT) in a `LICENSE` file.
