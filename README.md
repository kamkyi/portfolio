# Wai Hyn Htun - Portfolio Website

A modern, responsive portfolio website showcasing full-stack development expertise with glassmorphism design and interactive features.

## 🌟 Features

### Design & UI

- **Modern Glassmorphism Design** - Translucent cards with backdrop blur effects
- **Animated Background** - Floating gradient shapes with smooth animations
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Professional Color Scheme** - Sophisticated navy, charcoal, and gold palette
- **AOS Animations** - Smooth scroll-triggered animations throughout

### Sections

- **Hero Section** - Interactive introduction with animated typewriter effect
- **About Section** - Personal information with statistics and profile image
- **Experience Timeline** - Professional work history with detailed descriptions
- **Education Section** - Academic background with current applications
- **Skills Showcase** - Technical skills with progress bars and categorized technologies
- **Contact Modal** - Popup contact form with glassmorphism styling

### Interactive Features

- **Contact Form Modal** - Modern popup instead of page scrolling
- **CV Download** - Direct download button for resume (my-cv.docx)
- **Smooth Navigation** - Seamless scrolling between sections
- **Mobile Menu** - Responsive hamburger navigation
- **Dynamic Footer** - Auto-updating copyright year

### Technical Highlights

- **Vanilla JavaScript** - No framework dependencies, pure JS functionality
- **CSS Grid & Flexbox** - Modern layout techniques
- **CSS Custom Properties** - Maintainable color system
- **Progressive Enhancement** - Works without JavaScript
- **Font Awesome Icons** - Professional iconography
- **Google Fonts** - Plus Jakarta Sans and JetBrains Mono typography

## 🚀 Quick Start

### Prerequisites

- Modern web browser
- Web server (for local development)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/kamkyi/portfolio.git
   cd portfolio
   ```

2. **Add your CV file**

   - Place your CV file as `my-cv.docx` in the root directory
   - Or update the link in `index.html` to match your CV filename

3. **Add your profile image**

   - Place your profile image as `my-profile.jpg` in the root directory
   - Recommended size: 400x400px or larger, square aspect ratio

4. **Start a local server**

   **Option 1: Python (if installed)**

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option 2: Node.js (if installed)**

   ```bash
   npx serve .
   ```

   **Option 3: VS Code Live Server**

   - Install Live Server extension
   - Right-click `index.html` → "Open with Live Server"

5. **View the website**
   - Open your browser and navigate to `http://localhost:8000`

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── my-profile.jpg      # Profile image (add this)
├── my-cv.docx         # CV file for download (add this)
└── README.md          # This file
```

## 🎨 Customization

### Personal Information

Edit the following in `index.html`:

1. **Hero Section** (lines ~55-75)

   - Update name, title, and description
   - Modify contact email link

2. **About Section** (lines ~85-120)

   - Update personal information
   - Modify statistics and achievements

3. **Experience Section** (lines ~140-225)

   - Add/remove work experiences
   - Update job titles, companies, and descriptions

4. **Education Section** (lines ~230-265)

   - Update degrees and institutions
   - Modify academic achievements

5. **Skills Section** (lines ~270-400)
   - Update technical skills and percentages
   - Add/remove technology categories

### Styling

Edit `styles.css` to customize:

1. **Colors** (lines 1-25)

   - Modify CSS custom properties in `:root`
   - Update primary, secondary, and accent colors

2. **Typography**

   - Change font families in the `:root` section
   - Adjust font sizes throughout the file

3. **Animations**
   - Modify animation durations and effects
   - Customize hover states and transitions

### Functionality

Edit `script.js` to customize:

1. **Contact Form** - Update form submission handling
2. **Animations** - Modify scroll effects and interactions
3. **Navigation** - Adjust smooth scrolling behavior

## 🌐 Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source: Deploy from branch `main`
4. Your site will be available at `https://yourusername.github.io/portfolio`

### Netlify

1. Drag and drop the project folder to [Netlify](https://netlify.com)
2. Or connect your GitHub repository for automatic deployments

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the deployment prompts

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Dependencies

- **Font Awesome 6.5.1** - Icons
- **Google Fonts** - Typography (Plus Jakarta Sans, JetBrains Mono)
- **AOS 2.3.4** - Scroll animations

All dependencies are loaded via CDN, no local installation required.

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
