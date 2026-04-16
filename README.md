# Wai Hyn Htun Portfolio

This repository now runs as a Create React App-style portfolio built with React and React Bootstrap, with GitHub Pages deployment handled by GitHub Actions.

## Stack

- React 18
- React Bootstrap
- Bootstrap 5
- Custom CSS design system in `src/styles.css`
- GitHub Actions Pages deployment

## Project Structure

```text
portfolio/
├── public/
│   ├── index.html
│   ├── profile.jpg
│   ├── mr-wai-hyn-htun-cv.pdf
│   ├── wai-hyn-htun-resume.docx
│   └── images/
├── src/
│   ├── App.js
│   ├── index.js
│   ├── portfolioData.js
│   └── styles.css
├── .github/workflows/pages.yml
├── package.json
└── README.md
```

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Build for production:

```bash
npm run build
```

## Deployment

GitHub Pages deployment is configured through `.github/workflows/pages.yml`.

Required GitHub repository settings:

1. Open `Settings -> Pages`
2. Set `Source` to `GitHub Actions`
3. Push to `main`

The workflow will:

- install dependencies with `npm ci`
- build the React app
- publish the `build/` output to GitHub Pages

The app is configured with:

```json
"homepage": "https://kamkyi.github.io/portfolio"
```

If the repository name or owner changes, update the `homepage` field in `package.json`.

## Notes

- Portfolio content is centralized in `src/portfolioData.js`
- Static assets used by the React app live under `public/`
- The Telegram quick-message form still posts to the existing Cloudflare Worker endpoint

Optional environment variable:

```bash
OPENAI_VECTOR_STORE_ID=vs_...
```

If `OPENAI_VECTOR_STORE_ID` is set, the assistant can use OpenAI file search against uploaded resume files such as `mr-wai-hyn-htun-cv.pdf`.

Deployment note:

- GitHub Pages alone cannot run `/api/portfolio-agent`
- Use Vercel or another host with server-side functions
- If your backend lives elsewhere, update `data-agent-endpoint` in `index.html`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you create improvements that could benefit others, pull requests are welcome!

## 📧 Contact

**Wai Hyn Htun**

- Email: waihynhtun90s@gmail.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [kamkyi](https://github.com/kamkyi)

---

_Built with ❤️ using vanilla HTML, CSS, and JavaScript_
