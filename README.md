# Wai Hyn Htun Portfolio

This repository runs as a Create React App portfolio with GitHub Pages deployment handled by GitHub Actions. The UI is a dependency-free React build using a custom "Midnight Navy" design system (navy blue over near-black) tuned for recruiters and hiring managers.

## Stack

- React 18 (no UI framework — plain JSX + CSS Grid/Flexbox)
- Custom CSS design system in `src/styles.css` (tokens in `:root`)
- Bootstrap Icons via CDN
- GitHub Actions Pages deployment

## Project Structure

```text
portfolio/
├── public/
│   ├── index.html
│   ├── profile.jpg
│   ├── mr-wai-hyn-htun-cv.pdf
│   ├── wai-hyn-htun-resume.docx
│   ├── certificates/          # Google/Coursera credential (PDF + preview image)
│   ├── resume/                # Role-targeted resume downloads
│   └── images/                # Certificate and document scans
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
- Static assets used by the React app live under `public/` and are referenced through `process.env.PUBLIC_URL` so they resolve correctly under the `/portfolio` Pages base path
- Certificates render from `CERTIFICATES` in `src/portfolioData.js`. The entry flagged `featured: true` (the Google/Coursera Python credential) always renders first, in the large highlighted card
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

_Built with React 18 and a custom CSS design system._
