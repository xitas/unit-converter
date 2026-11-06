(function () {
  'use strict';

  /* ---------- Data ----------
     Every category converts through a base unit.
     Linear units have a factor `f` (how many base units in one of them).
     Temperature units have `to` / `from` functions instead. */
  const lin = (id, name, sym, f) => ({ id, name, sym, f });

  const CATEGORIES = [
    {
      id: 'length', label: 'Length', from: 'km', to: 'mi', // base: meter
      units: [
        lin('mm', 'Millimeter', 'mm', 0.001),
        lin('cm', 'Centimeter', 'cm', 0.01),
        lin('m', 'Meter', 'm', 1),
        lin('km', 'Kilometer', 'km', 1000),
        lin('in', 'Inch', 'in', 0.0254),
        lin('ft', 'Foot', 'ft', 0.3048),
        lin('yd', 'Yard', 'yd', 0.9144),
        lin('mi', 'Mile', 'mi', 1609.344),
        lin('nmi', 'Nautical mile', 'nmi', 1852)
      ]
    },
    {
      id: 'mass', label: 'Mass', from: 'kg', to: 'lb', // base: kilogram
      units: [
        lin('mg', 'Milligram', 'mg', 1e-6),
        lin('g', 'Gram', 'g', 0.001),
        lin('kg', 'Kilogram', 'kg', 1),
        lin('t', 'Metric tonne', 't', 1000),
        lin('oz', 'Ounce', 'oz', 0.028349523125),
        lin('lb', 'Pound', 'lb', 0.45359237),
        lin('st', 'Stone', 'st', 6.35029318)
      ]
    },
    {
      id: 'temperature', label: 'Temperature', from: 'c', to: 'f', // base: kelvin
      units: [
        { id: 'c', name: 'Celsius', sym: '°C', to: (v) => v + 273.15, from: (k) => k - 273.15 },
        { id: 'f', name: 'Fahrenheit', sym: '°F', to: (v) => (v - 32) * 5 / 9 + 273.15, from: (k) => (k - 273.15) * 9 / 5 + 32 },
        lin('k', 'Kelvin', 'K', 1)
      ]
    },
    {
      id: 'volume', label: 'Volume', from: 'l', to: 'gal', // base: liter
      units: [
        lin('ml', 'Milliliter', 'mL', 0.001),
        lin('l', 'Liter', 'L', 1),
        lin('m3', 'Cubic meter', 'm³', 1000),
        lin('tsp', 'Teaspoon (US)', 'tsp', 0.00492892159375),
        lin('tbsp', 'Tablespoon (US)', 'tbsp', 0.01478676478125),
        lin('floz', 'Fluid ounce (US)', 'fl oz', 0.0295735295625),
        lin('cup', 'Cup (US)', 'cup', 0.2365882365),
        lin('pt', 'Pint (US)', 'pt', 0.473176473),
        lin('qt', 'Quart (US)', 'qt', 0.946352946),
        lin('gal', 'Gallon (US)', 'gal', 3.785411784)
      ]
    },
    {
      id: 'area', label: 'Area', from: 'm2', to: 'ft2', // base: square meter
      units: [
        lin('mm2', 'Square millimeter', 'mm²', 1e-6),
        lin('cm2', 'Square centimeter', 'cm²', 1e-4),
        lin('m2', 'Square meter', 'm²', 1),
        lin('ha', 'Hectare', 'ha', 10000),
        lin('km2', 'Square kilometer', 'km²', 1e6),
        lin('in2', 'Square inch', 'in²', 0.00064516),
        lin('ft2', 'Square foot', 'ft²', 0.09290304),
        lin('ac', 'Acre', 'ac', 4046.8564224),
        lin('mi2', 'Square mile', 'mi²', 2589988.110336)
      ]
    },
    {
      id: 'speed', label: 'Speed', from: 'kmh', to: 'mph', // base: meter per second
      units: [
        lin('ms', 'Meter per second', 'm/s', 1),
        lin('kmh', 'Kilometer per hour', 'km/h', 1 / 3.6),
        lin('mph', 'Mile per hour', 'mph', 0.44704),
        lin('kn', 'Knot', 'kn', 1852 / 3600),
        lin('fts', 'Foot per second', 'ft/s', 0.3048)
      ]
    },
    {
      id: 'time', label: 'Time', from: 'h', to: 'min', // base: second
      units: [
        lin('msec', 'Millisecond', 'ms', 0.001),
        lin('s', 'Second', 's', 1),
        lin('min', 'Minute', 'min', 60),
        lin('h', 'Hour', 'h', 3600),
        lin('d', 'Day', 'd', 86400),
        lin('wk', 'Week', 'wk', 604800),
        lin('yr', 'Year (365.25 days)', 'yr', 31557600)
      ]
    },
    {
      id: 'data', label: 'Data', from: 'gb', to: 'mb', // base: byte
      units: [
        lin('bit', 'Bit', 'bit', 0.125),
        lin('b', 'Byte', 'B', 1),
        lin('kb', 'Kilobyte (1,000 B)', 'KB', 1e3),
        lin('mb', 'Megabyte', 'MB', 1e6),
        lin('gb', 'Gigabyte', 'GB', 1e9),
        lin('tb', 'Terabyte', 'TB', 1e12),
        lin('kib', 'Kibibyte (1,024 B)', 'KiB', 1024),
        lin('mib', 'Mebibyte', 'MiB', 1048576),
        lin('gib', 'Gibibyte', 'GiB', 1073741824)
      ]
    },
    {
      id: 'energy', label: 'Energy', from: 'kcal', to: 'kj', // base: joule
      units: [
        lin('j', 'Joule', 'J', 1),
        lin('kj', 'Kilojoule', 'kJ', 1000),
        lin('cal', 'Calorie', 'cal', 4.184),
        lin('kcal', 'Kilocalorie', 'kcal', 4184),
        lin('wh', 'Watt hour', 'Wh', 3600),
        lin('kwh', 'Kilowatt hour', 'kWh', 3.6e6),
        lin('btu', 'BTU', 'BTU', 1055.05585262)
      ]
    },
    {
      id: 'pressure', label: 'Pressure', from: 'bar', to: 'psi', // base: pascal
      units: [
        lin('pa', 'Pascal', 'Pa', 1),
        lin('kpa', 'Kilopascal', 'kPa', 1000),
        lin('bar', 'Bar', 'bar', 1e5),
        lin('psi', 'Pound per sq. inch', 'psi', 6894.757293168),
        lin('atm', 'Atmosphere', 'atm', 101325),
        lin('mmhg', 'Millimeter of mercury', 'mmHg', 133.322387415)
      ]
    }
  ];

  /* ---------- Conversion ---------- */
  const toBase = (u, v) => (u.to ? u.to(v) : v * u.f);
  const fromBase = (u, b) => (u.from ? u.from(b) : b / u.f);
  const convert = (v, a, b) => fromBase(b, toBase(a, v));

  /* Round to N significant digits and drop trailing zeros. */
  function fmt(n, digits) {
    if (!isFinite(n)) return '';
    if (n === 0) return '0';
    const abs = Math.abs(n);
    if (abs >= 1e15 || abs < 1e-9) {
      return n.toExponential(Math.max(0, digits - 1)).replace(/\.?0+e/, 'e');
    }
    return String(Number(n.toPrecision(digits)));
  }

  /* Accept "1,234.5", "1e3" and surrounding spaces. Returns null when not a number. */
  function parse(text) {
    const t = text.replace(/[,\s]/g, '');
    if (!t) return null;
    const n = Number(t);
    return isFinite(n) ? n : null;
  }

  /* ---------- Elements and state ---------- */
  const $ = (id) => document.getElementById(id);
  const catsEl = $('categories');
  const fromVal = $('fromValue');
  const toVal = $('toValue');
  const fromSel = $('fromUnit');
  const toSel = $('toUnit');
  const swapBtn = $('swap');
  const formulaEl = $('formula');
  const resultsEl = $('results');
  const resultsTitle = $('resultsTitle');
  const precSel = $('precision');
  const copyBtn = $('copy');

  let cat = CATEGORIES[0];
  let edited = 'from'; // which box the user typed in last

  const digits = () => Number(precSel.value);
  const unitById = (id) => cat.units.find((u) => u.id === id);

  /* ---------- Saved settings (optional) ---------- */
  const KEY = 'unit-converter';
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ cat: cat.id, prec: precSel.value })); } catch (e) { /* ignore */ }
  }

  /* ---------- Rendering ---------- */
  function renderCategories() {
    catsEl.innerHTML = '';
    CATEGORIES.forEach((c) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = c.label;
      b.setAttribute('aria-pressed', String(c === cat));
      b.addEventListener('click', () => setCategory(c));
      catsEl.appendChild(b);
    });
  }

  function fillSelects() {
    const options = cat.units.map((u) => {
      const o = document.createElement('option');
      o.value = u.id;
      o.textContent = u.name + ' (' + u.sym + ')';
      return o;
    });
    [fromSel, toSel].forEach((sel) => {
      sel.innerHTML = '';
      options.forEach((o) => sel.appendChild(o.cloneNode(true)));
    });
    fromSel.value = cat.from;
    toSel.value = cat.to;
  }

  function renderResults(a, b) {
    const n = parse(fromVal.value);
    resultsTitle.textContent = n === null ? 'In every unit' : fmt(n, digits()) + ' ' + a.sym + ' in every unit';
    resultsEl.innerHTML = '';
    cat.units.forEach((u) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      if (u.id === b.id) btn.className = 'is-to';
      else if (u.id === a.id) btn.className = 'is-from';
      btn.innerHTML = '<span class="name"></span><span class="num"></span><span class="sym"></span>';
      btn.querySelector('.name').textContent = u.name;
      btn.querySelector('.num').textContent = n === null ? '—' : fmt(convert(n, a, u), digits());
      btn.querySelector('.sym').textContent = u.sym;
      btn.addEventListener('click', () => {
        toSel.value = u.id;
        edited = 'from';
        update();
      });
      li.appendChild(btn);
      resultsEl.appendChild(li);
    });
  }

  function update() {
    const a = unitById(fromSel.value);
    const b = unitById(toSel.value);

    if (edited === 'from') {
      const n = parse(fromVal.value);
      toVal.value = n === null ? '' : fmt(convert(n, a, b), digits());
    } else {
      const n = parse(toVal.value);
      fromVal.value = n === null ? '' : fmt(convert(n, b, a), digits());
    }

    fromVal.setAttribute('aria-invalid', String(fromVal.value.trim() !== '' && parse(fromVal.value) === null));
    toVal.setAttribute('aria-invalid', String(toVal.value.trim() !== '' && parse(toVal.value) === null));

    formulaEl.textContent = '1 ' + a.sym + ' = ' + fmt(convert(1, a, b), digits()) + ' ' + b.sym;
    copyBtn.disabled = toVal.value === '';
    renderResults(a, b);
  }

  function setCategory(c) {
    cat = c;
    edited = 'from';
    renderCategories();
    fillSelects();
    update();
    save();
  }

  /* ---------- Events ---------- */
  fromVal.addEventListener('input', () => { edited = 'from'; update(); });
  toVal.addEventListener('input', () => { edited = 'to'; update(); });
  fromSel.addEventListener('change', update);
  toSel.addEventListener('change', update);
  precSel.addEventListener('change', () => { update(); save(); });

  swapBtn.addEventListener('click', () => {
    const f = fromSel.value;
    fromSel.value = toSel.value;
    toSel.value = f;
    const v = fromVal.value;
    fromVal.value = toVal.value;
    toVal.value = v;
    edited = 'from';
    update();
  });

  copyBtn.addEventListener('click', () => {
    const text = toVal.value + ' ' + unitById(toSel.value).sym;
    const done = () => {
      copyBtn.textContent = 'Copied';
      setTimeout(() => { copyBtn.textContent = 'Copy result'; }, 1500);
    };
    const fallback = () => {
      toVal.focus();
      toVal.select();
      copyBtn.textContent = 'Press Ctrl/Cmd + C';
      setTimeout(() => { copyBtn.textContent = 'Copy result'; }, 2500);
    };
    try {
      navigator.clipboard.writeText(text).then(done, fallback);
    } catch (e) { fallback(); }
  });

  /* ---------- Start ---------- */
  const saved = load();
  if (saved.prec && precSel.querySelector('option[value="' + saved.prec + '"]')) precSel.value = saved.prec;
  cat = CATEGORIES.find((c) => c.id === saved.cat) || CATEGORIES[0];
  renderCategories();
  fillSelects();
  update();
})();
